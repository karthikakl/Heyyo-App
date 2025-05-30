import express from 'express'
import { signUp,login,logout,onboard } from '../controllers/authController.js'
import { protectRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.put('/onboard',protectRoute,onboard)

//forget password
//send-reset-password-email

//checking if user is logged in or not!!
router.get('/check',protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})

export default router