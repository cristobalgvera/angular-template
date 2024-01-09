import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', 'jest-extended/all'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  prettierPath: null,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
};

export default config;
