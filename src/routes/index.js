// src/routes/index.js
import express from 'express';
import authRoutes from './authRoutes.js';
import affiliateRoutes from './affiliateRoutes.js';
import feedbackRoutes from './feedbackRoutes.js';
import courseRoutes from './courseRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/affiliate', affiliateRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/courses', courseRoutes);
router.use('/admin', adminRoutes);

export default router;
