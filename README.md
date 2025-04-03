# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Food Listing App

A React-based web application for exploring food products using the OpenFoodFacts API.

## Features

- Product search by name or barcode
- Advanced filtering by categories and nutrients
- Detailed product view with:
  - Nutrition facts
  - Ingredients
  - Labels & tags (vegan, gluten-free, etc.)
- Infinite scroll pagination
- Dark mode support
- Responsive design

## Technical Approach

1. **API Integration**:

   - Used OpenFoodFacts API endpoints
   - Implemented React Query for data fetching and caching
   - Created custom hooks for API calls

2. **State Management**:

   - URL search params for filters
   - Context API for dark mode
   - React Query for server state

3. **UI Components**:

   - Built with Tailwind CSS
   - Implemented skeleton loading states
   - Responsive grid layout
   - Accessible interactive elements

4. **Performance Optimizations**:
   - Debounced search inputs
   - Lazy loading
   - Paginated API requests

## Development Timeline

- Started: July 1, 2023
- Completed: July 2, 2023
- Testing: July 3, 2023
- Total Time: Around 12 hours

## Setup Instructions

1. Clone repository:

git clone https://github.com/shirajahmed/food_listing.git

2. npm install

3. npm run dev

4. **Deployment**:

- Deployed to Vercel: https://food-listing.vercel.app/

5. **Time Tracking**:

- Development: 10-12 hours total
- Planning: 2 hours
- Implementation: 8 to 10 hours
- Testing/Debugging: 2 hours
