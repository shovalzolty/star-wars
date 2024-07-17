# Star Wars Figures Catalogue

This is a React application that interacts with the Star Wars API (SWAPI) to display and filter a list of Star Wars figures. The application includes a catalogue view and a filter view.

## Main Features
- Fetch and display a list of Star Wars figures.
- Filter figures by Name, Birth Year, Gender, and Skin Color.
- Paginate the figures list for better navigation.
- Sort figures by Name, Birth Year, Gender, and Skin Color (both in the catalogue and in the filter).
- Responsive design for various screen sizes.
- Error handling for data fetching and user interactions.

## Setup
1. Clone the repository
2. `npm install`
3. `npm start`
4. Navigate to `http://localhost:3000` to see the application running.

## Use of TypeScript and JSX (.tsx)
This project uses TypeScript with JSX syntax, indicated by `.tsx` files. This approach provides:
- **Modern JavaScript**: Utilizes ES6+ features for better code readability and functionality.
- **React Integration**: Simplifies building and understanding React components with HTML-like syntax.

## Development Decisions
- **Context**: This application uses Context to manage global state. By using a centralized data context, the app ensures consistent data management and reduces redundant network requests. This simplifies state sharing across different components.
- **Functional Components**: I used React's functional components in `Catalogue.tsx` and `Filter.tsx` because they are simpler and less verbose compared to class components, making them easier to understand and maintain. Functional components also enable the use of React hooks, which provide features for managing state and side effects in a more readable manner.
- **Custom Hooks**: Implemented custom hooks for data fetching.

## Pagination
- Implemented pagination to handle large data.
- Divided the data into pages, displaying a fixed number of items per page (10 items per page in this case).
- Provides navigation controls to move between pages.
- Pagination state is managed in the context to ensure consistency across the components.

## Filtering
- Implemented a debounced filtering mechanism to enhance performance and user experience.
- Filters data based on Name, Birth Year, Gender, and Skin Color.
- Used uncontrolled components for filter inputs to avoid unnecessary re-renders.
- Filtering is applied to the entire dataset to ensure accurate results before pagination is applied.
- **Filtering via SWAPI option**: According to the SWAPI documentation, filtering is only possible by name using the 'search' query parameter. It does not support filtering by birth year, gender, or other attributes. Therefore, I decided to fetch and save the entire dataset client-side for additional filtering. For larger datasets, using Redux would be more efficient (or filtering via server side).
- After filtering, the filtered data is sliced according to the current page to display the relevant data of the page.

## Sorting
- Added sorting functionality to organize figures by different attributes (e.g., name, birth year).
- Sorting state is managed to ensure consistent sorting across pages.

## `App` Component
- The main component that sets up routing and provides the data context.
- Wraps the application with `DataProvider` to provide the data context.

## `index.tsx`
- The entry point of the application, initializes the root component, and renders it to the DOM.
- `StrictMode` activates additional checks for unsafe lifecycle methods, deprecated APIs, and more.

## `useFetchData.tsx`
- A custom hook that allows you to extract and reuse stateful logic between components.
- This hook is defined as a function that takes a `url` parameter.
- Uses `useState` to manage data, loading state, and error state.
- Uses `useEffect` to fetch data when the component mounts or when the URL changes.

## Data Context
- The `DataContextType` interface defines the shape of the context value that will be provided and consumed by components.
- The `DataProvider` component fetches data once and provides it to the entire application via `DataContext`. This reduces redundant data fetching across different components, as they can consume the context without making their own network requests.
- Context allows centralized data handling, ensuring consistent state across routes.
- The `useDataContext` hook is used to access the data context.

## `Catalogue` Component
- This component displays the list of Star Wars figures.
- It uses the custom hook `useDataContext` to fetch data.
- It conditionally renders based on the loading state and possible errors.
- Implements pagination to handle long lists efficiently.
- Implements sorting to organize figures effectively.

## `Filter` Component
- This component provides filtering options for the Star Wars figures.
- It uses local state to define and manage filter inputs.
- The `handleChange` function sets the filter state and its value when an input field in the form changes.
- The `filteredData` constant filters the data array based on the current state of the filters, resulting in an array that contains only figures that meet the filter criteria.
- Implements pagination for the filtered results to handle long lists efficiently.

## `Navbar` Component
- This component provides navigation links to switch between the Catalogue and Filter views.
- Uses `Link` from `react-router-dom` to navigate between routes.
- The `react-router-dom` library is used for routing, enabling movement between components or pages without refreshing the entire page.

## UX/UI
- Max-width and Centering: Containers have a max-width and are centered with `margin: 0 auto`.
- Flexbox Layouts: Flexbox properties (display: flex, flex-wrap: wrap, justify-content: center) allow elements to adjust and wrap according to the viewport size.
- Responsive Font Sizes: Relative units (rem) ensure text scales.
- Flexible Navbar: The navbar uses flexbox for alignment and spacing.

## Links
- API Documentation: [SWAPI](https://swapi.dev/documentation)
- Base URL: [SWAPI Base URL](https://swapi.dev/api/people/)
- JSON URL: [SWAPI JSON URL](https://swapi.dev/api/people/?format=json)
