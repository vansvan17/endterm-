/**
 * VISUALIZATIONS MODULE (Red Theme Adapted)
 */

// Global colors for charts
const THEME = {
    maroon: '#800000',
    brightRed: '#ff3333',
    darkRed: '#2b0202',
    text: '#d1d1d1',
    grid: '#220505',
    axis: '#4a0404'
};

function renderLineChart(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    
    if (!data || data.length === 0) return;
    
    const width = container.clientWidth;
    const height = 300;
    const padding = { top: 20, right: 30, bottom: 40, left: 60 };
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const revenues = data.map(d => d.revenue);
    const maxRevenue = Math.max(...revenues);
    const minRevenue = Math.min(...revenues);
    const revenueRange = maxRevenue - minRevenue;
    
    const xScale = (index) => padding.left + (index / (data.length - 1)) * chartWidth;
    const yScale = (value) => padding.top + chartHeight - ((value - minRevenue) / revenueRange) * chartHeight;
    
    // RED GRADIENT
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'redGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', `stop-color:${THEME.brightRed};stop-opacity:0.5`);
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', `stop-color:${THEME.darkRed};stop-opacity:0`);
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Grid Lines
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + (chartHeight / 5) * i;
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', padding.left);
        gridLine.setAttribute('y1', y);
        gridLine.setAttribute('x2', width - padding.right);
        gridLine.setAttribute('y2', y);
        gridLine.setAttribute('stroke', THEME.grid);
        gridLine.setAttribute('stroke-width', '1');
        svg.appendChild(gridLine);
        
        const value = maxRevenue - (revenueRange / 5) * i;
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', padding.left - 10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('fill', THEME.text);
        label.setAttribute('font-size', '11');
        label.textContent = `$${Math.round(value/1000)}k`;
        svg.appendChild(label);
    }
    
    // Area Path
    let areaPath = `M ${padding.left} ${height - padding.bottom}`;
    data.forEach((point, i) => {
        areaPath += ` L ${xScale(i)} ${yScale(point.revenue)}`;
    });
    areaPath += ` L ${xScale(data.length - 1)} ${height - padding.bottom} Z`;
    
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    area.setAttribute('d', areaPath);
    area.setAttribute('fill', 'url(#redGradient)');
    svg.appendChild(area);
    
    // Line Path
    let linePath = `M ${xScale(0)} ${yScale(data[0].revenue)}`;
    data.forEach((point, i) => { if (i > 0) linePath += ` L ${xScale(i)} ${yScale(point.revenue)}`; });
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', linePath);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', THEME.brightRed);
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
    
    // Interactive Points
    data.forEach((point, i) => {
        const cx = xScale(i);
        const cy = yScale(point.revenue);
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#000');
        circle.setAttribute('stroke', THEME.brightRed);
        circle.setAttribute('stroke-width', '2');
        circle.style.cursor = 'pointer';
        
        circle.addEventListener('mouseenter', (e) => {
            circle.setAttribute('r', '6');
            circle.setAttribute('fill', '#fff');
            showTooltip(e, `Date: ${point.date.toLocaleDateString()}<br>Revenue: $${point.revenue.toLocaleString()}`);
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', '#000');
            hideTooltip();
        });
        svg.appendChild(circle);
    });
    
    container.appendChild(svg);
}

function renderBarChart(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    
    const chartDiv = document.createElement('div');
    chartDiv.className = 'bar-chart';
    const maxRevenue = Math.max(...data.map(item => item.revenue));
    
    data.forEach(item => {
        const barItem = document.createElement('div');
        barItem.className = 'bar-item';
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = item.product;
        
        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        const percentage = (item.revenue / maxRevenue) * 100;
        bar.style.width = `${percentage}%`;
        bar.textContent = `$${(item.revenue/1000).toFixed(1)}k`;
        
        barWrapper.appendChild(bar);
        barItem.appendChild(label);
        barItem.appendChild(barWrapper);
        chartDiv.appendChild(barItem);
    });
    container.appendChild(chartDiv);
}

function renderPieChart(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    
    const chartDiv = document.createElement('div');
    chartDiv.className = 'pie-chart';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.style.maxHeight = '200px';
    svg.style.display = 'block';
    svg.style.margin = '0 auto';
    
    // RED THEME PALETTE FOR PIE
    const colors = ['#800000', '#a30000', '#cc0000', '#ff3333', '#4a0404'];
    
    let currentAngle = 0;
    const centerX = 100, centerY = 100, radius = 80;
    
    data.forEach((item, index) => {
        const angle = (item.percentage / 100) * 360;
        const startRad = (currentAngle - 90) * (Math.PI / 180);
        const endRad = (currentAngle + angle - 90) * (Math.PI / 180);
        
        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);
        
        const largeArc = angle > 180 ? 1 : 0;
        const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', colors[index % colors.length]);
        path.setAttribute('stroke', '#000');
        path.setAttribute('stroke-width', '2');
        
        path.addEventListener('mouseenter', (e) => showTooltip(e, `${item.category}: ${item.percentage}%`));
        path.addEventListener('mouseleave', hideTooltip);
        
        svg.appendChild(path);
        currentAngle += angle;
    });
    
    chartDiv.appendChild(svg);
    
    // Legend
    const legend = document.createElement('div');
    legend.className = 'pie-legend';
    data.forEach((item, index) => {
        const lItem = document.createElement('div');
        lItem.className = 'legend-item';
        lItem.innerHTML = `<div class="legend-color" style="background:${colors[index % colors.length]}"></div><span>${item.category}</span>`;
        legend.appendChild(lItem);
    });
    
    chartDiv.appendChild(legend);
    container.appendChild(chartDiv);
}

function renderProgressIndicators(metrics, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '<div class="progress-indicators">' + 
        metrics.map(m => `
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">${m.label}</span>
                    <span class="progress-value">${m.value}</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${m.percentage}%"></div>
                </div>
            </div>
        `).join('') + '</div>';
}

function showTooltip(e, html) {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
    }
    tooltip.innerHTML = html;
    tooltip.classList.add('visible');
    tooltip.style.left = (e.clientX + 15) + 'px';
    tooltip.style.top = (e.clientY + 15) + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.classList.remove('visible');
}

// Update KPI DOM
function updateKPICards(metrics) {
    document.getElementById('total-revenue').textContent = metrics.revenue;
    document.getElementById('revenue-change').textContent = metrics.revenueChange;
    document.getElementById('total-orders').textContent = metrics.orders;
    document.getElementById('active-users').textContent = metrics.users;
}