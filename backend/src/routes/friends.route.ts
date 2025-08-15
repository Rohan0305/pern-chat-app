import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { acceptFriendRequest, getReceivedFriendRequests, sendFriendRequest, ignoreRequest } from "../controllers/friends.controller.js";

const router = express.Router();

router.post("/sendFriendRequest", protectRoute, sendFriendRequest);
router.post("/acceptFriendRequest/:id", protectRoute, acceptFriendRequest);
router.post("/ignoreRequest/:id", protectRoute, ignoreRequest);
router.get("/getReceivedFriendRequests", protectRoute, getReceivedFriendRequests)

export default router;