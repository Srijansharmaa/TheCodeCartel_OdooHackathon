import { Request, Response, NextFunction } from 'express';
import SwapRequest from '../models/SwapRequest';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Send swap request
// @route   POST /api/swaps/request
// @access  Private
export const sendSwapRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { recipientId, skillOffered, skillWanted, message } = req.body;

    const swapRequest = await SwapRequest.create({
      requester: req.user!._id,
      recipient: recipientId,
      offeredSkill: skillOffered,
      requestedSkill: skillWanted,
      message,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: swapRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get received requests
// @route   GET /api/swaps/received
// @access  Private
export const getReceivedRequests = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await SwapRequest.find({ recipient: req.user!._id })
      .populate('sender', 'name email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get sent requests
// @route   GET /api/swaps/sent
// @access  Private
export const getSentRequests = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await SwapRequest.find({ sender: req.user!._id })
      .populate('recipient', 'name email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept swap request
// @route   PUT /api/swaps/:id/accept
// @access  Private
export const acceptSwapRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      res.status(404).json({
        success: false,
        error: 'Swap request not found'
      });
      return;
    }

    if (swapRequest.recipient.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Not authorized to accept this request'
      });
      return;
    }

    swapRequest.status = 'accepted';
    await swapRequest.save();

    res.json({
      success: true,
      data: swapRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject swap request
// @route   PUT /api/swaps/:id/reject
// @access  Private
export const rejectSwapRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      res.status(404).json({
        success: false,
        error: 'Swap request not found'
      });
      return;
    }

    if (swapRequest.recipient.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Not authorized to reject this request'
      });
      return;
    }

    swapRequest.status = 'rejected';
    await swapRequest.save();

    res.json({
      success: true,
      data: swapRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete swap request
// @route   DELETE /api/swaps/:id
// @access  Private
export const deleteSwapRequest = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      res.status(404).json({
        success: false,
        error: 'Swap request not found'
      });
      return;
    }

    if (swapRequest.requester.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: 'Not authorized to delete this request'
      });
      return;
    }

    await SwapRequest.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete swap
// @route   PUT /api/swaps/:id/complete
// @access  Private
export const completeSwap = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      res.status(404).json({
        success: false,
        error: 'Swap request not found'
      });
      return;
    }

    if (swapRequest.status !== 'accepted') {
      res.status(400).json({
        success: false,
        error: 'Swap request must be accepted before completion'
      });
      return;
    }

    swapRequest.status = 'completed';
    await swapRequest.save();

    res.json({
      success: true,
      data: swapRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Rate swap
// @route   POST /api/swaps/:id/rate
// @access  Private
export const rateSwap = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { rating, comment } = req.body;
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      res.status(404).json({
        success: false,
        error: 'Swap request not found'
      });
      return;
    }

    if (swapRequest.status !== 'completed') {
      res.status(400).json({
        success: false,
        error: 'Can only rate completed swaps'
      });
      return;
    }

    // Add rating to swap request
    swapRequest.requesterRating = rating;
    swapRequest.requesterFeedback = comment;
    await swapRequest.save();

    res.json({
      success: true,
      data: swapRequest
    });
  } catch (error) {
    next(error);
  }
}; 