// src/routes/feedbackRoutes.js
import express from 'express';
import feedbackController from '../controllers/feedbackController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', feedbackController.createFeedback);
router.get('/', authenticate, authorize(['ADMIN', 'SUPERADMIN']), feedbackController.getFeedback);
router.get('/:id', authenticate, authorize(['ADMIN', 'SUPERADMIN']), feedbackController.getFeedbackById);
router.patch('/:id', authenticate, authorize(['ADMIN', 'SUPERADMIN']), feedbackController.updateFeedbackStatus);

export default router;
