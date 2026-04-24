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
![Vitest](https://img.shields.io/badge/Vitest-1-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![RTL](https://img.shields.io/badge/Testing_Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-2-%23FF6A00?style=for-the-badge&logo=mockserviceworker&logoColor=white)
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
