import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './'
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/e2e','<rootDir>/_temp'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

export default createJestConfig(config);
