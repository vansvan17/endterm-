# 🔴 Crimson Ops E-Commerce Dashboard

A high-contrast, dark-red themed analytics dashboard designed for e-commerce monitoring. This project demonstrates responsive UI design, dynamic data visualization, and modular JavaScript architecture without external libraries.

![Dashboard Preview](https://via.placeholder.com/800x400/800000/ffffff?text=Dashboard+Screenshot)
## ✨ Features

* **🎨 Custom Aesthetic:** Strict "Maroon & Black" dark mode palette using CSS variables.
* **📊 Dynamic Visualizations:** Custom SVG line charts, animated bar charts, and pie charts rendered via vanilla JavaScript.
* **⚡ Real-Time Simulation:** Clicking "Refresh" generates new realistic random data for revenue, orders, and customer metrics.
* **📅 Interactive Filters:** Data reacts instantly to date range (7/30/90 days) and category selections.
* **📱 Fully Responsive:** Adapts seamlessly from desktop to mobile screens.

## 📂 Project Structure

This project follows a modular architecture to separate concerns:

| File | Description |
| :--- | :--- |
| **`index.html`** | The main entry point. Contains the semantic HTML structure and loads all resources. |
| **`styles.css`** | Contains all visual styling, CSS variables for the red theme, and responsive media queries. |
| **`controller.js`** | The "brain" of the app. Handles event listeners (clicks, dropdowns) and coordinates data updates. |
| **`data-loader.js`** | Logic for generating realistic mock data based on selected filters (e.g., date ranges). |
| **`visualizations.js`**| Pure presentation logic. Contains functions to draw SVG charts (`renderLineChart`, `renderPieChart`, etc.). |
| **`data.js`** | Static constants and configuration data (e.g., color palettes, category lists). |
| **`PROJECT_SUMMARY.md`**| Internal notes and summary of the project goals. |

## 🚀 How to Run

Since this project uses vanilla HTML/CSS/JS, no build step is required.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/vansvan17/endterm-.git](https://github.com/vansvan17/endterm-.git)
    ```
2.  **Open the dashboard:**
    Simply double-click `index.html` to open it in your web browser.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3, ES6+ JavaScript.
* **Architecture:** Module-based separation of Data, View (Visualizations), and Logic (Controller).
* **No Frameworks:** Built entirely from scratch to demonstrate core web development skills.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
*Created by [vansvan17](https://github.com/vansvan17)*