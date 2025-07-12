import { Request, Response } from 'express';
import User from '../models/User';

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req.user as any)._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate((req.user as any)._id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const setProfileVisibility = async (req: Request, res: Response) => {
  try {
    const { isPublic } = req.body;
    const user = await User.findByIdAndUpdate((req.user as any)._id, { isPublic }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isPublic: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found or not public' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const listPublicProfiles = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, name, skill, location } = req.query;
    const query: any = { isPublic: true };
    if (name) query.name = { $regex: name, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (skill) query.$or = [
      { skillsOffered: { $regex: skill, $options: 'i' } },
      { skillsWanted: { $regex: skill, $options: 'i' } },
    ];
    const users = await User.find(query)
      .select('-password')
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await User.countDocuments(query);
    res.json({ users, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const uploadProfilePhoto = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const user = await User.findByIdAndUpdate(
      (req.user as any)._id,
      { profilePhoto: `/uploads/${req.file.filename}` },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
}; 