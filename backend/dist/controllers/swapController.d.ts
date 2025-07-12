import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
interface AuthRequest extends Request {
    user?: IUser;
}
export declare const sendSwapRequest: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getReceivedRequests: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getSentRequests: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const acceptSwapRequest: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const rejectSwapRequest: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteSwapRequest: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const completeSwap: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const rateSwap: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=swapController.d.ts.map