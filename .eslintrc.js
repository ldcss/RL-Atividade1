module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // Desativa regras conflitantes com o Prettier
  ],
  rules: {
    // Regras personalizadas
    'react/react-in-jsx-scope': 'off', // Não é necessário no React 17+
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
  },
};
