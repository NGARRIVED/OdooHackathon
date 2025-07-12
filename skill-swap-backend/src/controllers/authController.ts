import { Request, Response } from 'express';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Placeholder for OAuth callback handlers
export const oauthCallback = async (req: Request, res: Response) => {
  // On success, issue JWT and redirect or respond
  // req.user will be set by Passport
  const user = req.user;
  const token = jwt.sign({ id: (user as any)._id }, JWT_SECRET, { expiresIn: '7d' });
  // For now, just return token and user
  res.json({ token, user });
}; 