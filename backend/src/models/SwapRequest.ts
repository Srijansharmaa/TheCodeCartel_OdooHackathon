import mongoose, { Document, Schema } from 'mongoose';

export interface ISwapRequest extends Document {
  requester: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  requestedSkill: string;
  offeredSkill: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message?: string;
  requesterRating?: number;
  recipientRating?: number;
  requesterFeedback?: string;
  recipientFeedback?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const swapRequestSchema = new Schema<ISwapRequest>({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedSkill: {
    type: String,
    required: [true, 'Please specify the skill you want to learn'],
    trim: true
  },
  offeredSkill: {
    type: String,
    required: [true, 'Please specify the skill you can teach'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  requesterRating: {
    type: Number,
    min: 1,
    max: 5
  },
  recipientRating: {
    type: Number,
    min: 1,
    max: 5
  },
  requesterFeedback: {
    type: String,
    trim: true,
    maxlength: [1000, 'Feedback cannot be more than 1000 characters']
  },
  recipientFeedback: {
    type: String,
    trim: true,
    maxlength: [1000, 'Feedback cannot be more than 1000 characters']
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
swapRequestSchema.index({ requester: 1, status: 1 });
swapRequestSchema.index({ recipient: 1, status: 1 });
swapRequestSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<ISwapRequest>('SwapRequest', swapRequestSchema); 