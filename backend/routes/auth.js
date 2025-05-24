import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout gagal' });
    }
    res.clearCookie('connect.sid');  // hapus cookie session di browser
    res.json({ message: 'Logout berhasil' });
  });
});

export default router;
