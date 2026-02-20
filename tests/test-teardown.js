// tests/test-teardown.js

// This file can be used to perform any cleanup tasks after running tests
// For example, you can reset mocks, clear database data, or close connections

// Example: Resetting all mocks
afterEach(() => {
  jest.clearAllMocks();
});

// Example: Closing database connection
// afterAll(async () => {
//   await db.close();
// });

// Add any other necessary teardown here
