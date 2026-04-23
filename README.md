# Civis Dash

**Civis Dash** is a React-based administrative panel designed for managing large-scale citizen databases. It features a high-performance data grid (100k+ records), multi-section profile cards with complex forms, and an analytics dashboard with real-time metrics visualization.

Inspired by the requirements of government and enterprise data portals, this project demonstrates a systematic approach to building maintainable, type-safe, and user-friendly applications.

## Stack:

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

---

# Quick Start

```bash
# Clone & install
git clone <repo-url> && cd civis-dash/frontend
npm install

# Run dev server
npm run dev

# Open browser → http://localhost:5173
```
civis-dash
├─ README.md
└─ frontend
   ├─ README.md
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.svg
   │  ├─ icons.svg
   │  └─ mockServiceWorker.js
   ├─ src
   │  ├─ App.css
   │  ├─ App.tsx
   │  ├─ app
   │  │  └─ theme.ts
   │  ├─ assets
   │  │  ├─ hero.png
   │  │  ├─ react.svg
   │  │  └─ vite.svg
   │  ├─ components
   │  │  └─ BlockNavigator
   │  │     ├─ BlockNavigator.css
   │  │     └─ lockNavigator.jsx
   │  ├─ context
   │  │  └─ ThemeContext.tsx
   │  ├─ entities
   │  │  └─ citizen
   │  │     └─ types.ts
   │  ├─ index.css
   │  ├─ main.tsx
   │  ├─ mocks
   │  │  ├─ browser.ts
   │  │  └─ handlers.ts
   │  ├─ pages
   │  │  ├─ dashboard
   │  │  │  ├─ components
   │  │  │  │  └─ StatsCard.tsx
   │  │  │  ├─ hooks
   │  │  │  │  └─ useDashStats.ts
   │  │  │  └─ index.tsx
   │  │  ├─ profile
   │  │  │  ├─ hooks
   │  │  │  │  └─ useCitizenById.ts
   │  │  │  ├─ index.tsx
   │  │  │  ├─ schemas
   │  │  │  │  └─ profileSchema.ts
   │  │  │  └─ store
   │  │  │     └─ userStore.ts
   │  │  └─ register
   │  │     ├─ components
   │  │     │  ├─ CitizenTable.tsx
   │  │     │  └─ StatusStyle.tsx
   │  │     ├─ hooks
   │  │     │  └─ useCitizen.ts
   │  │     └─ index.tsx
   │  └─ utils
   │     └─ statusStyle.ts
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   └─ vite.config.ts

```
```
civis-dash
├─ README.md
└─ frontend
   ├─ README.md
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.svg
   │  ├─ icons.svg
   │  └─ mockServiceWorker.js
   ├─ src
   │  ├─ App.css
   │  ├─ App.tsx
   │  ├─ app
   │  │  └─ theme.ts
   │  ├─ assets
   │  │  ├─ hero.png
   │  │  ├─ react.svg
   │  │  └─ vite.svg
   │  ├─ components
   │  │  └─ BlockNavigator
   │  │     ├─ BlockNavigator.css
   │  │     └─ lockNavigator.jsx
   │  ├─ context
   │  │  └─ ThemeContext.tsx
   │  ├─ entities
   │  │  └─ citizen
   │  │     └─ types.ts
   │  ├─ index.css
   │  ├─ main.tsx
   │  ├─ mocks
   │  │  ├─ browser.ts
   │  │  └─ handlers.ts
   │  ├─ pages
   │  │  ├─ dashboard
   │  │  │  ├─ components
   │  │  │  │  └─ StatsCard.tsx
   │  │  │  ├─ hooks
   │  │  │  │  └─ useDashStats.ts
   │  │  │  └─ index.tsx
   │  │  ├─ profile
   │  │  │  ├─ components
   │  │  │  │  ├─ ProfileActions.tsx
   │  │  │  │  ├─ ProfileHeader.tsx
   │  │  │  │  ├─ SectionWrapper.tsx
   │  │  │  │  └─ sections
   │  │  │  │     ├─ AddressesSection.tsx
   │  │  │  │     ├─ AuditSection.tsx
   │  │  │  │     ├─ BenefitsSection.tsx
   │  │  │  │     ├─ ChildrenSection.tsx
   │  │  │  │     ├─ ContactsSection.tsx
   │  │  │  │     ├─ DocumentsSection.tsx
   │  │  │  │     ├─ EducationSection.tsx
   │  │  │  │     ├─ EmploymentSection.tsx
   │  │  │  │     ├─ FamilySection.tsx
   │  │  │  │     ├─ FinanceSection.tsx
   │  │  │  │     ├─ HousingSection.tsx
   │  │  │  │     ├─ LanguagesSection.tsx
   │  │  │  │     ├─ LegalSection.tsx
   │  │  │  │     ├─ MedicalSection.tsx
   │  │  │  │     ├─ MigrationSection.tsx
   │  │  │  │     ├─ MilitarySection.tsx
   │  │  │  │     ├─ PersonalSection.tsx
   │  │  │  │     ├─ PropertySection.tsx
   │  │  │  │     ├─ SkillsSection.tsx
   │  │  │  │     └─ SystemSection.tsx
   │  │  │  ├─ config
   │  │  │  │  └─ sectionsConfig.ts
   │  │  │  ├─ hooks
   │  │  │  │  └─ useCitizenById.ts
   │  │  │  ├─ index.tsx
   │  │  │  ├─ schemas
   │  │  │  │  └─ profileSchema.ts
   │  │  │  └─ store
   │  │  │     └─ userStore.ts
   │  │  └─ register
   │  │     ├─ components
   │  │     │  ├─ CitizenTable.tsx
   │  │     │  └─ StatusStyle.tsx
   │  │     ├─ hooks
   │  │     │  └─ useCitizen.ts
   │  │     └─ index.tsx
   │  └─ utils
   │     └─ statusStyle.ts
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   └─ vite.config.ts

```
