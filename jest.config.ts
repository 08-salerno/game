import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  "setupFilesAfterEnv": ["<rootDir>src/setupTests.js"]
};
export default config;

