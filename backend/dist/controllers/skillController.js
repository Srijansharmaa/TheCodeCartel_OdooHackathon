"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSkill = exports.addSkill = exports.getSkills = void 0;
const User_1 = __importDefault(require("../models/User"));
const getSkills = async (req, res, next) => {
    try {
        const users = await User_1.default.find({ isPublic: true }).select('skillsOffered skillsWanted');
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
    }
    catch (error) {
        next(error);
    }
};
exports.getSkills = getSkills;
const addSkill = async (req, res, next) => {
    try {
        const { skill, type } = req.body;
        if (!skill || !type) {
            res.status(400).json({
                success: false,
                error: 'Please provide skill and type (offered or wanted)'
            });
            return;
        }
        const updateField = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
        const user = await User_1.default.findByIdAndUpdate(req.user._id, { $addToSet: { [updateField]: skill } }, { new: true }).select('-password');
        res.json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addSkill = addSkill;
const removeSkill = async (req, res, next) => {
    try {
        const { skill, type } = req.body;
        if (!skill || !type) {
            res.status(400).json({
                success: false,
                error: 'Please provide skill and type (offered or wanted)'
            });
            return;
        }
        const updateField = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
        const user = await User_1.default.findByIdAndUpdate(req.user._id, { $pull: { [updateField]: skill } }, { new: true }).select('-password');
        res.json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.removeSkill = removeSkill;
//# sourceMappingURL=skillController.js.map