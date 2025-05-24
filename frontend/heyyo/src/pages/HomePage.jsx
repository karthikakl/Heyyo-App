import React,{useState} from 'react'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {

  const [selectedUser,setSelectedUser] = useState(false)
  return (
    <div>
     {/* <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl 
      overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 
      'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}>
      <LeftSidebar/>
      <ChatContainer/>
      <RightSidebar/>
      
     </div> */}
     <h1>HomePage
      
     </h1>
    </div>
  )
}

export default HomePage
