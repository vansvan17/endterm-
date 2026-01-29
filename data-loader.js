/* * DATA LOADER
 * Generates fake data and updates the dashboard 
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    refreshDashboard();
});

function refreshDashboard() {
    // 1. Generate Random KPI Data
    const revenue = Math.floor(Math.random() * (850000 - 450000) + 450000);
    const orders = Math.floor(Math.random() * (12000 - 5000) + 5000);
    const aov = Math.floor(revenue / orders);
    const customers = Math.floor(orders * 0.85); // Assuming some repeat buyers

    // Update KPI Text
    updateElement('kpi-revenue', `$${revenue.toLocaleString()}`);
    updateElement('kpi-orders', orders.toLocaleString());
    updateElement('kpi-aov', `$${aov}`);
    updateElement('kpi-customers', customers.toLocaleString());

    // Update Random Percentages
    updateChange('kpi-revenue-change');
    updateChange('kpi-orders-change');
    updateChange('kpi-aov-change');
    updateChange('kpi-customers-change');

    // 2. Render Charts
    
    // Revenue Trend Data (Last 14 days)
    const trendData = generateTrendData(14);
    renderLineChart(trendData, 'revenue-chart');

    // Top Products Data
    const productData = [
        { product: "Gaming Laptop X1", revenue: Math.floor(Math.random() * 50000) + 20000 },
        { product: "Wireless Earbuds", revenue: Math.floor(Math.random() * 40000) + 15000 },
        { product: "Smart Watch V2", revenue: Math.floor(Math.random() * 35000) + 10000 },
        { product: "Mech Keyboard", revenue: Math.floor(Math.random() * 25000) + 5000 },
        { product: "4K Monitor", revenue: Math.floor(Math.random() * 20000) + 5000 },
    ].sort((a, b) => b.revenue - a.revenue);
    
    renderBarChart(productData, 'products-chart');

    // Category Data
    const categoryData = [
        { category: "Electronics", percentage: 45, revenue: 0 }, // Revenue ignored for pie, uses %
        { category: "Clothing", percentage: 25, revenue: 0 },
        { category: "Home", percentage: 20, revenue: 0 },
        { category: "Books", percentage: 10, revenue: 0 },
    ];
    renderPieChart(categoryData, 'category-chart');

    // Regional Data (Reuse Bar Chart logic for simplicity)
    const regionalData = [
        { product: "North America", revenue: Math.floor(revenue * 0.45) }, // using 'product' key to reuse bar chart function
        { product: "Europe", revenue: Math.floor(revenue * 0.30) },
        { product: "Asia Pacific", revenue: Math.floor(revenue * 0.15) },
        { product: "LatAm", revenue: Math.floor(revenue * 0.10) },
    ];
    renderBarChart(regionalData, 'regional-chart'); // Reusing bar chart renderer

    // Customer Metrics
    const customerMetrics = [
        { label: "Retention Rate", value: "68", percentage: 68 },
        { label: "New Users", value: "1,240", percentage: 85 },
        { label: "Cart Abandonment", value: "42%", percentage: 42 },
        { label: "Satisfaction Score", value: "4.8/5", percentage: 96 }
    ];
    renderProgressIndicators(customerMetrics, 'customer-metrics');
}

// Helper: Update Text Content
function updateElement(id, text) {
    const el = document.getElementById(id);
    if(el) el.textContent = text;
}

// Helper: Generate Random +/- Change
function updateChange(id) {
    const el = document.getElementById(id);
    if(!el) return;
    
    const change = (Math.random() * 10 - 3).toFixed(1); // Range between -3% and +7%
    const isPositive = change >= 0;
    
    el.textContent = `${isPositive ? '+' : ''}${change}%`;
    el.className = `kpi-change ${isPositive ? 'positive' : 'negative'}`;
}

// Helper: Generate Date-based Trend Data
function generateTrendData(days) {
    const data = [];
    for(let i = days; i > 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        data.push({
            date: d,
            revenue: Math.floor(Math.random() * (15000 - 5000) + 5000)
        });
    }
    return data;
}