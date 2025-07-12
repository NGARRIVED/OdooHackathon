import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  type: 'swap_request' | 'swap_accepted' | 'swap_rejected' | 'rating_received';
  title: string;
  message: string;
  relatedSwap?: mongoose.Types.ObjectId;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['swap_request', 'swap_accepted', 'swap_rejected', 'rating_received'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  relatedSwap: { type: Schema.Types.ObjectId, ref: 'SwapRequest' },
  read: { type: Boolean, default: false },
}, { timestamps: true });

// Index for efficient queries
NotificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });

export default mongoose.model<INotification>('Notification', NotificationSchema); 