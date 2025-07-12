import { Request, Response } from 'express';
import SwapRequest from '../models/SwapRequest';
import Notification from '../models/Notification';
import User from '../models/User';

export const createSwapRequest = async (req: Request, res: Response) => {
  try {
    const { toUser, offeredSkill, wantedSkill, message } = req.body;
    const fromUser = (req.user as any)._id;
    
    // Create the swap request
    const swap = await SwapRequest.create({ fromUser, toUser, offeredSkill, wantedSkill, message });
    
    // Get sender's name for notification
    const sender = await User.findById(fromUser).select('name');
    
    // Create notification for the recipient
    await Notification.create({
      recipient: toUser,
      sender: fromUser,
      type: 'swap_request',
      title: 'New Skill Swap Request',
      message: `${sender?.name || 'Someone'} wants to exchange ${offeredSkill} for ${wantedSkill}`,
      relatedSwap: swap._id
    });
    
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getMySwapRequests = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const sent = await SwapRequest.find({ fromUser: userId }).populate('toUser', 'name email profilePhoto');
    const received = await SwapRequest.find({ toUser: userId }).populate('fromUser', 'name email profilePhoto');
    res.json({ sent, received });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getMySwapRequestsPaginated = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const { page = 1, limit = 10, status } = req.query;
    const sentQuery: any = { fromUser: userId };
    const receivedQuery: any = { toUser: userId };
    if (status) {
      sentQuery.status = status;
      receivedQuery.status = status;
    }
    const sent = await SwapRequest.find(sentQuery)
      .populate('toUser', 'name email profilePhoto')
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const received = await SwapRequest.find(receivedQuery)
      .populate('fromUser', 'name email profilePhoto')
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const sentTotal = await SwapRequest.countDocuments(sentQuery);
    const receivedTotal = await SwapRequest.countDocuments(receivedQuery);
    res.json({
      sent, sentTotal, sentPages: Math.ceil(sentTotal / +limit),
      received, receivedTotal, receivedPages: Math.ceil(receivedTotal / +limit),
      page: +page, limit: +limit
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const updateSwapStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const userId = (req.user as any)._id;
    
    const swap = await SwapRequest.findOneAndUpdate(
      { _id: req.params.id, toUser: userId },
      { status },
      { new: true }
    ).populate('fromUser', 'name');
    
    if (!swap) return res.status(404).json({ message: 'Swap request not found' });
    
    // Get responder's name for notification
    const responder = await User.findById(userId).select('name');
    
    // Create notification for the original requester
    const notificationType = status === 'accepted' ? 'swap_accepted' : 'swap_rejected';
    const notificationTitle = status === 'accepted' ? 'Swap Request Accepted' : 'Swap Request Rejected';
    const notificationMessage = status === 'accepted' 
      ? `${responder?.name || 'Someone'} accepted your swap request for ${swap.offeredSkill} ↔ ${swap.wantedSkill}`
      : `${responder?.name || 'Someone'} declined your swap request for ${swap.offeredSkill} ↔ ${swap.wantedSkill}`;
    
    await Notification.create({
      recipient: swap.fromUser._id,
      sender: userId,
      type: notificationType,
      title: notificationTitle,
      message: notificationMessage,
      relatedSwap: swap._id
    });
    
    res.json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
}; 