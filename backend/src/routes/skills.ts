import express from 'express';
import { getSkills, addSkill, removeSkill } from '../controllers/skillController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Routes
router.get('/', getSkills);
router.post('/', protect, addSkill);
router.delete('/:id', protect, removeSkill);

export default router; 