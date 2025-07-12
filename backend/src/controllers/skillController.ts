import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({ isPublic: true }).select('skillsOffered skillsWanted');
    
    const allSkillsOffered = users.flatMap(user => user.skillsOffered);
    const allSkillsWanted = users.flatMap(user => user.skillsWanted);
    
    const uniqueSkillsOffered = [...new Set(allSkillsOffered)];
    const uniqueSkillsWanted = [...new Set(allSkillsWanted)];

    res.json({
      success: true,
      data: {
        offered: uniqueSkillsOffered,
        wanted: uniqueSkillsWanted
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add skill to user
// @route   POST /api/skills
// @access  Private
export const addSkill = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { skill, type } = req.body; // type can be 'offered' or 'wanted'

    if (!skill || !type) {
      res.status(400).json({
        success: false,
        error: 'Please provide skill and type (offered or wanted)'
      });
      return;
    }

    const updateField = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    
    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { $addToSet: { [updateField]: skill } },
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

// @desc    Remove skill from user
// @route   DELETE /api/skills/:id
// @access  Private
export const removeSkill = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { skill, type } = req.body; // type can be 'offered' or 'wanted'

    if (!skill || !type) {
      res.status(400).json({
        success: false,
        error: 'Please provide skill and type (offered or wanted)'
      });
      return;
    }

    const updateField = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    
    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { $pull: { [updateField]: skill } },
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