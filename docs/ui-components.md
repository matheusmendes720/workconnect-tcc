# UI Components

This document provides a detailed overview of the main UI components used in the Work Connect application. These components are located in `src/components/estoque/ui` and are designed to be reusable and modular.

## AdvancedFilters.tsx

The `AdvancedFilters` component provides a user-friendly interface for applying complex filters to data tables. It is designed to be easily configurable and can be adapted to different data models.

-   **Props**:
    -   `filters`: An object defining the available filters and their current values.
    -   `onFilterChange`: A callback function that is invoked when a filter value is changed.
-   **Usage**: This component is used in various feature tabs to allow users to narrow down the displayed data based on specific criteria.

## AlertCard.tsx

The `AlertCard` component is used to display individual stock alerts in a clear and concise format. It includes information about the alert's priority, status, and related product.

-   **Props**:
    -   `alert`: The alert object to be displayed.
    -   `onMarkAsRead`: A callback function to mark the alert as read.
    -   `onResolve`: A callback function to resolve the alert.
-   **Usage**: This component is used in the Alerts Tab to display a list of all stock alerts.

## BulkActionsBar.tsx

The `BulkActionsBar` component provides a set of actions that can be performed on multiple selected items in a data table. It is designed to be easily extendable with new actions.

-   **Props**:
    -   `selectedItems`: An array of the currently selected items.
    -   `actions`: An array of action objects, each with a label and an `onClick` handler.
-   **Usage**: This component is used in the Products Tab to allow users to perform bulk operations, such as deleting or updating multiple products at once.

## CapacityGauge.tsx

The `CapacityGauge` component is a visual representation of the current capacity of a warehouse or storage location. It provides a quick and easy way to see how much space is available.

-   **Props**:
    -   `currentCapacity`: The current capacity level.
    -   `maxCapacity`: The maximum capacity.
-   **Usage**: This component is used in the Warehouses Tab to display the capacity of each warehouse.

## DateRangePicker.tsx

The `DateRangePicker` component allows users to select a date range for filtering data. It is used in various parts of the application to provide time-based filtering.

-   **Props**:
    -   `onDateChange`: A callback function that is invoked when the date range is changed.
-   **Usage**: This component is used in the Reports Tab and the Movements Tab to filter data by date.

## ErrorState.tsx

The `ErrorState` component is displayed when an error occurs while fetching or displaying data. It provides a user-friendly message and an option to retry the operation.

-   **Props**:
    -   `message`: The error message to be displayed.
    -   `onRetry`: A callback function to retry the failed operation.
-   **Usage**: This component is used throughout the application to handle and display errors gracefully.

## ExportButton.tsx

The `ExportButton` component allows users to export data to various formats, such as CSV or PDF. It is designed to be easily integrated with different data sources.

-   **Props**:
    -   `data`: The data to be exported.
    -   `format`: The desired export format.
-   **Usage**: This component is used in the Reports Tab to allow users to export their generated reports.

## LoadingSkeleton.tsx

The `LoadingSkeleton` component is used to provide a visual placeholder while data is being loaded. It improves the user experience by indicating that content is on its way.

-   **Props**:
    -   `count`: The number of skeleton items to display.
-   **Usage**: This component is used in various tabs to provide a loading state while data is being fetched from the server.

## LoadingState.tsx

The `LoadingState` component is a simple component that displays a loading spinner and a message to indicate that an operation is in progress.

-   **Props**:
    -   `message`: The message to be displayed.
-   **Usage**: This component is used for general loading states where a full skeleton is not necessary.

## NotificationCenter.tsx

The `NotificationCenter` component is a centralized location for displaying notifications to the user. It can be used to show success messages, warnings, and errors.

-   **Props**:
    -   `notifications`: An array of notification objects to be displayed.
    -   `onClose`: A callback function to close the notification center.
-   **Usage**: This component is used in the main application layout to display global notifications.

## PageHeader.tsx

The `PageHeader` component is used to display the title of the current page, along with any relevant actions or information.

-   **Props**:
    -   `title`: The title of the page.
    -   `actions`: An array of action components to be displayed in the header.
-   **Usage**: This component is used at the top of each page to provide a consistent header.

## QuickActions.tsx

The `QuickActions` component provides a set of frequently used actions in a floating action button format. It allows users to quickly perform common tasks without navigating to a different page.

-   **Props**:
    -   `actions`: An array of action objects, each with a label, icon, and `onClick` handler.
-   **Usage**: This component is displayed on all pages to provide quick access to common actions.

## RealTimeBadge.tsx

The `RealTimeBadge` component is a small badge that indicates whether the application is currently receiving real-time updates.

-   **Props**:
    -   `isActive`: A boolean indicating whether real-time updates are active.
-   **Usage**: This component is displayed in the page header to provide a visual cue for real-time data.

## TabNavigation.tsx

The `TabNavigation` component provides a set of tabs for navigating between different sections of the application. It is designed to be easily configurable with different tab layouts.

-   **Props**:
    -   `tabs`: An array of tab objects, each with a label and a corresponding component.
    -   `activeTab`: The currently active tab.
    -   `onTabChange`: A callback function that is invoked when a tab is changed.
-   **Usage**: This component is used to create the main navigation structure of the application.
