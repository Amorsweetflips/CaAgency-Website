---
description: Quick deploy - commit and push to trigger Vercel deployment
---

// turbo-all

### 1. Stage and status
```bash
git add -A && git status
```

### 2. Commit
```bash
git commit -m "<descriptive message>"
```

### 3. Push
```bash
git push origin master
```

### 4. Verify deployment (waits 90s)
```bash
Start-Sleep 90; npx vercel ls 2>&1 | Select-Object -First 12
```
