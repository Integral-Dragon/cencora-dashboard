// Dashboard Data Management and Visualization
let dashboardData = {
    doraMetrics: [],
    maturityData: [],
    changeMgmt: [],
    aupMetrics: [],
    backlog: [],
    weekly: [],
    level1Metrics: []
};

let charts = {};

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    updateLastUpdated();
});

// Tab Navigation
function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked nav tab
    event.target.classList.add('active');
}

// Load all data from CSV files
async function loadAllData() {
    try {
        await Promise.all([
            loadDORAMetrics(),
            loadMaturityData(),
            loadChangeMgmt(),
            loadAUPMetrics(),
            loadBacklog(),
            loadWeeklyProgress(),
            loadLevel1Metrics()
        ]);
        
        renderDashboard();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load dashboard data. Please check your CSV files.');
    }
}

// Load DORA Metrics
async function loadDORAMetrics() {
    const response = await fetch('data/dora_metrics.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true });
    dashboardData.doraMetrics = parsed.data;
}

// Load Maturity Data
async function loadMaturityData() {
    const response = await fetch('data/maturity.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true });
    dashboardData.maturityData = parsed.data;
}

// Load Change Management Data
async function loadChangeMgmt() {
    const response = await fetch('data/change_mgmt.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true });
    dashboardData.changeMgmt = parsed.data;
}

// Load AUP Metrics
async function loadAUPMetrics() {
    const response = await fetch('data/aup_metrics.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true });
    dashboardData.aupMetrics = parsed.data;
}

// Load Backlog
async function loadBacklog() {
    const response = await fetch('data/backlog.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true });
    dashboardData.backlog = parsed.data;
}

// Load Weekly Progress
async function loadWeeklyProgress() {
    const response = await fetch('data/weekly.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true });
    dashboardData.weekly = parsed.data;
}

// Load Level 1 Metrics
async function loadLevel1Metrics() {
    const response = await fetch('data/level1_metrics.csv');
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true });
    dashboardData.level1Metrics = parsed.data;
}

// Render entire dashboard
function renderDashboard() {
    renderKPIGrid();
    renderLevel1MetricsTable();
    renderDORAGrid();
    renderMaturityTable();
    renderChangeMgmtTable();
    renderAUPTable();
    renderBacklogTable();
    renderWeeklyTable();
    
    // Render all charts
    renderOverviewChart();
    renderDORAChart();
    renderDevExperienceChart();
    renderMaturityChart();
    renderAdoptionChart();
    renderUtilizationChart();
    renderProficiencyChart();
    renderWeeklyChart();
    
    // Update phase progress
    updatePhaseProgress();
    
    // Update backlog stats
    updateBacklogStats();
}

// Render KPI Grid (Executive Overview)
function renderKPIGrid() {
    const grid = document.getElementById('kpiGrid');
    const doraData = dashboardData.doraMetrics;
    
    let html = '';
    
    // Sample KPIs - customize based on your data
    const kpis = [
        {
            label: 'Deployment Frequency',
            value: doraData[0]?.current || '0',
            change: calculateChange(doraData[0]?.baseline, doraData[0]?.current),
            positive: true
        },
        {
            label: 'Change Failure Rate',
            value: doraData[2]?.current || '0%',
            change: calculateChange(doraData[2]?.baseline, doraData[2]?.current),
            positive: false
        },
        {
            label: 'Automation Maturity Avg',
            value: calculateAvgMaturity(),
            change: '+0.8',
            positive: true
        },
        {
            label: 'Team Engagement',
            value: '87%',
            change: '+12%',
            positive: true
        }
    ];
    
    kpis.forEach(kpi => {
        const changeClass = kpi.positive ? 'positive' : 'negative';
        const arrow = kpi.positive ? '↑' : '↓';
        
        html += `
            <div class="metric-card">
                <div class="metric-label">${kpi.label}</div>
                <div class="metric-value">${kpi.value}</div>
                <div class="metric-change ${changeClass}">
                    ${arrow} ${kpi.change}
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Render Level 1 Strategic Metrics Table
function renderLevel1MetricsTable() {
    const tbody = document.querySelector('#level1MetricsTable tbody');
    const data = dashboardData.level1Metrics;
    
    let html = '';
    
    data.forEach(row => {
        if (row.metric) {
            const change = calculateChange(row.baseline, row.current);
            const status = determineStatus(change);
            
            html += `
                <tr>
                    <td><strong>${row.metric}</strong></td>
                    <td>${row.baseline || '-'}</td>
                    <td>${row.current || '-'}</td>
                    <td>${row.target || '-'}</td>
                    <td>${change}</td>
                    <td><span class="status-badge status-${status}">${status}</span></td>
                </tr>
            `;
        }
    });
    
    tbody.innerHTML = html || '<tr><td colspan="6">No data available</td></tr>';
}

// Render DORA Grid
function renderDORAGrid() {
    const grid = document.getElementById('doraGrid');
    const data = dashboardData.doraMetrics;
    
    let html = '';
    
    data.forEach(row => {
        if (row.metric) {
            const change = calculateChange(row.baseline, row.current);
            const isPositive = parseFloat(change) > 0;
            
            html += `
                <div class="metric-card">
                    <div class="metric-label">${row.metric}</div>
                    <div class="metric-value">${row.current || '-'}</div>
                    <div class="metric-change ${isPositive ? 'positive' : 'negative'}">
                        ${isPositive ? '↑' : '↓'} ${change}
                    </div>
                </div>
            `;
        }
    });
    
    grid.innerHTML = html || '<div class="loading">No DORA metrics available</div>';
}

// Render Maturity Table
function renderMaturityTable() {
    const tbody = document.querySelector('#maturityTable tbody');
    const data = dashboardData.maturityData;
    
    let html = '';
    
    data.forEach(row => {
        if (row.team) {
            const progress = calculateProgress(row.baseline, row.week10);
            
            html += `
                <tr>
                    <td><strong>${row.team}</strong></td>
                    <td>${row.baseline || '-'}</td>
                    <td>${row.week2 || '-'}</td>
                    <td>${row.week4 || '-'}</td>
                    <td>${row.week6 || '-'}</td>
                    <td>${row.week8 || '-'}</td>
                    <td>${row.week10 || '-'}</td>
                    <td>${row.target || '-'}</td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        ${progress}%
                    </td>
                </tr>
            `;
        }
    });
    
    tbody.innerHTML = html || '<tr><td colspan="9">No data available</td></tr>';
}

// Render Change Management Table
function renderChangeMgmtTable() {
    const tbody = document.querySelector('#changeMgmtTable tbody');
    const data = dashboardData.changeMgmt;
    
    let html = '';
    
    data.forEach(row => {
        if (row.component) {
            html += `
                <tr>
                    <td><strong>${row.component}</strong></td>
                    <td>${row.phase || '-'}</td>
                    <td><span class="status-badge status-${getStatusClass(row.status)}">${row.status || 'Not Started'}</span></td>
                    <td>${row.owner || '-'}</td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${row.completion || 0}%"></div>
                        </div>
                        ${row.completion || 0}%
                    </td>
                    <td>${row.target_date || '-'}</td>
                </tr>
            `;
        }
    });
    
    tbody.innerHTML = html || '<tr><td colspan="6">No data available</td></tr>';
}

// Render AUP Table
function renderAUPTable() {
    const tbody = document.querySelector('#aupTable tbody');
    const data = dashboardData.aupMetrics;
    
    let html = '';
    
    data.forEach(row => {
        if (row.metric) {
            html += `
                <tr>
                    <td><strong>${row.metric}</strong></td>
                    <td>${row.category || '-'}</td>
                    <td>${row.baseline || '-'}</td>
                    <td>${row.week2 || '-'}</td>
                    <td>${row.week4 || '-'}</td>
                    <td>${row.week6 || '-'}</td>
                    <td>${row.week8 || '-'}</td>
                    <td>${row.week10 || '-'}</td>
                    <td>${row.target || '-'}</td>
                </tr>
            `;
        }
    });
    
    tbody.innerHTML = html || '<tr><td colspan="9">No data available</td></tr>';
}

// Render Backlog Table
function renderBacklogTable() {
    const tbody = document.querySelector('#backlogTable tbody');
    const data = dashboardData.backlog;
    
    let html = '';
    
    data.forEach(row => {
        if (row.id) {
            html += `
                <tr>
                    <td><strong>${row.id}</strong></td>
                    <td>${row.description || '-'}</td>
                    <td>${row.team || '-'}</td>
                    <td>${row.effort || '-'}</td>
                    <td>${row.impact || '-'}</td>
                    <td><span class="status-badge ${getPriorityClass(row.priority)}">${row.priority || '-'}</span></td>
                    <td><span class="status-badge status-${getStatusClass(row.status)}">${row.status || 'Not Started'}</span></td>
                    <td>${row.owner || '-'}</td>
                </tr>
            `;
        }
    });
    
    tbody.innerHTML = html || '<tr><td colspan="8">No data available</td></tr>';
}

// Render Weekly Table
function renderWeeklyTable() {
    const tbody = document.querySelector('#weeklyTable tbody');
    const data = dashboardData.weekly;
    
    let html = '';
    
    data.forEach(row => {
        if (row.week) {
            html += `
                <tr>
                    <td><strong>${row.week}</strong></td>
                    <td>${row.date || '-'}</td>
                    <td>${row.focus || '-'}</td>
                    <td>${row.backlog_items || '-'}</td>
                    <td>${row.engineers_trained || '-'}</td>
                    <td>${row.achievements || '-'}</td>
                    <td>${row.blockers || '-'}</td>
                </tr>
            `;
        }
    });
    
    tbody.innerHTML = html || '<tr><td colspan="7">No data available</td></tr>';
}

// Chart Rendering Functions
function renderOverviewChart() {
    const ctx = document.getElementById('overviewChart');
    if (!ctx) return;
    
    if (charts.overview) {
        charts.overview.destroy();
    }
    
    charts.overview = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 0', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10'],
            datasets: [
                {
                    label: 'Automation Maturity',
                    data: [1.2, 1.5, 2.1, 2.8, 3.2, 3.8],
                    borderColor: '#1F4E78',
                    backgroundColor: 'rgba(31, 78, 120, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Team Engagement',
                    data: [65, 70, 78, 82, 85, 87],
                    borderColor: '#00A3E0',
                    backgroundColor: 'rgba(0, 163, 224, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderDORAChart() {
    const ctx = document.getElementById('doraChart');
    if (!ctx) return;
    
    if (charts.dora) {
        charts.dora.destroy();
    }
    
    const data = dashboardData.doraMetrics;
    const metrics = data.map(d => d.metric).filter(Boolean);
    const baseline = data.map(d => parseFloat(d.baseline) || 0);
    const current = data.map(d => parseFloat(d.current) || 0);
    const target = data.map(d => parseFloat(d.target) || 0);
    
    charts.dora = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: metrics,
            datasets: [
                {
                    label: 'Baseline',
                    data: baseline,
                    backgroundColor: 'rgba(255, 193, 7, 0.6)',
                },
                {
                    label: 'Current',
                    data: current,
                    backgroundColor: 'rgba(0, 163, 224, 0.6)',
                },
                {
                    label: 'Target',
                    data: target,
                    backgroundColor: 'rgba(112, 173, 71, 0.6)',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderDevExperienceChart() {
    const ctx = document.getElementById('devExperienceChart');
    if (!ctx) return;
    
    if (charts.devExperience) {
        charts.devExperience.destroy();
    }
    
    charts.devExperience = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Bad Dev Days', 'Manual Toil', 'Waiting Time', 'Rework Rate', 'Tool Satisfaction'],
            datasets: [{
                label: 'Current State',
                data: [3.2, 2.8, 3.5, 2.1, 3.8],
                borderColor: '#00A3E0',
                backgroundColor: 'rgba(0, 163, 224, 0.2)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

function renderMaturityChart() {
    const ctx = document.getElementById('maturityChart');
    if (!ctx) return;
    
    if (charts.maturity) {
        charts.maturity.destroy();
    }
    
    const data = dashboardData.maturityData;
    const teams = data.map(d => d.team).filter(Boolean);
    const baseline = data.map(d => parseFloat(d.baseline) || 0);
    const week10 = data.map(d => parseFloat(d.week10) || 0);
    const target = data.map(d => parseFloat(d.target) || 0);
    
    charts.maturity = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: teams,
            datasets: [
                {
                    label: 'Baseline',
                    data: baseline,
                    backgroundColor: 'rgba(255, 193, 7, 0.6)',
                },
                {
                    label: 'Week 10',
                    data: week10,
                    backgroundColor: 'rgba(0, 163, 224, 0.6)',
                },
                {
                    label: 'Target',
                    data: target,
                    backgroundColor: 'rgba(112, 173, 71, 0.6)',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderAdoptionChart() {
    const ctx = document.getElementById('adoptionChart');
    if (!ctx) return;
    
    if (charts.adoption) {
        charts.adoption.destroy();
    }
    
    const adoptionMetrics = dashboardData.aupMetrics.filter(m => m.category === 'Adoption');
    
    charts.adoption = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Baseline', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10'],
            datasets: adoptionMetrics.map((metric, index) => ({
                label: metric.metric,
                data: [
                    parseFloat(metric.baseline) || 0,
                    parseFloat(metric.week2) || 0,
                    parseFloat(metric.week4) || 0,
                    parseFloat(metric.week6) || 0,
                    parseFloat(metric.week8) || 0,
                    parseFloat(metric.week10) || 0
                ],
                borderColor: getColor(index),
                backgroundColor: getColor(index, 0.1),
                tension: 0.4
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderUtilizationChart() {
    const ctx = document.getElementById('utilizationChart');
    if (!ctx) return;
    
    if (charts.utilization) {
        charts.utilization.destroy();
    }
    
    const utilizationMetrics = dashboardData.aupMetrics.filter(m => m.category === 'Utilization');
    
    charts.utilization = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Baseline', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10'],
            datasets: utilizationMetrics.map((metric, index) => ({
                label: metric.metric,
                data: [
                    parseFloat(metric.baseline) || 0,
                    parseFloat(metric.week2) || 0,
                    parseFloat(metric.week4) || 0,
                    parseFloat(metric.week6) || 0,
                    parseFloat(metric.week8) || 0,
                    parseFloat(metric.week10) || 0
                ],
                borderColor: getColor(index),
                backgroundColor: getColor(index, 0.1),
                tension: 0.4
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderProficiencyChart() {
    const ctx = document.getElementById('proficiencyChart');
    if (!ctx) return;
    
    if (charts.proficiency) {
        charts.proficiency.destroy();
    }
    
    const proficiencyMetrics = dashboardData.aupMetrics.filter(m => m.category === 'Proficiency');
    
    charts.proficiency = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Baseline', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10'],
            datasets: proficiencyMetrics.map((metric, index) => ({
                label: metric.metric,
                data: [
                    parseFloat(metric.baseline) || 0,
                    parseFloat(metric.week2) || 0,
                    parseFloat(metric.week4) || 0,
                    parseFloat(metric.week6) || 0,
                    parseFloat(metric.week8) || 0,
                    parseFloat(metric.week10) || 0
                ],
                borderColor: getColor(index),
                backgroundColor: getColor(index, 0.1),
                tension: 0.4
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;
    
    if (charts.weekly) {
        charts.weekly.destroy();
    }
    
    const data = dashboardData.weekly;
    const weeks = data.map(d => d.week).filter(Boolean);
    const backlogItems = data.map(d => parseInt(d.backlog_items) || 0);
    const engineersTrained = data.map(d => parseInt(d.engineers_trained) || 0);
    
    charts.weekly = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeks,
            datasets: [
                {
                    label: 'Backlog Items Added',
                    data: backlogItems,
                    backgroundColor: 'rgba(31, 78, 120, 0.6)',
                },
                {
                    label: 'Engineers Trained',
                    data: engineersTrained,
                    backgroundColor: 'rgba(0, 163, 224, 0.6)',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Update phase progress bars
function updatePhaseProgress() {
    const changeMgmtData = dashboardData.changeMgmt;
    
    const phase1Components = changeMgmtData.filter(c => c.phase === '1');
    const phase2Components = changeMgmtData.filter(c => c.phase === '2');
    const phase3Components = changeMgmtData.filter(c => c.phase === '3');
    
    const phase1Progress = calculatePhaseProgress(phase1Components);
    const phase2Progress = calculatePhaseProgress(phase2Components);
    const phase3Progress = calculatePhaseProgress(phase3Components);
    
    document.getElementById('phase1Progress').style.width = `${phase1Progress}%`;
    document.getElementById('phase2Progress').style.width = `${phase2Progress}%`;
    document.getElementById('phase3Progress').style.width = `${phase3Progress}%`;
}

// Update backlog statistics
function updateBacklogStats() {
    const backlog = dashboardData.backlog.filter(item => item.id);
    
    const total = backlog.length;
    const quickWins = backlog.filter(item => item.priority === 'Quick Win').length;
    const inProgress = backlog.filter(item => item.status === 'In Progress').length;
    const completed = backlog.filter(item => item.status === 'Completed').length;
    
    document.getElementById('totalBacklogItems').textContent = total;
    document.getElementById('quickWins').textContent = quickWins;
    document.getElementById('inProgress').textContent = inProgress;
    document.getElementById('completed').textContent = completed;
}

// Filter backlog table
function filterBacklog() {
    const searchTerm = document.getElementById('backlogSearch').value.toLowerCase();
    const priorityFilter = document.getElementById('priorityFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const rows = document.querySelectorAll('#backlogTable tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const priority = row.cells[5]?.textContent || '';
        const status = row.cells[6]?.textContent || '';
        
        const matchesSearch = text.includes(searchTerm);
        const matchesPriority = !priorityFilter || priority.includes(priorityFilter);
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        
        row.style.display = (matchesSearch && matchesPriority && matchesStatus) ? '' : 'none';
    });
}

// Global search
function performSearch() {
    const searchTerm = document.getElementById('globalSearch').value.toLowerCase();
    
    if (!searchTerm) {
        // Reset all tables
        document.querySelectorAll('tbody tr').forEach(row => {
            row.style.display = '';
        });
        return;
    }
    
    // Search through all tables
    document.querySelectorAll('tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Export to PDF
function exportToPDF() {
    const element = document.querySelector('.container');
    const opt = {
        margin: 10,
        filename: `Cencora-Dashboard-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    html2pdf().set(opt).from(element).save();
}

// Refresh data
async function refreshData() {
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = '🔄 Refreshing...';
    
    await loadAllData();
    
    btn.disabled = false;
    btn.textContent = '🔄 Refresh Data';
    
    updateLastUpdated();
}

// Update last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdated').textContent = formatted;
}

// Utility Functions
function calculateChange(baseline, current) {
    if (!baseline || !current) return '-';
    const base = parseFloat(baseline);
    const curr = parseFloat(current);
    const change = curr - base;
    return change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1);
}

function calculateProgress(baseline, current) {
    if (!baseline || !current) return 0;
    const base = parseFloat(baseline);
    const curr = parseFloat(current);
    const progress = ((curr - base) / (5 - base)) * 100;
    return Math.min(Math.max(progress, 0), 100).toFixed(0);
}

function calculateAvgMaturity() {
    const data = dashboardData.maturityData;
    if (data.length === 0) return '0.0';
    
    const sum = data.reduce((acc, row) => {
        return acc + (parseFloat(row.week10) || 0);
    }, 0);
    
    return (sum / data.length).toFixed(1);
}

function calculatePhaseProgress(components) {
    if (components.length === 0) return 0;
    
    const totalCompletion = components.reduce((acc, comp) => {
        return acc + (parseFloat(comp.completion) || 0);
    }, 0);
    
    return (totalCompletion / components.length).toFixed(0);
}

function determineStatus(change) {
    if (!change || change === '-') return 'in-progress';
    const value = parseFloat(change);
    if (value > 0) return 'completed';
    if (value < 0) return 'not-started';
    return 'in-progress';
}

function getStatusClass(status) {
    if (!status) return 'not-started';
    const lower = status.toLowerCase();
    if (lower.includes('complete')) return 'completed';
    if (lower.includes('progress')) return 'in-progress';
    return 'not-started';
}

function getPriorityClass(priority) {
    if (!priority) return '';
    const lower = priority.toLowerCase();
    if (lower.includes('quick')) return 'status-completed';
    if (lower.includes('strategic')) return 'status-in-progress';
    return 'status-not-started';
}

function getColor(index, alpha = 1) {
    const colors = [
        `rgba(31, 78, 120, ${alpha})`,
        `rgba(0, 163, 224, ${alpha})`,
        `rgba(112, 173, 71, ${alpha})`,
        `rgba(255, 193, 7, ${alpha})`,
        `rgba(192, 0, 0, ${alpha})`
    ];
    return colors[index % colors.length];
}

function showError(message) {
    alert(message);
}
