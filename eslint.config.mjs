import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// eslint-config-next v16 exports flat configs as arrays of config objects,
// so they need to be spread into our top-level flat config array.
export default [
  // Project-wide ignores.
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'documentation/**',
      'public/**',
      'scripts/**',
      'archive/**',
      'presentation/**',
      'next-env.d.ts',
      // Generated/legacy layouts kept for migration reference.
      'src/frontend/**',
      '**/*.d.ts',
      // Root-level configs (postcss, tailwind, server scripts) are tooling,
      // not source — skip them.
      '*.config.{js,mjs,cjs}',
      'scripts/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Relax the strictest typescript rules to warnings so lint remains
      // a quality signal without blocking CI on the existing codebase.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'prefer-const': 'warn',
      'react/no-unescaped-entities': 'off',
      // React 19 / Next 16 ship stricter hook rules. Demote to warnings so
      // the existing codebase can lint clean while still surfacing the
      // issues for incremental cleanup.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/set-state-in-render': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/error-boundaries': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/component-hook-factories': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/unsupported-syntax': 'warn',
      'react-hooks/incompatible-library': 'warn',
      'react-hooks/use-memo': 'warn',
      'react-hooks/config': 'warn',
      'react-hooks/gating': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/globals': 'warn',
    },
  },
];