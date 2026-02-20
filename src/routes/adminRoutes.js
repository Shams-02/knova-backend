// src/routes/adminRoutes.js
import express from 'express';
import adminController from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', authenticate, authorize(['ADMIN', 'SUPERADMIN']), adminController.getUsers);
router.get('/users/:id', authenticate, authorize(['ADMIN', 'SUPERADMIN']), adminController.getUserById);
router.patch('/users/:id', authenticate, authorize(['ADMIN', 'SUPERADMIN']), adminController.updateUser);

export default router;
