import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import SwapRequest from '../models/SwapRequest';

interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Ban user (admin only)
// @route   PUT /api/admin/users/:id/ban
// @access  Private/Admin
export const banUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: true },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unban user (admin only)
// @route   PUT /api/admin/users/:id/unban
// @access  Private/Admin
export const unbanUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: false },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get platform stats (admin only)
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getPlatformStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isBanned: false });
    const bannedUsers = await User.countDocuments({ isBanned: true });
    const totalSwaps = await SwapRequest.countDocuments();
    const completedSwaps = await SwapRequest.countDocuments({ status: 'completed' });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        bannedUsers,
        totalSwaps,
        completedSwaps
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reports (admin only)
// @route   GET /api/admin/reports
// @access  Private/Admin
export const getReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // For now, return empty array - implement reporting system later
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    next(error);
  }
}; 