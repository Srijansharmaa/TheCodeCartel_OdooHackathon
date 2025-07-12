import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({ isPublic: true }).select('-password');
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');

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

// @desc    Upload profile photo
// @route   POST /api/users/upload-photo
// @access  Private
export const uploadProfilePhoto = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'Please upload a file'
      });
      return;
    }

    // For now, we'll just return the file info
    // In a real app, you'd upload to Cloudinary or similar service
    const fileUrl = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { profilePhoto: fileUrl },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}; 