import { chatCompletion, extractJSON } from '@/ai/server-utils';
```

This import might be causing the issue.

### Step 3: Share the Code

**Can you copy and paste the entire content of this file:**
```
/src/app/api/generate-reflection/route.ts
```

---

## Quick Temporary Fix (To Get Your App Working):

If you just want to get your dua feature working and don't need the reflection feature right now, you can temporarily disable it:

### Option 1: Rename the file

Rename:
```
/src/app/api/generate-reflection/route.ts
```

To:
```
/src/app/api/generate-reflection/route.ts.backup
