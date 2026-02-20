// src/services/adminService.js

import { PrismaClientSingleton } from '../prisma/prismaClientSingleton.js';

const prisma = PrismaClientSingleton.getInstance();

const getUsers = async (page = 1, pageSize = 10, filter = {}) => {
  const skip = (page - 1) * pageSize;

  const [users, totalCount] = await prisma.$transaction([
    prisma.user.findMany({
      where: filter,
      skip,
      take: pageSize,
    }),
    prisma.user.count({ where: filter }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    users,
    page,
    pageSize,
    totalCount,
    totalPages,
  };
};

const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const updateUser = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

export default {
  getUsers,
  getUserById,
  updateUser,
};
