/**
 * CONTROLLER MODULE
 * Coordinates between data and visualization layers
 * Handles event listeners and orchestrates updates
 */

import {
    initializeData,
    updateFilters,
    calculateMetrics,
    calculateRevenueTrend,
    getTopProducts,
    getCategoryDistribution,
    getRegionalSales,
    getCustomerMetrics
} from './data.js';

import {
    renderLineChart,
    renderBarChart,
    renderPieChart,
    renderProgressIndicators,
    updateKPICards
} from './visualizations.js';

/**
 * Initialize the dashboard
 * Sets up data and renders all visualizations
 */
function initDashboard() {
    // Load initial data
    initializeData();
    
    // Render all visualizations with initial data
    updateAllVisualizations();
    
    // Attach event listeners
    attachEventListeners();
    
    console.log('Dashboard initialized successfully');
}

/**
 * Update all visualizations
 * Fetches fresh data and re-renders all charts
 */
function updateAllVisualizations() {
    // Show loading state (optional enhancement)
    const containers = document.querySelectorAll('.chart-container');
    containers.forEach(container => {
        container.classList.add('loading');
    });
    
    // Use setTimeout to allow UI to update before heavy rendering
    setTimeout(() => {
        // Calculate all metrics
        const metrics = calculateMetrics();
        const revenueTrend = calculateRevenueTrend();
        const topProducts = getTopProducts();
        const categoryDist = getCategoryDistribution();
        const regionalSales = getRegionalSales();
        const customerMetrics = getCustomerMetrics();
        
        // Update KPI cards
        updateKPICards(metrics);
        
        // Render all visualizations
        renderLineChart(revenueTrend, 'revenue-trend-chart');
        renderBarChart(topProducts, 'top-products-chart');
        renderPieChart(categoryDist, 'category-pie-chart');
        renderBarChart(regionalSales, 'regional-sales-chart');
        renderProgressIndicators(customerMetrics, 'customer-metrics');
        
        // Remove loading state
        containers.forEach(container => {
            container.classList.remove('loading');
        });
    }, 50);
}

/**
 * Handle filter changes
 * Updates filters and refreshes visualizations
 */
function handleFilterChange() {
    const dateRange = document.getElementById('date-filter').value;
    const category = document.getElementById('category-filter').value;
    
    // Convert date range to number or 'all'
    const dateRangeValue = dateRange === 'all' ? 'all' : parseInt(dateRange);
    
    // Update filters in data module
    updateFilters({
        dateRange: dateRangeValue,
        category: category
    });
    
    // Refresh all visualizations
    updateAllVisualizations();
    
    console.log(`Filters applied - Date: ${dateRange}, Category: ${category}`);
}

/**
 * Handle data refresh
 * Simulates fetching new data and updating dashboard
 */
function handleRefresh() {
    const refreshBtn = document.getElementById('refresh-btn');
    
    // Add loading animation to button
    const originalContent = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<span class="icon" style="animation: spin 1s linear infinite;">↻</span> Refreshing...';
    refreshBtn.disabled = true;
    
    // Simulate data refresh delay
    setTimeout(() => {
        // Re-initialize data (in real app, this would fetch from API)
        initializeData();
        
        // Update all visualizations
        updateAllVisualizations();
        
        // Reset button
        refreshBtn.innerHTML = originalContent;
        refreshBtn.disabled = false;
        
        console.log('Data refreshed');
    }, 1000);
}

/**
 * Attach event listeners to interactive elements
 */
function attachEventListeners() {
    // Filter apply button
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', handleFilterChange);
    }
    
    // Also apply filters on dropdown change for better UX
    const dateFilter = document.getElementById('date-filter');
    if (dateFilter) {
        dateFilter.addEventListener('change', handleFilterChange);
    }
    
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilterChange);
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', handleRefresh);
    }
    
    // Handle window resize for responsive charts
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateAllVisualizations();
        }, 250);
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        // Press R to refresh
        if (e.key === 'r' || e.key === 'R') {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
                handleRefresh();
            }
        }
    });
}

// Add spin animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

// Export for potential external use
export {
    initDashboard,
    updateAllVisualizations,
    handleFilterChange,
    handleRefresh
};
