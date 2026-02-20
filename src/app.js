import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler, notFound } from './middleware/error.js';
import { requestLogger } from './middleware/logger.js';
import { authRouter } from './routes/authRoutes.js';
import { affiliateRouter } from './routes/affiliateRoutes.js';
import { feedbackRouter } from './routes/feedbackRoutes.js';
import { coursesRouter } from './routes/coursesRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { corsOptions } from './config/cors.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/auth', authRouter);
app.use('/affiliate', affiliateRouter);
app.use('/feedback', feedbackRouter);
app.use('/courses', coursesRouter);
app.use('/admin', adminRouter);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
