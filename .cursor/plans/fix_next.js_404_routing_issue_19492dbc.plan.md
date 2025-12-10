---
name: Fix Next.js 404 Routing Issue
overview: Next.js está detectando o workspace root incorretamente devido a múltiplos lockfiles, causando 404 porque não encontra as rotas em `src/app/`. Vamos corrigir configurando explicitamente o root e verificando a estrutura de diretórios.
todos:
  - id: fix-workspace-root
    content: Update next.config.mjs to explicitly set turbopack.root to current directory
    status: completed
  - id: clean-build-cache
    content: Remove .next directory to force fresh build with correct root detection
    status: completed
    dependencies:
      - fix-workspace-root
  - id: test-dev-server
    content: Start dev server and verify routes are accessible (/, /estoque)
    status: completed
    dependencies:
      - clean-build-cache
  - id: verify-build-output
    content: Run npm run build and verify routes are generated correctly
    status: completed
    dependencies:
      - test-dev-server
---

# Fix Next.js 404 Routing Issue

## Problem Analysis

The root cause of the 404 errors is:

1. **Workspace Root Detection Issue**: Next.js is detecting `D:\codex\package-lock.json` as the workspace root instead of `D:\codex\master_code\senai\tcc`, causing it to look for the `app` directory in the wrong location.

2. **Routes Not Generated**: The `app-paths-manifest.json` only shows `/_not-found/page`, meaning Next.js isn't finding:

   - `src/app/page.tsx` (home page)
   - `src/app/estoque/page.tsx` (stock management page)
   - `src/app/layout.tsx` (root layout)

3. **Build Output**: The build only generates a 404 page, confirming routes aren't being detected.

## Solution

### Step 1: Fix Workspace Root in next.config.mjs

Update `next.config.mjs` to explicitly set the workspace root:

```javascript
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname, // Explicitly set project root
  },
};

export default nextConfig;
```

### Step 2: Verify App Directory Structure

Ensure Next.js can find the app directory. Next.js automatically looks for:

- `app/` at root, OR
- `src/app/` at root

Since we have `src/app/`, we need to verify the structure is correct:

- `src/app/layout.tsx` ✓ (exists)
- `src/app/page.tsx` ✓ (exists)
- `src/app/estoque/page.tsx` ✓ (exists)

### Step 3: Clean Build Cache

Remove `.next` directory to force a fresh build with correct root detection:

```powershell
Remove-Item -Recurse -Force .next
```

### Step 4: Verify TypeScript Path Aliases

The `tsconfig.json` path aliases are configured correctly, but we should verify they work with the fixed root.

### Step 5: Test Development Server

Start the dev server and verify:

- `http://localhost:3000/` should redirect to `/estoque`
- `http://localhost:3000/estoque` should load the stock management page
- No more 404 errors

### Step 6: Verify Build Output

Run `npm run build` and verify routes are generated:

- Should show `/` route
- Should show `/estoque` route
- Should NOT only show `/404`

## Files to Modify

1. **[next.config.mjs](next.config.mjs)**: Add explicit `turbopack.root` configuration
2. **Clean `.next` directory**: Remove build cache

## Expected Outcome

After these changes:

- Next.js will correctly detect the project root
- Routes will be generated from `src/app/`
- Home page (`/`) will redirect to `/estoque`
- Stock management page (`/estoque`) will load correctly
- No more 404 errors

## Additional Notes

If the issue persists after setting `turbopack.root`, we may need to:

- Check if there's a conflicting Next.js config in parent directories
- Consider moving `app` directory to project root (standard Next.js structure)
- Verify no conflicting `next.config.js` files exist