import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const { baseUrl, paths } = compilerOptions;

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    modulePaths: [baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(paths)
};