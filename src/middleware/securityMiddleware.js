// src/middleware/securityMiddleware.js

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const securityMiddleware = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Enable CORS
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies/session storage if needed
  };
  app.use(cors(corsOptions));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });

  // Apply the rate limiting middleware to all requests
  app.use(limiter);
};

export default securityMiddleware;
