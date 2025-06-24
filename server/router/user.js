import express from 'express';
import { getUser, createUser } from '../controller/user.js';
import { authMiddleware } from '../middlewares/auth.js';
import { googleAuth } from '../controller/authController.js';

const router = express.Router();

router.post('/login', getUser);
router.post('/signup', createUser);
router.post('/auth/google', googleAuth);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

export default router;