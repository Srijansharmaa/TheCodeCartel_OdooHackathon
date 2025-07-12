"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const swapRequestSchema = new mongoose_1.Schema({
    requester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestedSkill: {
        type: String,
        required: [true, 'Please specify the skill you want to learn'],
        trim: true
    },
    offeredSkill: {
        type: String,
        required: [true, 'Please specify the skill you can teach'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
        default: 'pending'
    },
    message: {
        type: String,
        trim: true,
        maxlength: [500, 'Message cannot be more than 500 characters']
    },
    requesterRating: {
        type: Number,
        min: 1,
        max: 5
    },
    recipientRating: {
        type: Number,
        min: 1,
        max: 5
    },
    requesterFeedback: {
        type: String,
        trim: true,
        maxlength: [1000, 'Feedback cannot be more than 1000 characters']
    },
    recipientFeedback: {
        type: String,
        trim: true,
        maxlength: [1000, 'Feedback cannot be more than 1000 characters']
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});
swapRequestSchema.index({ requester: 1, status: 1 });
swapRequestSchema.index({ recipient: 1, status: 1 });
swapRequestSchema.index({ status: 1, createdAt: -1 });
exports.default = mongoose_1.default.model('SwapRequest', swapRequestSchema);
//# sourceMappingURL=SwapRequest.js.map