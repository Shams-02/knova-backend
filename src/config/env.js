import { config } from 'dotenv';

config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
