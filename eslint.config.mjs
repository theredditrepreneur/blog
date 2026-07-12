import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {files: ['scripts/**/*.ts', 'sanity/schema/**/*.ts'], rules: {'@typescript-eslint/no-explicit-any': 'off'}},
  globalIgnores(['.next/**', 'node_modules/**', 'migration-assets/**', 'reports/generated/**', 'public/pagefind/**']),
])
