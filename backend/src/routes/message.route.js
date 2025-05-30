import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {getFriendsList,getMessages,markMessageSeen, sendMessage } from '../controllers/messageContoller.js'

const router = express.Router();
router.use(protectRoute);

router.get('/friendsList',getFriendsList);
router.get('/:id',getMessages);
router.put('/mark/:id',markMessageSeen);
router.post('/send/:id',sendMessage);

export default router;
