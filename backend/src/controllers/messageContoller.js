import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import {io,userSocketMap} from '../server.js';

//for side bar(friendsList and messages)
export const getFriendsList = async (req, res) => {
  let friends = [];
  let unseenMessages = {};
  let lastMessage = {};
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("friends")
      .populate("friends", "fullName profilePic");

    friends = user.friends;

    if (!friends.length) {
      return res
        .status(200)
        .json({ success: true, users: [], unseenMessages: {} });
    }
    //count for unseen messages

    const promises = friends.map(async (friend) => {
      const messages = await Message.find({
        senderId: friend._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[friend._id] = messages.length;
      }

     const lastMsg = await Message.findOne({
        $or: [
          { senderId: userId, receiverId: friend._id },
          { senderId: friend._id, receiverId: userId },
        ],
      })
        .sort({ createdAt: -1 })
        .lean();

      if (lastMsg) {
        lastMessage[friend._id] = {
          text: lastMsg.text,
          senderId: lastMsg.senderId,
          createdAt: lastMsg.createdAt,
        };
      }
    });
    await Promise.all(promises);

    return res
      .status(200)
      .json({ success: true, users: friends, unseenMessages, lastMessage });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({
        success: false,
        message: error.message,
        users: friends,
        unseenMessages,
        lastMessage: {},
      });
  }
};

//For getting all messages for selected user
export const getMessages = async(req,res)=>{
  try {
    const {id:selectedUserId} = req.params;
    const myId = req.user._id;
    
    const messages = await Message.find({$or:[
      {senderId:myId,receiverId:selectedUserId},
      {senderId:selectedUserId,receiverId:myId},
    ]
  }).sort({createdAt:1})
  await Message.updateMany({senderId:selectedUserId,receiverId:myId},
    {seen:true})

    return res.status(200).json({success:true,messages})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message})
    
  }
}

//api to mark mesage as seen (for individaula message)
export const markMessageSeen = async(req,res)=>{
  try {
    const {id} = req.params
    await Message.findByIdAndUpdate(id,{seen:true})

  return res.status(200).json({success:true})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message})
  }
}

//sending mesage to selected user
export const sendMessage = async(req,res)=>{
  try {
    const {text,image}=req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl=uploadResponse.secure_url;
    }

    const newMsg = await Message.create({
      senderId,
      receiverId,
      text,
      image:imageUrl
    })

    //emit new message to the receiver's socket
    const receiverSocketId= userSocketMap[receiverId];
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMsg)
    }

    return res.status(200).json({success:true,newMsg});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message})
  }
}