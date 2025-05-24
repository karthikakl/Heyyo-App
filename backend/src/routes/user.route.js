import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  outgoingRequests
} from "../controllers/userController.js";
const router = express.Router();

//applying auth middleware to all routes.
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/firend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-request", getFriendRequests);
router.get("/outgoing-friend-requests",outgoingRequests);

export default router;
