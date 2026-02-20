// src/middleware/loggingMiddleware.js

import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a write stream (in append mode)
const logStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' });

// Setup the logger
const loggingMiddleware = morgan('combined', { stream: logStream });

export default loggingMiddleware;
