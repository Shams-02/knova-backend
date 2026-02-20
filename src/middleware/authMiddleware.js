// src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import { PrismaClient } from '../prisma/client.js';

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true }, // Select only necessary fields
      });

      if (!req.user) {
        return res.status(401).json({ error: { message: 'Not authorized, user not found', code: 'NOT_AUTHORIZED' } });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: { message: 'Not authorized, invalid token', code: 'INVALID_TOKEN' } });
    }
  }

  if (!token) {
    return res.status(401).json({ error: { message: 'Not authorized, no token', code: 'NO_TOKEN' } });
  }
};

export default authMiddleware;
