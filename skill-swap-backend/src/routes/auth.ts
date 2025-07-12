import { Router } from 'express';
import passport = require('passport');
import { register, login, oauthCallback } from '../controllers/authController';
import validate from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validations/auth';

const router = Router();

// Email/password
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), oauthCallback);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false }), oauthCallback);

export default router; 