import { Request, Response } from 'express';
import Rating from '../models/Rating';
import User from '../models/User';

export const addRating = async (req: Request, res: Response) => {
  try {
    const { user, rating, feedback } = req.body;
    const rater = (req.user as any)._id;
    if (user === rater.toString()) return res.status(400).json({ message: 'Cannot rate yourself' });
    const newRating = await Rating.create({ user, rater, rating, feedback });
    // Update user's average rating
    const ratings = await Rating.find({ user });
    const avg = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;
    await User.findByIdAndUpdate(user, { rating: avg, numRatings: ratings.length });
    res.status(201).json(newRating);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getUserRatings = async (req: Request, res: Response) => {
  try {
    const user = req.params.id;
    const ratings = await Rating.find({ user }).populate('rater', 'name profilePhoto');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
}; 