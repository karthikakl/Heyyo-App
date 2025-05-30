import React from 'react'
import assets, { messageDummyData } from '../assets/assets'

const ChatContainer = ({selectedUser,setSelectedUser}) => {
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg' >
      {/* header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile1} alt='' className='w-8 rounded-full'/>
         <p className='flex-1 text-lg text-white flex items-center gap-2'>
          Martin
         <span className='w-2 h-2 rounded-full bg-green-500'></span>
          </p>

          <img onClick={()=>setSelectedUser(null)} src={assets.searchIcon} alt='' className='md:hidden max-w-7'/>
          <img src={assets.help} alt='' className='max-md:hidden max-w-5'/>
      </div>
      {/* chat area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
      {messageDummyData.map((msg,index)=>(
        <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== '66573f1f9b1c1a5e345c0001' && 'flex-row-reverse'}`}>
          {msg.image ? (
            <img src={msg.image} alt='' className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>
          ):(
            <p className={`p-2 max-w-[200px] md:text-sm font-light
              rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '66573f1f9b1c1a5e345c0001' ? 'rounded-br-none' :
                'rounded-bl-none'
              }`}>{msg.text}</p>
          )}
           <div className='text-ceter text-xs'>
              <img src={msg.senderId === '66573f1f9b1c1a5e345c0001' ? assets.avatar : assets.profile1 } alt='' className='w-7 rounded-full'/>
              <p className='text-gray-500'>{msg.createdAt}</p>
           </div>
        </div>
      ))}
      <div ref={scrollEnd}></div>
    </div>
    </div>
  ):(
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500
    bg-white/10 max-md:hidden'>
      <img src={assets.logo} className='max-w-16' alt=''/>
      <p className='text-lg font-medium text-white'>Chat anytime,anywhere</p>
    </div>
  )
}

export default ChatContainer
