import mongoose, { Document, Schema } from 'mongoose';

export interface ISwapRequest extends Document {
  fromUser: mongoose.Types.ObjectId;
  toUser: mongoose.Types.ObjectId;
  offeredSkill: string;
  wantedSkill: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const SwapRequestSchema: Schema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  offeredSkill: { type: String, required: true },
  wantedSkill: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<ISwapRequest>('SwapRequest', SwapRequestSchema); 