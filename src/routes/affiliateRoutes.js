// src/routes/affiliateRoutes.js
import express from 'express';
import affiliateController from '../controllers/affiliateController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, affiliateController.getAffiliate);
router.get('/referrals', authenticate, affiliateController.getReferrals);

export default router;
