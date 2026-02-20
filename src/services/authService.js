// src/services/authService.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientSingleton } from '../prisma/prismaClientSingleton.js';

const prisma = PrismaClientSingleton.getInstance();

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: '7d' });
};

const register = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({ data: { id: uuidv4(), email, password: hashedPassword, name } });
  const token = generateToken(newUser.id);
  return { user: newUser, token };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return { user, token };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export default {
  register,
  login,
  getMe,
};
