import express from 'express';
import { getUsers, getUserById, uploadProfilePhoto } from '../controllers/userController';
import { protect } from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

// Routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/upload-photo', protect, upload.single('photo'), uploadProfilePhoto);

export default router; 