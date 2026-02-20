// tests/jest.config.js

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  // setupFiles: ['./tests/test-setup.js'], // Path to setup file
  // teardownFiles: ['./tests/test-teardown.js'], // Path to teardown file
  // testMatch: ['**/tests/**/*.test.js'], // Pattern for test files
  // collectCoverage: true, // Enable coverage collection
  // coverageDirectory: 'coverage', // Coverage report directory
  // moduleNameMapper: { // Module alias mappings
  //   '^@/(.*)$': '<rootDir>/src/$1',
  // },
  // transform: { // Transformations for specific file types
  //   '^.+\.js$': 'babel-jest',
  // },
  // clearMocks: true, // Automatically clear mocks between tests
  // resetMocks: false, // Do not reset mocks between tests
  // restoreMocks: false, // Do not restore mocks between tests
};

export default config;
