import {upsertStreamUser} from '../lib/stream.js'
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export async function signUp(req, res) {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length must be at least 6 characters." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists.Please use another one." });
    } else {
      const idx = Math.floor(Math.random() * 100) + 1;
      const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

      const newUser = await User.create({
        fullName,
        email,
        password,
        profilepic: randomAvatar,
      }); 

      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(('Error in login controller',error.message))
    res.status(500).json({ message: "Internal server error." });
  }
}

export function logout(req, res) {
  res.clearCookie('jwt')
  res.status(200).json({success:true,message:'Logout successful'})
}

export async function onboard(req,res){
  try {
    const userId=req.user._id

    const {fullName,bio,location} =req.body

    if(!fullName || !bio || !location){
      return res.status(400).json({message:'All fields are required.',
        missingFields:[
          !fullName&&"fullName",
          !bio&&"bio",
          !location&&"location",
        ].filter(Boolean)
      })
    }
   const updatedUser = await User.findByIdAndUpdate(userId,{
    ...req.body,
    OnBoarded :true
   },{new:true})

   if(!updatedUser){
    return res.status(404).json({message:'User not found'})
   }

   try {
    await upsertStreamUser({
      id:updatedUser._id.toString(),
      name:updatedUser.fullName,
      image:updatedUser.profilepic||''
    })
    console.log(`Stream user updated after onboearding for ${updatedUser.fullName}`);
   } catch (streamError) {
    console.log('Error updating the stream user during onboarding:',streamError.message);
   }
   return res.status(200).json({success:true,user:updatedUser});
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'});
  }
}
