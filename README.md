# E-Commerce Analytics Dashboard

A dynamic, interactive dashboard for visualizing e-commerce metrics and key performance indicators. Built with vanilla JavaScript, this project demonstrates clean code architecture, separation of concerns, and advanced DOM manipulation techniques.

## 🎯 Project Overview

This dashboard presents meaningful insights from e-commerce data through interactive visualizations. It features real-time filtering, multiple chart types, and responsive design suitable for all screen sizes.

## ✨ Features

### Visualizations (5 Types)
1. **Line Chart** - Revenue trend over time with interactive data points
2. **Horizontal Bar Chart** - Top selling products by revenue
3. **Pie Chart** - Category distribution with legend
4. **Bar Chart** - Regional sales performance
5. **Progress Indicators** - Customer acquisition and retention metrics

### Interactive Controls
- **Date Range Filter** - View data from last 7, 30, or 90 days, or all time
- **Category Filter** - Filter by product category
- **Refresh Button** - Regenerate mock data to see different patterns
- **Responsive Design** - Adapts seamlessly to mobile, tablet, and desktop

### Key Performance Indicators (KPIs)
- Total Revenue with percentage change
- Total Orders with trend indicator
- Average Order Value
- Active Customers count

## 🏗️ Architecture

The project follows a clean three-layer architecture:

```
├── index.html              # Main HTML structure
├── styles.css             # All styling and responsive design
└── js/
    ├── data.js           # Data layer - processing, filtering, calculations
    ├── visualizations.js # Presentation layer - rendering charts
    └── controller.js     # Controller layer - event handling, coordination
```

### Separation of Concerns

#### Data Layer (`data.js`)
- Data storage and state management
- Mock data generation
- Filtering logic
- Metric calculations
- No DOM manipulation

#### Presentation Layer (`visualizations.js`)
- Chart rendering functions
- Pure visualization logic
- DOM element creation
- No data processing

#### Controller Layer (`controller.js`)
- Event listeners
- Coordination between data and UI
- User interaction handling
- Dashboard initialization

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-dashboard
   ```

2. **Run a local server**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx serve
   ```
   
   Or use VS Code's Live Server extension

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### File Structure
```
ecommerce-dashboard/
│
├── index.html              # Main page
├── styles.css             # Styling
├── js/
│   ├── data.js           # Data module
│   ├── visualizations.js # Visualization module
│   └── controller.js     # Controller module
└── README.md             # This file
```

## 💻 Usage

### Filtering Data
1. Select a date range from the dropdown (Last 7/30/90 days or All Time)
2. Choose a category filter (or select "All Categories")
3. Click "Apply Filters" or let filters apply automatically on change

### Refreshing Data
- Click the "Refresh Data" button in the header
- Or press the 'R' key on your keyboard
- New mock data will be generated and visualizations will update

### Exploring Visualizations
- Hover over chart elements to see detailed tooltips
- Each visualization updates dynamically based on current filters
- Charts are fully responsive and adapt to screen size

## 🎨 Design Decisions

### Domain Choice: E-Commerce Analytics
Chosen for its universal relevance and ability to showcase diverse data types:
- Time-series data (revenue trends)
- Comparative data (top products, regions)
- Proportional data (category distribution)
- Progress metrics (customer retention)

### Visualization Choices

**Line Chart for Revenue Trend**
- Best for showing change over time
- Smooth transitions make trends easy to identify
- Interactive points provide detailed information

**Bar Charts for Rankings**
- Ideal for comparing discrete items
- Horizontal layout accommodates longer labels
- Clear visual hierarchy

**Pie Chart for Distribution**
- Effective for showing parts of a whole
- Limited to 5 categories for clarity
- Paired with legend for precise values

**Progress Bars for Metrics**
- Quick visual understanding of completion/achievement
- Multiple metrics shown compactly
- Gradient styling adds visual interest

### Color Scheme
- Primary: Blue (#2563eb) - Professional, trustworthy
- Secondary: Purple (#7c3aed) - Modern, creative
- Gradients: Smooth transitions add polish
- Semantic colors: Green for positive, red for negative trends

## 🔧 Technical Highlights

### Module System
- ES6 modules for clean code organization
- Explicit imports/exports for clarity
- Each module has single responsibility

### DOM Manipulation
- Pure JavaScript - no frameworks
- SVG for scalable vector graphics
- Dynamic element creation
- Efficient event handling

### Performance Optimizations
- Debounced resize events
- Minimal re-renders
- Efficient data structures
- CSS transitions over JavaScript animations

### Responsive Design
- CSS Grid for flexible layouts
- Mobile-first approach
- Breakpoints at 768px and 480px
- Touch-friendly interactions

## 📊 Data Structure

### Transaction Object
```javascript
{
  id: "ORDER-1001",
  date: Date,
  category: "Electronics",
  product: "Laptop",
  price: 899.99,
  quantity: 1,
  revenue: 899.99,
  region: "North",
  customerId: "CUST-123"
}
```

### Calculated Metrics
```javascript
{
  totalRevenue: 125430.50,
  totalOrders: 500,
  avgOrderValue: 250.86,
  activeCustomers: 187,
  revenueChange: 12.5,      // percentage
  ordersChange: 8.3,
  avgChange: 3.8,
  customersChange: 15.2
}
```

## 🎓 Learning Outcomes

This project demonstrates:

✅ Clean separation of data, presentation, and controller logic  
✅ Advanced DOM manipulation techniques  
✅ Creating visualizations with pure JavaScript and SVG  
✅ Implementing interactive controls and filters  
✅ Responsive design with CSS Grid and Flexbox  
✅ State management without frameworks  
✅ Performance optimization techniques  
✅ Accessibility considerations  

## 🔮 Future Enhancements

Potential improvements for advanced implementation:

- [ ] Connect to real API for live data
- [ ] Add export functionality (CSV, PDF)
- [ ] Implement data caching
- [ ] Add animation libraries for smoother transitions
- [ ] Include more chart types (scatter plots, heat maps)
- [ ] Add user authentication and saved preferences
- [ ] Implement dark mode toggle
- [ ] Add date picker for custom ranges
- [ ] Include comparison mode (this year vs last year)
- [ ] Add drill-down capabilities for detailed views

## 📝 Code Quality

### Best Practices Followed
- Meaningful variable and function names
- Comprehensive comments explaining logic
- Consistent code formatting
- Error handling for edge cases
- Modular, reusable functions
- No global variables (except module exports)

### Testing Recommendations
- Test with various data sizes
- Verify responsive behavior on multiple devices
- Check keyboard navigation
- Validate calculations manually
- Test edge cases (empty data, single data point)

## 🌐 Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires support for:
- ES6 Modules
- CSS Grid
- Flexbox
- SVG

## 👨‍💻 Development

### Adding a New Visualization

1. **Add container to HTML**
   ```html
   <div id="new-chart" class="chart-container"></div>
   ```

2. **Create rendering function in visualizations.js**
   ```javascript
   export function renderNewChart(data, containerId) {
     // Rendering logic
   }
   ```

3. **Update controller.js**
   ```javascript
   import { renderNewChart } from './visualizations.js';
   
   function updateAllVisualizations() {
     renderNewChart(data, 'new-chart');
   }
   ```

### Modifying Data Structure

Update data.js to change mock data generation or add new calculations. All dependent visualizations will automatically receive the updated data structure.

## 📄 License

This project is created for educational purposes as part of a web development course.

## 🙏 Acknowledgments

- Project requirements from Digital Dashboards & Visualization Systems course
- Color palette inspired by Tailwind CSS
- SVG techniques from MDN Web Docs
- Data visualization principles from Edward Tufte

## 📧 Contact

For questions or feedback about this project, please contact through the course platform.

---

**Note**: This dashboard uses randomly generated mock data. In a production environment, you would connect to a real API endpoint for actual e-commerce data.
#   e n d t e r m -  
 