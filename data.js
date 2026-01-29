// Mock Data Generation
const kpiData = [
    {
        title: "Total Requests",
        value: "84.2M",
        change: "▲ 12.5%",
        isPositive: true,
        icon: "⚡"
    },
    {
        title: "Threats Blocked",
        value: "1,204",
        change: "▲ 4.2%",
        isPositive: true,
        icon: "🛡"
    },
    {
        title: "Avg Latency",
        value: "42ms",
        change: "▲ 8ms",
        isPositive: false,
        icon: "📉"
    },
    {
        title: "Server Load",
        value: "92%",
        change: "▲ Critical",
        isPositive: false,
        icon: "🔥"
    }
];

const attackVectorData = [
    { label: "DDoS (UDP)", percentage: 85 },
    { label: "SQL Injection", percentage: 62 },
    { label: "XSS Scripting", percentage: 45 },
    { label: "Brute Force", percentage: 30 },
    { label: "Phishing", percentage: 15 }
];

const nodeStatusData = [
    { label: "Database Cluster A", value: "98% Load", percentage: 98 },
    { label: "Firewall Capacity", value: "75% Used", percentage: 75 },
    { label: "Backup Integrity", value: "100% Verified", percentage: 100 },
    { label: "Encryption Keys", value: "45% Rotating", percentage: 45 }
];

// Render Functions

function renderKPIs() {
    const container = document.getElementById('kpi-container');
    let html = '';

    kpiData.forEach(kpi => {
        const changeClass = kpi.isPositive ? 'positive' : 'negative';
        html += `
            <div class="kpi-card">
                <div class="kpi-icon">${kpi.icon}</div>
                <div class="kpi-content">
                    <h3>${kpi.title}</h3>
                    <div class="kpi-value">${kpi.value}</div>
                    <span class="kpi-change ${changeClass}">${kpi.change}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderBarChart() {
    const container = document.getElementById('bar-chart-container');
    let html = '<div class="bar-chart">';

    attackVectorData.forEach(item => {
        html += `
            <div class="bar-item">
                <span class="bar-label">${item.label}</span>
                <div class="bar-wrapper">
                    <div class="bar" style="width: ${item.percentage}%;">${item.percentage}%</div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function renderProgressBars() {
    const container = document.getElementById('progress-container');
    let html = '<div class="progress-indicators">';

    nodeStatusData.forEach(item => {
        html += `
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">${item.label}</span>
                    <span class="progress-value">${item.value}</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${item.percentage}%;"></div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderKPIs();
    renderBarChart();
    renderProgressBars();
    console.log("Crimson Ops Dashboard: Data loaded successfully.");
});