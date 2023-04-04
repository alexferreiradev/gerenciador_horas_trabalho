module.exports = {
  env: {
    es6: true,
    jest: true,
    browser: true,
  },
  extends: [
    // 'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@babel', 'react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    // Somente para inicio de dev, uma POC, nao commit descomentado
    // 'no-unused-vars': 0,
    // 'no-console': 0,

    'no-console': ['error', { allow: ['tron', 'info', 'warn', 'error'] }],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  // settings: {
  //   "import/resolver": {
  //     "babel-plugin-root-import": {
  //       rootPathSuffix: "src"
  //     },
  //   },
  // },
};
