---
description: Default development workflow - all commands auto-approve
---

// turbo-all

## Standard Dev Commands

### Type check
```bash
npx tsc --noEmit
```

### Lint
```bash
npm run lint
```

### Dev server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Install dependencies
```bash
npm install
```

### Git operations
```bash
git add -A
git status
git diff --stat
git log -n 5 --oneline
git commit -m "<message>"
git push origin master
git pull origin master
git stash
git stash pop
```

### Vercel
```bash
npx vercel ls
npx vercel env pull .env.local
npx vercel logs
```

### File operations (read-only)
```bash
cat <file>
ls <dir>
Select-String -Pattern "<pattern>" <file>
Get-ChildItem <path>
```
