import express from 'express';
import { 
  sendSwapRequest, 
  getReceivedRequests, 
  getSentRequests, 
  acceptSwapRequest, 
  rejectSwapRequest, 
  deleteSwapRequest,
  completeSwap,
  rateSwap
} from '../controllers/swapController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.post('/request', sendSwapRequest);
router.get('/received', getReceivedRequests);
router.get('/sent', getSentRequests);
router.put('/:id/accept', acceptSwapRequest);
router.put('/:id/reject', rejectSwapRequest);
router.delete('/:id', deleteSwapRequest);
router.put('/:id/complete', completeSwap);
router.post('/:id/rate', rateSwap);

export default router; 