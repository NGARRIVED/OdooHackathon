import { Router } from 'express';
import passport = require('passport');
import { addRating, getUserRatings } from '../controllers/ratingController';
import validate from '../middlewares/validate';
import { addRatingSchema } from '../validations/rating';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), validate(addRatingSchema), addRating);
router.get('/:id', getUserRatings);

export default router; 