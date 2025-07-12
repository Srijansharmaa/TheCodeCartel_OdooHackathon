"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swapController_1 = require("../controllers/swapController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.protect);
router.post('/request', swapController_1.sendSwapRequest);
router.get('/received', swapController_1.getReceivedRequests);
router.get('/sent', swapController_1.getSentRequests);
router.put('/:id/accept', swapController_1.acceptSwapRequest);
router.put('/:id/reject', swapController_1.rejectSwapRequest);
router.delete('/:id', swapController_1.deleteSwapRequest);
router.put('/:id/complete', swapController_1.completeSwap);
router.post('/:id/rate', swapController_1.rateSwap);
exports.default = router;
//# sourceMappingURL=swaps.js.map