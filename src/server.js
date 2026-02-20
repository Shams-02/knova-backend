import app from './app.js';
import { PORT } from './config/env.js';

const port = PORT || 3000;

// Start the server
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
