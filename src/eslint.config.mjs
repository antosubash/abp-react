import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import storybook from 'eslint-plugin-storybook'

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'storybook-static/**',
      'src/client/**',
      'public/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...storybook.configs['flat/recommended'],
  {
    // eslint-config-next 16 pulls in eslint-plugin-react-hooks 7, which adds the
    // new React Compiler rule set. These flag many pre-existing patterns in this
    // codebase (setState in effects, TanStack Table / React Hook Form usage, etc.).
    // They are disabled here so the Next 16 upgrade stays focused; the classic
    // rules-of-hooks and exhaustive-deps checks remain active. These can be
    // re-enabled and addressed incrementally when adopting the React Compiler.
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/incompatible-library': 'off',
    },
  },
]

export default eslintConfig
