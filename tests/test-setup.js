// tests/test-setup.js

// This file can be used to set up any global test configurations
// For example, you can define global mocks or configure test environments

// Example: Mocking environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'test-database-url';

// Example: Global mock for a specific module
// jest.mock('module-name', () => ({ ... }));

// Add any other necessary setup here
