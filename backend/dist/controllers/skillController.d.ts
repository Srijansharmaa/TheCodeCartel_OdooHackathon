import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
interface AuthRequest extends Request {
    user?: IUser;
}
export declare const getSkills: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addSkill: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const removeSkill: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=skillController.d.ts.map