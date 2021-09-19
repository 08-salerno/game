module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
        'react/destructuring-assignment': 'warn',
        'react/no-array-index-key': 'off',
        'react/jsx-indent': 'off',
        'react/prop-types': 'off',
        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/control-has-associated-label': 'warn',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'import/prefer-default-export': 'warn',
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'warn',
        'import/no-cycle': 'off',
        'no-param-reassign': [
          2,
          {
            props: false,
          },
        ],
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false, classes: true, variables: true, typedefs: true,
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'dot-notation': 'warn',
    'consistent-return': 'off',
    'no-unused-vars': 'warn',
    'spaced-comment': 'off',
    'no-alert': 'warn',
    'no-restricted-globals': 'warn',
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'linebreak-style': 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
