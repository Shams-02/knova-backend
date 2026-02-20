// src/services/courseService.js

import { PrismaClientSingleton } from '../prisma/prismaClientSingleton.js';

const prisma = PrismaClientSingleton.getInstance();

const getCourses = async () => {
  return prisma.course.findMany();
};

const getCourseById = async (id) => {
  return prisma.course.findUnique({ where: { id } });
};

export default {
  getCourses,
  getCourseById,
};
