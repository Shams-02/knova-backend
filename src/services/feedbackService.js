// src/services/feedbackService.js

import { v4 as uuidv4 } from 'uuid';
import { PrismaClientSingleton } from '../prisma/prismaClientSingleton.js';

const prisma = PrismaClientSingleton.getInstance();

const createFeedback = async (data) => {
  const newFeedback = await prisma.feedback.create({
    data: {
      id: uuidv4(),
      userId: data.userId || null,
      userName: data.userName,
      userEmail: data.userEmail,
      type: data.type,
      message: data.message,
      timestamp: new Date(),
      status: 'NEW',
      userAgent: data.userAgent,
    },
  });

  // Simulate sending email notification to admins
  console.log(`Simulating email notification for new feedback: ${newFeedback.id}`);

  return newFeedback;
};

const getFeedbackList = async (status, page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;
  const where = status ? { status } : {};

  const [feedback, totalCount] = await prisma.$transaction([
    prisma.feedback.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { timestamp: 'desc' },
    }),
    prisma.feedback.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    feedback,
    page,
    pageSize,
    totalCount,
    totalPages,
  };
};

const getFeedbackById = async (id) => {
  const feedback = await prisma.feedback.findUnique({ where: { id } });
  return feedback;
};

const updateFeedbackStatus = async (id, status) => {
  const updatedFeedback = await prisma.feedback.update({
    where: { id },
    data: { status },
  });
  return updatedFeedback;
};

export default {
  createFeedback,
  getFeedbackList,
  getFeedbackById,
  updateFeedbackStatus,
};
