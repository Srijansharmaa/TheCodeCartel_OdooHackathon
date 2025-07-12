import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
interface AuthRequest extends Request {
    user?: IUser;
}
export declare const getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const uploadProfilePhoto: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=userController.d.ts.map