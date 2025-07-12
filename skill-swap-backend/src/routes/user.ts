import { Router } from 'express';
import passport = require('passport');
import { getMe, updateProfile, setProfileVisibility, getPublicProfile, listPublicProfiles, uploadProfilePhoto } from '../controllers/userController';
import validate from '../middlewares/validate';
import { updateProfileSchema, setProfileVisibilitySchema } from '../validations/user';
import upload from '../middlewares/upload';

const router = Router();

// Protected routes
router.get('/me', passport.authenticate('jwt', { session: false }), getMe);
router.put('/me', passport.authenticate('jwt', { session: false }), validate(updateProfileSchema), updateProfile);
router.patch('/me/visibility', passport.authenticate('jwt', { session: false }), validate(setProfileVisibilitySchema), setProfileVisibility);
router.post('/me/photo', passport.authenticate('jwt', { session: false }), upload.single('photo'), uploadProfilePhoto);

// Public profile
router.get('/public', listPublicProfiles);
router.get('/:id', getPublicProfile);

export default router; 