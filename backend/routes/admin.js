import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: 'Welcome admin!', user: req.session.user });
});

export default router;
