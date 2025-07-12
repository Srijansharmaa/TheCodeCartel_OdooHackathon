import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    location?: string;
    bio?: string;
    profilePhoto?: string;
    skillsOffered: string[];
    skillsWanted: string[];
    availability: {
        weekdays: boolean;
        weekends: boolean;
        evenings: boolean;
        mornings: boolean;
    };
    isPublic: boolean;
    rating: number;
    totalRatings: number;
    isAdmin: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map