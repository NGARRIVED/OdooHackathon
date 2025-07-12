import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability?: string;
  profilePhoto?: string;
  isPublic: boolean;
  rating: number;
  numRatings: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  skillsOffered: [{ type: String }],
  skillsWanted: [{ type: String }],
  availability: { type: String },
  profilePhoto: { type: String },
  isPublic: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema); 