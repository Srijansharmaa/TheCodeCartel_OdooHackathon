"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.get('/', userController_1.getUsers);
router.get('/:id', userController_1.getUserById);
router.post('/upload-photo', auth_1.protect, upload_1.default.single('photo'), userController_1.uploadProfilePhoto);
exports.default = router;
//# sourceMappingURL=users.js.map