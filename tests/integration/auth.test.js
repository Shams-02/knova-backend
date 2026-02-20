// tests/integration/auth.test.js

import request from 'supertest';
import { app } from '../../src/app.js';
import { prisma } from '../../src/config/prisma.js';
import { generateToken } from '../../src/utils/jwt.js';

// Mocking the prisma client to prevent actual database calls during testing
jest.mock('../../src/config/prisma.js', () => {
  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  return {
    prisma: mockPrisma,
  };
});

// Mocking JWT generation
jest.mock('../../src/utils/jwt.js', () => ({
  generateToken: jest.fn().mockReturnValue('mockedToken'),
}));


describe('Auth Routes - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      prisma.user.create.mockResolvedValue(userData);

      const response = await request(app)
        .post('/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        token: 'mockedToken',
        user: userData,
      });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.any(Object),
      });
    });

    it('should handle registration error', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      prisma.user.create.mockRejectedValue(new Error('Registration error'));

      const response = await request(app)
        .post('/auth/register')
        .send(userData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: {
          message: 'Internal Server Error',
        },
      });
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user successfully', async () => {
      const userData = {
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

      const response = await request(app)
        .post('/auth/login')
        .send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: 'mockedToken',
        user: mockUser,
      });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: userData.email,
        },
      });
    });

    it('should handle login error - invalid credentials', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send(userData);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: {
          message: 'Invalid credentials',
        },
      });
    });
  });

  describe('GET /auth/me', () => {
    it('should retrieve the current user profile successfully', async () => {
      const mockUser = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
      };

      const token = 'mockedToken';

      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should handle authentication error - no token', async () => {
      const response = await request(app)
        .get('/auth/me');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: {
          message: 'No token provided',
        },
      });
    });

    it('should handle authentication error - invalid token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer invalidToken');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: {
          message: 'Invalid token',
        },
      });
    });
  });
});
