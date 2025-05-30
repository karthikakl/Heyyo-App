import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'


const App = () => {

  const {authUser} =useContext(AuthContext)
  return (
    <div className='bg-[url("./src/assets/bgIMG.PNG")] bg-contain'>
        <Routes>
          {/* <Route path='/' element={authUser ? <HomePage/>:<Navigate to="/login"/>}/>
          <Route path='/login' element={!authUser ? <LoginPage/>: <Navigate to="/"/>}/>
          <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/> */}

          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
        <Toaster/>
      
    </div>
  )
}

export default App
