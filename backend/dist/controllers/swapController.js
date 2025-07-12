"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateSwap = exports.completeSwap = exports.deleteSwapRequest = exports.rejectSwapRequest = exports.acceptSwapRequest = exports.getSentRequests = exports.getReceivedRequests = exports.sendSwapRequest = void 0;
const SwapRequest_1 = __importDefault(require("../models/SwapRequest"));
const sendSwapRequest = async (req, res, next) => {
    try {
        const { recipientId, skillOffered, skillWanted, message } = req.body;
        const swapRequest = await SwapRequest_1.default.create({
            requester: req.user._id,
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
    }
    catch (error) {
        next(error);
    }
};
exports.sendSwapRequest = sendSwapRequest;
const getReceivedRequests = async (req, res, next) => {
    try {
        const requests = await SwapRequest_1.default.find({ recipient: req.user._id })
            .populate('sender', 'name email')
            .sort('-createdAt');
        res.json({
            success: true,
            count: requests.length,
            data: requests
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getReceivedRequests = getReceivedRequests;
const getSentRequests = async (req, res, next) => {
    try {
        const requests = await SwapRequest_1.default.find({ sender: req.user._id })
            .populate('recipient', 'name email')
            .sort('-createdAt');
        res.json({
            success: true,
            count: requests.length,
            data: requests
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSentRequests = getSentRequests;
const acceptSwapRequest = async (req, res, next) => {
    try {
        const swapRequest = await SwapRequest_1.default.findById(req.params.id);
        if (!swapRequest) {
            res.status(404).json({
                success: false,
                error: 'Swap request not found'
            });
            return;
        }
        if (swapRequest.recipient.toString() !== req.user._id.toString()) {
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
    }
    catch (error) {
        next(error);
    }
};
exports.acceptSwapRequest = acceptSwapRequest;
const rejectSwapRequest = async (req, res, next) => {
    try {
        const swapRequest = await SwapRequest_1.default.findById(req.params.id);
        if (!swapRequest) {
            res.status(404).json({
                success: false,
                error: 'Swap request not found'
            });
            return;
        }
        if (swapRequest.recipient.toString() !== req.user._id.toString()) {
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
    }
    catch (error) {
        next(error);
    }
};
exports.rejectSwapRequest = rejectSwapRequest;
const deleteSwapRequest = async (req, res, next) => {
    try {
        const swapRequest = await SwapRequest_1.default.findById(req.params.id);
        if (!swapRequest) {
            res.status(404).json({
                success: false,
                error: 'Swap request not found'
            });
            return;
        }
        if (swapRequest.requester.toString() !== req.user._id.toString()) {
            res.status(403).json({
                success: false,
                error: 'Not authorized to delete this request'
            });
            return;
        }
        await SwapRequest_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSwapRequest = deleteSwapRequest;
const completeSwap = async (req, res, next) => {
    try {
        const swapRequest = await SwapRequest_1.default.findById(req.params.id);
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
    }
    catch (error) {
        next(error);
    }
};
exports.completeSwap = completeSwap;
const rateSwap = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const swapRequest = await SwapRequest_1.default.findById(req.params.id);
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
        swapRequest.requesterRating = rating;
        swapRequest.requesterFeedback = comment;
        await swapRequest.save();
        res.json({
            success: true,
            data: swapRequest
        });
    }
    catch (error) {
        next(error);
    }
};
exports.rateSwap = rateSwap;
//# sourceMappingURL=swapController.js.map