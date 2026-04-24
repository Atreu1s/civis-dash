# Civis Dash

Administrative panel for managing large-scale citizen databases. Built with React, TypeScript, and modern tooling to deliver high performance, type safety, and maintainable code structure.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Performance Considerations](#performance-considerations)
- [Contributing](#contributing)
- [License](#license)

## Overview

Civis Dash is a reference implementation of a government-grade data management interface. It addresses the requirements of handling 100,000+ citizen records with 150+ parameters per record and up to 20 related data tables (family members, education history, employment records, etc.).

The project demonstrates:
- Virtualized rendering for large datasets
- Complex form management with validation
- Modular architecture following Feature-Sliced Design principles
- Comprehensive testing strategy
- Responsive design with dark/light theme support

## Features

- **Dashboard**: Real-time metrics visualization with interactive charts
- **Citizen Registry**: High-performance data grid with filtering, sorting, and pagination
- **Profile Management**: Multi-section form with 150+ fields across 20 categories
- **Form Validation**: Zod-based schema validation with React Hook Form
- **State Management**: TanStack Query for server state, Zustand for client state
- **Theming**: MUI-based theme system with dark/light mode toggle
- **Mocking**: MSW + Faker.js for realistic development data
- **Testing**: Jest + React Testing Library for unit and integration tests

## Technology Stack

### Frontend
![React](https://img.shields.io/badge/React-18-%2361DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-%23646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-5-%23007FFF?style=for-the-badge&logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-%23CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### State & Data
![Zustand](https://img.shields.io/badge/Zustand-4-%23000000?style=for-the-badge&logo=zustand&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-%23FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1-%235A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Forms & Validation
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7-%23EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3-%233E67B1?style=for-the-badge&logo=zod&logoColor=white)

### Tables & Charts
![TanStack Table](https://img.shields.io/badge/TanStack_Table-8-%23FF4154?style=for-the-badge&logo=react-table&logoColor=white)
![TanStack Virtual](https://img.shields.io/badge/TanStack_Virtual-3-%23FF4154?style=for-the-badge&logo=react-virtual&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-%2375B400?style=for-the-badge&logo=recharts&logoColor=white)

### Testing & Quality
![Jest](https://img.shields.io/badge/Jest-29-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![RTL](https://img.shields.io/badge/Testing_Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![JMeter](https://img.shields.io/badge/Apache_JMeter-5.6-%23D22128?style=for-the-badge&logo=apache&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8-%234B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3-%23F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

### Mocking & Data Generation
![MSW](https://img.shields.io/badge/MSW-2-%23FF6A00?style=for-the-badge&logo=mockserviceworker&logoColor=white)
![Faker.js](https://img.shields.io/badge/Faker.js-8-%2399425B?style=for-the-badge&logo=faker&logoColor=white)

### DevOps & Infrastructure
![Docker](https://img.shields.io/badge/Docker-24-%232496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitLab CI](https://img.shields.io/badge/GitLab_CI-%23FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher (or pnpm/yarn)
- Git

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd civis-dash/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application at http://localhost:5173
```

### Docker Setup

```bash
# Build and run with Docker
docker build -t civis-dash .
docker run -p 5173:5173 civis-dash
```

## Architecture

### Design Principles

1. **Feature-Sliced Design (FSD)**: Code is organized by business features rather than technical layers. Each feature is self-contained with its own components, hooks, schemas, and types.

2. **Separation of Concerns**:
   - `entities/`: Domain models and shared types
   - `features/`: Business logic and UI for specific capabilities
   - `pages/`: Route-level composition of features
   - `shared/`: Reusable utilities and UI primitives

3. **Type Safety**: Full TypeScript coverage with Zod for runtime validation. Types are inferred from schemas where possible to avoid duplication.

4. **State Management Strategy**:
   - Server state: TanStack Query (caching, background updates, error handling)
   - Client state: Zustand (UI state, form drafts, theme preferences)
   - Local state: React useState/useReducer (component-specific)

### Data Flow

```
API Request → TanStack Query → MSW (dev) / Real API (prod)
                          ↓
                    Normalized Cache
                          ↓
              Component via useQuery/useMutation
                          ↓
                    UI Rendering
                          ↓
              Form Submission → Zod Validation
                          ↓
              Success/Error Handling → Query Invalidation
```

### Performance Optimizations

- **Virtualization**: TanStack Virtual renders only visible rows for tables with 100k+ records
- **Memoization**: React.memo and useMemo prevent unnecessary re-renders
- **Code Splitting**: Route-based lazy loading with React.lazy
- **Debouncing**: Search and filter inputs use debounced queries
- **Pagination**: Server-side pagination with placeholderData for smooth transitions

### Form Architecture

Each profile section is a controlled component receiving `control` from React Hook Form via FormProvider. Validation schemas are composed using Zod's `.merge()` and `.refine()` methods.

```
ProfilePage (FormProvider)
├── PersonalSection (control)
├── ContactsSection (control)
├── AddressesSection (control)
└── ... 17 more sections
```

## Available Scripts

```bash
# Development
npm run dev           # Start Vite dev server
npm run build         # Production build
npm run preview       # Preview production build locally

# Testing
npm test              # Run Jest tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Generate coverage report

# Quality
npm run lint          # ESLint check
npm run lint:fix      # Auto-fix linting issues
npm run format        # Prettier format
npm run typecheck     # TypeScript type checking

# Mocking
npm run mock:start    # Start MSW worker (handled automatically in dev)
```

## Testing

### Test Structure

Tests are colocated with source files using `.test.tsx` suffix:

```
src/
├── features/citizen/
│   ├── components/ProfileHeader.tsx
│   ├── components/ProfileHeader.test.tsx
│   ├── schemas/profileSchema.ts
│   └── schemas/profileSchema.test.ts
```

### Running Tests

```bash
# Watch mode (re-runs on file changes)
npm test

# Single run with coverage
npm run test:coverage

# Run specific test file
npx jest src/features/citizen/schemas/profileSchema.test.ts
```

### Test Coverage Targets

- Statements: 70%
- Branches: 70%
- Functions: 70%
- Lines: 70%

Coverage report is generated in `coverage/` directory after running `npm run test:coverage`.

## Environment Variables

Create `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_MOCKS=true
VITE_ENABLE_ANALYTICS=false

# Build
VITE_APP_VERSION=1.0.0
```

Variables prefixed with `VITE_` are exposed to the client bundle.

## Performance Considerations

### Large Dataset Handling

For 100,000+ citizen records:

1. **Server-Side Pagination**: Always request paginated data (`?page=1&limit=50`)
2. **Virtual Scrolling**: Only render visible rows using TanStack Virtual
3. **Debounced Filters**: Apply search/filter changes after 300ms delay
4. **Memoized Selectors**: Use reselect or Zustand selectors to prevent re-renders

### Form Performance

For forms with 150+ fields:

1. **Field-Level Memoization**: Each section is memoized to prevent full-form re-renders
2. **Lazy Validation**: Validate on blur or submit, not on every keystroke
3. **Draft Persistence**: Save form state to localStorage/IndexedDB for recovery

### Bundle Optimization

- Code splitting by route
- Tree-shaking of unused MUI components
- Compression with Brotli/Gzip in production

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, no logic changes
- `refactor:` Code restructuring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Code Review Checklist

- [ ] TypeScript types are strict and complete
- [ ] Components are memoized where appropriate
- [ ] Tests cover happy path and edge cases
- [ ] Accessibility attributes are included
- [ ] Responsive behavior is verified
- [ ] No console.log statements in production code

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License. See LICENSE file for details.