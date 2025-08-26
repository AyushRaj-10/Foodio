import express from 'express';
import { register, login, logout, verifyOtp , checkAuth , getMe} from '../controllers/user.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-otp', verifyOtp);
router.get('/check',checkAuth)
router.get('/getme', authMiddleware , getMe)

export default router;