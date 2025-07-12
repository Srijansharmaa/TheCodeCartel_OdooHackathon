"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePhoto = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find({ isPublic: true }).select('-password');
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
exports.getUsers = getUsers;
const getUserById = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
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
exports.getUserById = getUserById;
const uploadProfilePhoto = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                error: 'Please upload a file'
            });
            return;
        }
        const fileUrl = `/uploads/${req.file.filename}`;
        const user = await User_1.default.findByIdAndUpdate(req.user._id, { profilePhoto: fileUrl }, { new: true }).select('-password');
        res.json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadProfilePhoto = uploadProfilePhoto;
//# sourceMappingURL=userController.js.map