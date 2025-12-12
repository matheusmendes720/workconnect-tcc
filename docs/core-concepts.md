# Core Concepts

This document provides a detailed explanation of the core concepts that underpin the Work Connect application, including its architecture, state management, and data models.

## Application Architecture

Work Connect is a modern web application built on a robust and scalable architecture. The key components of its architecture are:

-   **Frontend Framework**: The application is developed using **Next.js**, a popular React framework that enables server-side rendering, static site generation, and a seamless developer experience.
-   **Component-Based Structure**: The UI is organized into a modular, component-based structure, which promotes reusability and maintainability. Components are located in the `src/components` directory and are categorized by feature.
-   **Routing**: The application uses a file-based routing system, with pages and routes defined in the `src/app` directory. This approach simplifies navigation and makes the application's structure easy to understand.
-   **Styling**: The application's styling is managed through a combination of global stylesheets and component-specific styles, ensuring a consistent and visually appealing user interface.

## State Management

The application employs a centralized state management solution to ensure a single source of truth and predictable data flow. The key elements of the state management system are:

-   **`StockDataProvider`**: This is a React Context provider that wraps the entire application and makes the global state accessible to all components. It is implemented in `src/lib/estoque/context/StockDataContext.tsx`.
-   **`useStockData` Hook**: This custom hook, located in `src/lib/estoque/hooks/useStockData.ts`, is the core of the state management system. It initializes the application's state with mock data and provides a set of functions for performing CRUD (Create, Read, Update, Delete) operations on the data.
-   **`useStockDataContext` Hook**: This hook provides a convenient way for components to access the global state and the functions provided by the `useStockData` hook. It ensures that components can only access the state when they are rendered within the `StockDataProvider`.

The data flow in the application is unidirectional, with state changes being initiated by user actions and propagated down to the components. This makes the application's behavior predictable and easy to debug.

## Data Models

The application's data models are defined in `src/types/estoque.ts` and provide a clear and consistent structure for the data used throughout the application. The main data models are:

-   **`Product`**: Represents a product in the inventory, with properties such as name, description, quantity, and price.
-   **`Category`**: Represents a product category, with properties for name, description, and parent category.
-   **`Supplier`**: Represents a supplier, with properties for company name, contact information, and delivery terms.
-   **`Movement`**: Represents a stock movement, such as a sale or purchase, with properties for product, quantity, and type of movement.
-   **`Alert`**: Represents a stock alert, such as a low stock warning, with properties for product, priority, and status.
-   **`Warehouse`**: Represents a warehouse or storage location, with properties for name, location, and capacity.

These data models are used throughout the application, from the mock data generation to the UI components, ensuring data consistency and type safety.
