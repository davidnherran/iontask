module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/mocks/fileMock.ts',
        // Agrega otros tipos de archivos que necesites manejar
        '\\.(css|less)$': '<rootDir>/src/mocks/fileMock.ts',
    },
    testMatch: ['<rootDir>/src/**/__tests__/**/*.{ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{ts,tsx}'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect',
    ]
}
