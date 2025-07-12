"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReports = exports.getPlatformStats = exports.unbanUser = exports.banUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const SwapRequest_1 = __importDefault(require("../models/SwapRequest"));
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const banUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true }).select('-password');
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
    }
    catch (error) {
        next(error);
    }
};
exports.banUser = banUser;
const unbanUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, { isBanned: false }, { new: true }).select('-password');
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
    }
    catch (error) {
        next(error);
    }
};
exports.unbanUser = unbanUser;
const getPlatformStats = async (req, res, next) => {
    try {
        const totalUsers = await User_1.default.countDocuments();
        const activeUsers = await User_1.default.countDocuments({ isBanned: false });
        const bannedUsers = await User_1.default.countDocuments({ isBanned: true });
        const totalSwaps = await SwapRequest_1.default.countDocuments();
        const completedSwaps = await SwapRequest_1.default.countDocuments({ status: 'completed' });
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
    }
    catch (error) {
        next(error);
    }
};
exports.getPlatformStats = getPlatformStats;
const getReports = async (req, res, next) => {
    try {
        res.json({
            success: true,
            data: []
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getReports = getReports;
//# sourceMappingURL=adminController.js.map