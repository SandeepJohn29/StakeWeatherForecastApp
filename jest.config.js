module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.(js|ts|tsx)$': 'ts-jest', '^@react-native/js-polyfills$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native/js-polyfills)/)',
    ],
    moduleNameMapper: {
      '^react-native$': 'react-native-web',
    },
    //setupFiles: ['<rootDir>/jest/setup.js'],
    testEnvironment: 'jsdom',
  };
  