// src/routes/courseRoutes.js
import express from 'express';
import courseController from '../controllers/courseController.js';

const router = express.Router();

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

export default router;
