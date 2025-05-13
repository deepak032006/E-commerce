import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// Normal login/register
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: true,
  }),
  (req, res) => {
    const user = {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };

    // Redirect user to frontend with user data as query
    res.redirect(`http://localhost:5173?user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

export default router;
