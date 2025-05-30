import background from './bgIMG.png'
import logo from './chatting.png'
import menuIcon from './menu1.png'
import searchIcon from './search.png'
import profile1 from './profile1.png'
import profile2 from './profile2.png'
import profile3 from './profile3.png'
import avatar from './avatar.png'
import help from './help1.png'
import image from './image.jpg'

const assets ={
    background,
    logo,
    menuIcon,
    searchIcon,
    profile1,
    profile2,
    profile3,
    avatar,
    help,
    image
}

export default assets;

export const imagesDummyData = [profile1,profile2,profile3,profile1,profile2] 

export const userDummyData = 
 [
  {
    _id: "66573f1f9b1c1a5e345c0001",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    password: "password123", // Will be hashed by the pre-save hook
    profilepic: profile1, // You can add your own image URL here
    bio: "Loves hiking and outdoor adventures.",
    location: "San Francisco, CA",
    OnBoarded: true,
  },
  {
    _id: "66573f1f9b1c1a5e345c0002",
    fullName: "Bob Smith",
    email: "bob@example.com",
    password: "password123",
    profilepic: profile2,
    bio: "Tech enthusiast and coffee addict.",
    location: "Austin, TX",
    OnBoarded: true,
  },
  {
    _id: "66573f1f9b1c1a5e345c0003",
    fullName: "Charlie Davis",
    email: "charlie@example.com",
    password: "password123",
    profilepic: profile3,
    bio: "Music is life.",
    location: "New York, NY",
    OnBoarded: false,
  },
  {
    _id: "66573f1f9b1c1a5e345c0004",
    fullName: "Diana Prince",
    email: "diana@example.com",
    password: "password123",
    profilepic: profile1,
    bio: "Wondering through code and comics.",
    location: "Los Angeles, CA",
    OnBoarded: true,
  },
  {
    _id: "66573f1f9b1c1a5e345c0005",
    fullName: "Ethan Brown",
    email: "ethan@example.com",
    password: "password123",
    profilepic: profile2,
    bio: "Gamer. Developer. Dreamer.",
    location: "Chicago, IL",
    OnBoarded: false,
  },
];

export const messageDummyData = [
  {
    senderId: "66573f1f9b1c1a5e345c0001", // Alice
    receiverId: "66573f1f9b1c1a5e345c0002", // Bob
    text: "Hey Bob! How are you?",
    image: null,
    seen: true,
  },
  {
    senderId: "66573f1f9b1c1a5e345c0002", // Bob
    receiverId: "66573f1f9b1c1a5e345c0001", // Alice
    text: "Doing great, Alice! You?",
    image: null,
    seen: true,
  },
  {
    senderId: "66573f1f9b1c1a5e345c0003", // Charlie
    receiverId: "66573f1f9b1c1a5e345c0004", // Diana
    text: "Check out this cool pic!",
    image: "profile3", // could use image key string or full URL
    seen: false,
  },
  {
    senderId: "66573f1f9b1c1a5e345c0005", // Ethan
    receiverId: "66573f1f9b1c1a5e345c0001", // Alice
    text: "Are you joining the event today?",
    image: null,
    seen: false,
  },
  {
    senderId: "66573f1f9b1c1a5e345c0001", // Alice
    receiverId: "66573f1f9b1c1a5e345c0005", // Ethan
    text: "Yes! See you there!",
    image: null,
    seen: true,
  },
];



