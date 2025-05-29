import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { acceptFriendRequest, sendFriendRequest } from "../controllers/friends.controller.js";

const router = express.Router();

router.post("/sendFriendRequest", protectRoute, sendFriendRequest);
router.post("/acceptFriendRequest", protectRoute, acceptFriendRequest);

export default router;