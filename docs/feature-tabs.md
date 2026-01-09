# Feature Tabs

This document provides a detailed overview of the feature tabs in the Work Connect application. These tabs are located in `src/components/estoque/tabs` and provide the core functionality of the application.

## DashboardTab.tsx

The `DashboardTab` component is the main landing page of the application. It provides a high-level overview of the stock status, including key metrics, charts, and recent activity.

-   **Logic**: The component fetches and displays summary data from the `useStockDataContext`, providing a snapshot of the most important information.
-   **Data Handling**: It uses the `useCharts` hook to generate data visualizations and the `useStockData` hook to access the main data.
-   **User Interactions**: Users can interact with the charts to get more detailed information and use the quick action buttons to navigate to other parts of the application.

## ProductsTab.tsx

The `ProductsTab` component is used to manage the products in the inventory. It provides a data table with all products, along with options for filtering, sorting, and performing bulk actions.

-   **Logic**: The component uses the `useProducts` hook to handle product selection and filtering. It also integrates with the `useStockDataContext` to perform CRUD operations on products.
-   **Data Handling**: It receives a list of products from the main `StockDataProvider` and allows users to modify this data.
-   **User Interactions**: Users can add, edit, and delete products, as well as select multiple products for bulk operations.

## CategoriesTab.tsx

The `CategoriesTab` component is used to manage product categories. It provides a hierarchical view of the categories and allows users to add, edit, and delete them.

-   **Logic**: The component uses the `useCategories` hook to manage the category hierarchy and provides a simple interface for CRUD operations.
-   **Data Handling**: It interacts with the `StockDataProvider` to update the category data.
-   **User Interactions**: Users can create new categories, edit existing ones, and delete categories that are no longer needed.

## SuppliersTab.tsx

The `SuppliersTab` component is used to manage the suppliers. It provides a list of all suppliers, along with their contact information and performance metrics.

-   **Logic**: The component provides a straightforward interface for managing supplier data, with options for adding, editing, and deleting suppliers.
-   **Data Handling**: It uses the `StockDataProvider` to manage the supplier data.
-   **User Interactions**: Users can add new suppliers, update their information, and remove them from the system.

## MovementsTab.tsx

The `MovementsTab` component is used to track all stock movements, such as sales, purchases, and transfers. It provides a detailed log of all transactions, with options for filtering and searching.

-   **Logic**: The component displays a list of all stock movements and allows users to add new movements.
-   **Data Handling**: It uses the `StockDataProvider` to access the movement data and add new entries.
-   **User Interactions**: Users can view the details of each movement and add new movements to the log.

## AlertsTab.tsx

The `AlertsTab` component is used to manage stock alerts, such as low stock warnings and expiration alerts. It provides a list of all active alerts, with options for marking them as read or resolving them.

-   **Logic**: The component displays a list of all stock alerts and allows users to take action on them.
-   **Data Handling**: It uses the `StockDataProvider` to access the alert data and update their status.
-   **User Interactions**: Users can mark alerts as read, resolve them, and perform bulk actions on multiple alerts.

## WarehousesTab.tsx

The `WarehousesTab` component is used to manage the warehouses and storage locations. It provides a list of all warehouses, along with their capacity and current utilization.

-   **Logic**: The component displays a list of all warehouses and allows users to add, edit, and delete them.
-   **Data Handling**: It uses the `StockDataProvider` to manage the warehouse data.
-   **User Interactions**: Users can add new warehouses, update their information, and remove them from the system.

## ExpirationsTab.tsx

The `ExpirationsTab` component is used to track products that are nearing their expiration date. It provides a list of all products with an expiration date, with options for filtering and sorting.

-   **Logic**: The component displays a list of all products with an expiration date, highlighting those that are nearing expiration.
-   **Data Handling**: It uses the `StockDataProvider` to access the product data and their expiration dates.
-   **User Interactions**: Users can view the expiration status of products and take action to prevent waste.

## ReportsTab.tsx

The `ReportsTab` component is used to generate and view reports on various aspects of the stock management system. It provides a set of pre-defined reports, as well as options for creating custom reports.

-   **Logic**: The component allows users to select a report type, apply filters, and generate a report.
-   **Data Handling**: It uses the `StockDataProvider` to access the data needed for the reports.
-   **User Interactions**: Users can generate, view, and export reports in various formats.
