import express from 'express';
import { login, signup, logout, getMe } from '../controllers/auth.controller.js';
import protectRoute

from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

router.get("/me", protectRoute, getMe);

export default router;