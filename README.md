# Cencora Infrastructure Automation - Change Management Dashboard

A professional, interactive web dashboard for tracking the 10-week infrastructure automation engagement, aligned with Cencora's Digital Change Management Model.

## 🚀 Features

- **Interactive Visualizations**: Charts and graphs using Chart.js
- **Real-time Filtering**: Search and filter across all data
- **CSV-Based Updates**: Simple data management via CSV files
- **PDF Export**: One-click export of dashboard to PDF
- **Mobile Responsive**: Works on desktop, tablet, and mobile
- **Executive & Modern Design**: Professional styling with smooth animations

## 📊 Dashboard Sections

1. **Executive Overview** - KPIs, trends, and Level 1 strategic metrics
2. **DORA Metrics** - DevOps performance indicators
3. **Automation Maturity** - Team progression through maturity levels (0-5)
4. **Change Management** - Three-phase transformation tracking
5. **AUP Metrics** - Adoption, Utilization, Proficiency tracking
6. **Automation Backlog** - Prioritized opportunities with filtering
7. **Weekly Progress** - 10-week timeline and achievements

## 🛠️ Quick Start - Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the **+** button (top right) → **New repository**
3. Name it: `cencora-dashboard` (or your preferred name)
4. Set to **Public** (for free GitHub Pages hosting)
5. Click **Create repository**

### Step 2: Upload Dashboard Files

**Option A: Using GitHub Web Interface (Easiest)**

1. In your new repository, click **Add file** → **Upload files**
2. Drag and drop ALL files from the `cencora-dashboard` folder:
   - `index.html`
   - `dashboard.js`
   - `/data/` folder with all CSV files
3. Commit message: "Initial dashboard deployment"
4. Click **Commit changes**

**Option B: Using Git Command Line**

```bash
# Navigate to the cencora-dashboard folder
cd /path/to/cencora-dashboard

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial dashboard deployment"

# Add your GitHub repository as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/cencora-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages** (left sidebar)
2. Under "Source", select **Deploy from a branch**
3. Under "Branch", select **main** and **/root**
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Dashboard

Your dashboard will be live at:
```
https://YOUR-USERNAME.github.io/cencora-dashboard/
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## 📝 How to Update Data Weekly

### Simple Method: Edit CSVs on GitHub

1. Navigate to your repository on GitHub
2. Go to `data/` folder
3. Click on the CSV file you want to update (e.g., `dora_metrics.csv`)
4. Click the **pencil icon** (Edit this file)
5. Make your changes
6. Scroll down and click **Commit changes**
7. Your dashboard will automatically update within 1-2 minutes!

### Example: Updating DORA Metrics

Edit `data/dora_metrics.csv`:

```csv
metric,baseline,current,target,notes
Deployment Frequency,2,7,10,Changes per month - up from 5 last week!
Lead Time for Changes,48,28,12,Hours from commit to production
Change Failure Rate,25,15,10,% of changes causing incidents
Mean Time to Recovery,8,4,2,Hours to restore service
```

Just update the `current` column each week!

## 📁 Data File Guide

### `/data/dora_metrics.csv`
DORA performance metrics (Deployment Frequency, Lead Time, etc.)

**Columns:**
- `metric`: Name of the metric
- `baseline`: Week 0 value
- `current`: Most recent value (update weekly)
- `target`: Week 10 goal
- `notes`: Description or units

### `/data/maturity.csv`
Automation maturity by team (0-5 scale)

**Columns:**
- `team`: Team name
- `baseline, week2, week4, week6, week8, week10`: Maturity level at each checkpoint
- `target`: Goal maturity level
- `notes`: Progress notes

### `/data/change_mgmt.csv`
Three-phase change management tracking

**Columns:**
- `component`: Component name (e.g., "Digital Vision")
- `phase`: 1, 2, or 3
- `status`: Not Started, In Progress, or Completed
- `owner`: Person responsible
- `completion`: % complete (0-100)
- `target_date`: YYYY-MM-DD
- `notes`: Any notes

### `/data/aup_metrics.csv`
Adoption, Utilization, and Proficiency metrics

**Columns:**
- `metric`: Metric name
- `category`: Adoption, Utilization, or Proficiency
- `baseline, week2, week4, week6, week8, week10`: Values at each checkpoint
- `target`: Goal value

### `/data/backlog.csv`
Automation opportunity backlog

**Columns:**
- `id`: Unique ID (e.g., AUTO-001)
- `description`: What to automate
- `team`: Responsible team
- `current_level, target_level`: Maturity levels (0-5)
- `effort`: 1-5 (low to high)
- `impact`: 1-5 (low to high)
- `priority`: Quick Win, Strategic, Nice to Have, or Avoid (auto-calculated from effort/impact)
- `status`: Not Started, In Progress, or Completed
- `owner`: Person assigned

### `/data/weekly.csv`
Weekly progress log

**Columns:**
- `week`: Week 1, Week 2, etc.
- `date`: YYYY-MM-DD
- `focus`: Primary focus area
- `backlog_items`: Number of items added
- `engineers_trained`: Number trained this week
- `maturity_improvements`: Avg improvement across teams
- `achievements`: Key accomplishments
- `blockers`: Issues or risks

### `/data/level1_metrics.csv`
Strategic business-aligned metrics

**Columns:**
- `metric`: Metric name
- `baseline`: Week 0 value
- `current`: Latest value (update weekly)
- `target`: Week 10 goal
- `notes`: Description or units

## 🎨 Customization

### Change Colors

Edit the CSS variables in `index.html` (lines 15-25):

```css
:root {
    --primary-color: #1F4E78;      /* Main header color */
    --secondary-color: #4472C4;    /* Secondary elements */
    --accent-color: #00A3E0;       /* Highlights and buttons */
    --success-color: #70AD47;      /* Positive indicators */
    --warning-color: #FFC000;      /* Warnings */
    --danger-color: #C00000;       /* Errors/problems */
}
```

### Add Your Logo

Add this inside the `<div class="header-content">` section in `index.html`:

```html
<img src="your-logo.png" alt="Logo" style="height: 60px; margin-bottom: 15px;">
```

Upload your logo file to the repository root.

## 🔒 Making Dashboard Private

If you need to restrict access:

1. Go to repository **Settings** → **General**
2. Scroll to "Danger Zone"
3. Click **Change visibility** → **Make private**
4. Note: GitHub Pages on private repos requires GitHub Pro ($4/month)

**Alternative for Free Private Access:**
- Use [Netlify](https://www.netlify.com) (free, supports password protection)
- Deploy the same files and set up password protection in Netlify settings

## 🐛 Troubleshooting

### Dashboard shows "Loading data..." forever

**Solution**: Check that CSV files are in the correct location:
- They must be in a `/data/` folder
- File names must match exactly (case-sensitive)
- Files must be valid CSV format

### Charts not displaying

**Solution**: 
- Check browser console for errors (F12 → Console)
- Ensure CSV files have numeric values where expected
- Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### GitHub Pages shows 404

**Solution**:
- Wait 2-3 minutes after enabling Pages
- Check that Pages is set to deploy from **main** branch and **/root** folder
- Verify `index.html` is in the repository root (not in a subfolder)

### PDF export not working

**Solution**:
- This feature requires internet connection (loads libraries from CDN)
- Try in a different browser
- Check that libraries are loading (open Console and look for errors)

## 📊 Sample Data

The dashboard comes pre-populated with sample data showing realistic progression through a 10-week engagement. 

**Before Week 1**: Replace sample data with your actual baseline data from the survey.

**Weekly Updates**: Just update the `current` values in each CSV file.

## 🚦 Weekly Update Checklist

Every Friday (or your chosen day):

- [ ] Update `current` column in `dora_metrics.csv`
- [ ] Update `current` column in `level1_metrics.csv`
- [ ] Add current week data to `maturity.csv` (e.g., `week2` column)
- [ ] Add current week data to `aup_metrics.csv`
- [ ] Update `completion` % in `change_mgmt.csv`
- [ ] Update `status` for backlog items in `backlog.csv`
- [ ] Complete current week row in `weekly.csv`
- [ ] Commit changes with message: "Week X update"

## 💡 Tips for Success

1. **Start Simple**: Begin with the core metrics, add more as needed
2. **Be Consistent**: Update on the same day/time each week
3. **Involve the Team**: Share the dashboard URL with stakeholders
4. **Celebrate Wins**: Use the "achievements" column to highlight progress
5. **Track Blockers**: Document issues early so they can be addressed

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org) (for editing this README)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/) (for customizing charts)

## 🤝 Support

For questions or issues:
1. Check the Troubleshooting section above
2. Review your CSV file formatting
3. Check browser console for error messages
4. Create an issue in your repository

## 📄 License

This dashboard is provided as-is for use in the Cencora infrastructure automation engagement.

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Created for**: Cencora Infrastructure Automation Discovery & Design Engagement
