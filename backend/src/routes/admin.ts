import express from 'express';
import { 
  getAllUsers, 
  banUser, 
  unbanUser, 
  getPlatformStats,
  getReports
} from '../controllers/adminController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All routes require admin access
router.use(protect);
router.use(authorize('admin'));

// Routes
router.get('/users', getAllUsers);
router.put('/users/:id/ban', banUser);
router.put('/users/:id/unban', unbanUser);
router.get('/stats', getPlatformStats);
router.get('/reports', getReports);

export default router; 