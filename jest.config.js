const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: './',
    transform: {
        '^.+\\.[t]sx?$': 'ts-jest'
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/index.ts'
    ],
    cacheDirectory: '<rootDir>/tests/cache',
    coverageDirectory: '<rootDir>/tests/coverage',
    coverageProvider: 'babel',
    coverageReporters: [
        'json',
        'text-summary',
        'json-summary',
        'lcov'
    ],
    testMatch: [
        '<rootDir>tests/**/*(*.)@(test).[tj]s?(x)'
    ],
    automock: false,
    unmockedModulePathPatterns: [
        '<rootDir>/node_modules/'
    ],
    errorOnDeprecated: true,
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    bail: true,
    notify: true,
    notifyMode: 'failure-change',
    globals: {
        window: {}
    },
    extraGlobals: [
        'Function',
        'Array',
        'String',
        'Math'
    ]
};
