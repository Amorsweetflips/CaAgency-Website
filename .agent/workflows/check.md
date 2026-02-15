---
description: Check and fix code quality
---

// turbo-all

### 1. Type check
```bash
npx tsc --noEmit
```

### 2. Lint with auto-fix
```bash
npm run lint -- --fix
```

### 3. Check bundle size
```bash
npx next build 2>&1 | Select-Object -Last 30
```
