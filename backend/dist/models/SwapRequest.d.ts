import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ISwapRequest, {}, {}, {}, mongoose.Document<unknown, {}, ISwapRequest> & ISwapRequest & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=SwapRequest.d.ts.map