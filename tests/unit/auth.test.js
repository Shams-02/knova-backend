// tests/unit/auth.test.js

import { register, login, me } from '../../src/controllers/authController.js';
import { generateToken } from '../../src/utils/jwt.js';
import { prisma } from '../../src/config/prisma.js';
import bcrypt from 'bcryptjs';

// Mocking dependencies
jest.mock('../../src/utils/jwt.js');
jest.mock('../../src/config/prisma.js');
jest.mock('bcryptjs');

describe('Auth Controller - Unit Tests', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      bcrypt.hash.mockResolvedValue('hashedPassword');
      prisma.user.create.mockResolvedValue(mockReq.body);
      generateToken.mockReturnValue('mockedToken');

      await register(mockReq, mockRes, mockNext);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password: 'hashedPassword',
          name: 'Test User',
        },
      });
      expect(generateToken).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'mockedToken',
        user: mockReq.body,
      });
    });

    it('should handle registration error', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

      await register(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error('Hashing error'));
    });
  });

  describe('login', () => {
    it('should login an existing user successfully', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockReturnValue('mockedToken');

      await login(mockReq, mockRes, mockNext);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'test@example.com',
        },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(generateToken).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'mockedToken',
        user: mockUser,
      });
    });

    it('should handle login error - invalid credentials', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await login(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: {
          message: 'Invalid credentials',
        },
      });
    });

    it('should handle login error - user not found', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      prisma.user.findUnique.mockResolvedValue(null);

      await login(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: {
          message: 'Invalid credentials',
        },
      });
    });

    it('should handle login error - bcrypt compare error', async () => {
      mockReq.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockRejectedValue(new Error('Compare error'));

      await login(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error('Compare error'));
    });
  });

  describe('me', () => {
    it('should retrieve the current user profile successfully', async () => {
      mockReq.user = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
      };

      await me(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockReq.user);
    });
  });
});
