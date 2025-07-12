import { Router } from 'express';
import passport = require('passport');
import { createSwapRequest, getMySwapRequests, updateSwapStatus, getMySwapRequestsPaginated } from '../controllers/swapController';
import validate from '../middlewares/validate';
import { createSwapSchema, updateSwapStatusSchema } from '../validations/swap';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), validate(createSwapSchema), createSwapRequest);
router.get('/mine', passport.authenticate('jwt', { session: false }), getMySwapRequests);
router.get('/mine/paginated', passport.authenticate('jwt', { session: false }), getMySwapRequestsPaginated);
router.patch('/:id/status', passport.authenticate('jwt', { session: false }), validate(updateSwapStatusSchema), updateSwapStatus);

export default router; 