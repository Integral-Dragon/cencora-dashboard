# 🚀 5-Minute Deployment Guide

## Option 1: GitHub Pages (Recommended - Totally Free)

### Step 1: Create Repository (2 minutes)
1. Go to https://github.com/new
2. Repository name: `cencora-dashboard`
3. Public ✓
4. Click "Create repository"

### Step 2: Upload Files (2 minutes)
1. Click "uploading an existing file"
2. Drag ALL files from `cencora-dashboard` folder
3. Click "Commit changes"

### Step 3: Enable GitHub Pages (1 minute)
1. Go to Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main` → `/root` → Save
4. Wait 2 minutes

### ✅ Done!
Your dashboard is live at:
```
https://YOUR-USERNAME.github.io/cencora-dashboard/
```

## Weekly Updates (30 seconds)

1. Click on `data/dora_metrics.csv` in GitHub
2. Click pencil icon (Edit)
3. Update the `current` column
4. Commit changes
5. Dashboard auto-updates in 1-2 minutes!

## Need Help?

See full README.md for:
- Detailed instructions
- Troubleshooting
- Customization options
- All CSV file formats

---

## File Structure

```
cencora-dashboard/
├── index.html              (Main dashboard - don't edit)
├── dashboard.js            (JavaScript - don't edit)
├── data/
│   ├── dora_metrics.csv    (Edit weekly)
│   ├── maturity.csv        (Edit bi-weekly)
│   ├── change_mgmt.csv     (Edit as needed)
│   ├── aup_metrics.csv     (Edit bi-weekly)
│   ├── backlog.csv         (Edit as items added)
│   ├── weekly.csv          (Edit weekly)
│   └── level1_metrics.csv  (Edit weekly)
├── README.md               (Full documentation)
└── QUICKSTART.md           (This file)
```

## CSV Update Priority

**Every Week:**
- `dora_metrics.csv` → Update `current` column
- `level1_metrics.csv` → Update `current` column
- `weekly.csv` → Add current week row

**Every Other Week:**
- `maturity.csv` → Update week column (week2, week4, etc.)
- `aup_metrics.csv` → Update week column

**As Needed:**
- `change_mgmt.csv` → Update status/completion %
- `backlog.csv` → Add new items or update status

---

**Pro Tip**: Bookmark your dashboard URL and the GitHub data folder for quick weekly updates!
