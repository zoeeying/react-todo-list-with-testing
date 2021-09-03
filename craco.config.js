const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^@/(.*)$': '<rootDir>/src/$1',
      }
      return jestConfig
    },
  },
}
