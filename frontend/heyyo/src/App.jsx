import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import toast, { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
        <Toaster/>
      
    </div>
  )
}

export default App
