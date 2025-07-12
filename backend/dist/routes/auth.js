"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const registerValidation = [
    (0, express_validator_1.body)('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
];
const updateProfileValidation = [
    (0, express_validator_1.body)('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('location').optional().trim().isLength({ max: 100 }).withMessage('Location cannot be more than 100 characters'),
    (0, express_validator_1.body)('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio cannot be more than 500 characters')
];
router.post('/register', registerValidation, authController_1.register);
router.post('/login', loginValidation, authController_1.login);
router.get('/profile', auth_1.protect, authController_1.getProfile);
router.put('/profile', auth_1.protect, updateProfileValidation, authController_1.updateProfile);
exports.default = router;
//# sourceMappingURL=auth.js.map