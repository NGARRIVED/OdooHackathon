import mongoose, { Document, Schema } from 'mongoose';

export interface IRating extends Document {
  user: mongoose.Types.ObjectId;
  rater: mongoose.Types.ObjectId;
  rating: number;
  feedback?: string;
}

const RatingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rater: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String },
}, { timestamps: true });

export default mongoose.model<IRating>('Rating', RatingSchema); 