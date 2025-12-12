# Business Logic and Hooks

This document provides a detailed overview of the business logic and custom hooks used in the Work Connect application. These hooks are located in `src/lib/estoque/hooks` and encapsulate the application's business rules and data manipulation logic.

## Custom Hooks

### useAlerts.ts

The `useAlerts` hook is responsible for managing stock alerts. It provides functions for fetching, creating, and updating alerts, as well as for handling alert-related business logic.

-   **Purpose**: To encapsulate the logic for managing stock alerts.
-   **Return Values**: An object containing the list of alerts and functions for manipulating them.
-   **Business Rules**: Implements rules for generating alerts based on stock levels, expiration dates, and other criteria.

### useCategories.ts

The `useCategories` hook is used to manage product categories. It provides functions for fetching, creating, updating, and deleting categories, as well as for handling category-specific logic.

-   **Purpose**: To manage the product category hierarchy and related business logic.
-   **Return Values**: An object containing the list of categories and functions for managing them.
-   **Business Rules**: Implements rules for handling nested categories and for ensuring data consistency when categories are modified.

### useCharts.ts

The `useCharts` hook is responsible for generating the data needed for the charts and visualizations in the Dashboard Tab.

-   **Purpose**: To encapsulate the logic for data aggregation and formatting for charts.
-   **Return Values**: An object containing the data for all the charts in the application.
-   **Business Rules**: Implements the logic for calculating key metrics and for transforming raw data into a format suitable for charting.

### useDatabaseIntegration.ts

The `useDatabaseIntegration` hook is responsible for handling the integration with the database. It provides functions for fetching, saving, and syncing data with a remote database.

-   **Purpose**: To abstract the details of the database integration and to provide a consistent API for data persistence.
-   **Return Values**: An object containing the status of the database connection and functions for interacting with the database.
-   **Business Rules**: Implements the logic for handling data synchronization, conflict resolution, and error handling.

### useExpirations.ts

The `useExpirations` hook is used to manage product expiration dates. It provides functions for tracking products that are nearing their expiration date and for generating alerts.

-   **Purpose**: To encapsulate the logic for managing product expirations.
-   **Return Values**: An object containing the list of expiring products and related data.
-   **Business Rules**: Implements the rules for identifying and flagging products that are nearing their expiration date.

### useFilters.ts

The `useFilters` hook is responsible for managing the filters used in the data tables. It provides a flexible and extensible way to filter data based on user input.

-   **Purpose**: To provide a centralized solution for managing data filters.
-   **Return Values**: An object containing the current filter state and functions for updating it.
-   **Business Rules**: Implements the logic for applying filters to the data and for ensuring that the filter state is consistent.

### useMovements.ts

The `useMovements` hook is used to manage stock movements. It provides functions for fetching, creating, and tracking stock movements.

-   **Purpose**: To encapsulate the logic for managing stock movements.
-   **Return Values**: An object containing the list of movements and functions for managing them.
-   **Business Rules**: Implements the rules for validating and processing stock movements, as well as for updating the stock levels accordingly.

### useProducts.ts

The `useProducts` hook is responsible for managing the products in the inventory. It provides functions for fetching, creating, updating, and deleting products.

-   **Purpose**: To encapsulate the logic for managing products.
-   **Return Values**: An object containing the list of products and functions for managing them.
-   **Business Rules**: Implements the rules for calculating stock status, handling product variants, and for ensuring data consistency.

### useRealTimeUpdates.ts

The `useRealTimeUpdates` hook is used to provide real-time updates to the application. It uses a WebSocket connection to receive updates from the server and to update the application's state in real-time.

-   **Purpose**: To provide a seamless and responsive user experience by keeping the data up-to-date in real-time.
-   **Return Values**: An object containing the status of the real-time connection.
-   **Business Rules**: Implements the logic for handling real-time updates, including conflict resolution and error handling.

### useReports.ts

The `useReports` hook is responsible for generating and managing reports. It provides functions for creating, customizing, and exporting reports in various formats.

-   **Purpose**: To provide a flexible and powerful reporting solution.
-   **Return Values**: An object containing the generated report data and functions for managing reports.
-   **Business Rules**: Implements the logic for aggregating and formatting data for reports, as well as for handling report customization and export.

### useStockData.ts

The `useStockData` hook is the core of the state management system. It initializes the application's state and provides a set of functions for performing CRUD operations on the data.

-   **Purpose**: To provide a centralized and consistent way to manage the application's state.
-   **Return Values**: An object containing the application's state and functions for updating it.
-   **Business Rules**: Implements the main business logic of the application, including data validation and consistency checks.

### useSuppliers.ts

The `useSuppliers` hook is used to manage the suppliers. It provides functions for fetching, creating, updating, and deleting suppliers.

-   **Purpose**: To encapsulate the logic for managing suppliers.
-   **Return Values**: An object containing the list of suppliers and functions for managing them.
-   **Business Rules**: Implements the rules for handling supplier data, including contact information, performance metrics, and payment terms.

### useWarehouses.ts

The `useWarehouses` hook is used to manage the warehouses and storage locations. It provides functions for fetching, creating, updating, and deleting warehouses.

-   **Purpose**: To encapsulate the logic for managing warehouses.
-   **Return Values**: An object containing the list of warehouses and functions for managing them.
-   **Business Rules**: Implements the rules for handling warehouse data, including capacity management and location tracking.
