"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.protect);
router.use((0, auth_1.authorize)('admin'));
router.get('/users', adminController_1.getAllUsers);
router.put('/users/:id/ban', adminController_1.banUser);
router.put('/users/:id/unban', adminController_1.unbanUser);
router.get('/stats', adminController_1.getPlatformStats);
router.get('/reports', adminController_1.getReports);
exports.default = router;
//# sourceMappingURL=admin.js.map