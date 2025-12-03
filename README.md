# TOEIC React App - Documentation

A modern TOEIC (Test of English for International Communication) practice application built with **React**, **TypeScript**, **Vite**, and **TanStack Router**.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Folder Organization](#folder-organization)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [Building](#building)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [TanStack Documentation](#tanstack-documentation)
- [Learn More](#learn-more)

## Overview

This application provides an interactive platform for TOEIC test preparation with features including:
- Practice and exam modes
- Real-time test progress tracking
- Audio-based listening exercises
- Solution reviews with explanations
- Practice duration persistence
- Audio playback position memory

## Tech Stack

| Technology      | Version  | Purpose                 |
| --------------- | -------- | ----------------------- |
| React           | 19.1.1   | UI Framework            |
| TypeScript      | 5.8.3    | Type Safety             |
| Vite            | 7.1.2    | Build Tool              |
| TanStack Router | 1.131.28 | File-based Routing      |
| TanStack Query  | 5.85.5   | Server State Management |
| React Hook Form | 7.62.0   | Form Management         |
| Shadcn UI       | Latest   | UI Components           |
| Tailwind CSS    | 4.1.12   | Styling                 |
| Axios           | 1.11.0   | HTTP Client             |

## Project Structure

```
toeic-react-ts-vite/
├── public/                          # Static assets
│   ├── tma_logo.png
│   ├── tma_solution.jpg
│   └── vite.svg
├── src/
│   ├── index.css                   # Global styles
│   ├── main.tsx                    # Application entry point
│   ├── routeTree.gen.ts            # Auto-generated route tree (TanStack Router)
│   ├── vite-env.d.ts               # Vite environment types
│   ├── asset/                      # Application assets
│   │   └── image/
│   ├── common/                     # 🌍 Shared/Global Resources
│   ├── feature/                    # 📦 Feature-Based Modules
│   ├── routes/                     # 🛣️ File-Based Routes (TanStack Router)
│   └── shadcn/                     # 🎨 Shadcn UI Components
├── components.json                 # Shadcn UI configuration
├── eslint.config.js               # ESLint configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── package.json                   # Project dependencies
```

## Folder Organization

### 🌍 `common/` - Shared/Global Resources

Contains reusable components, utilities, and contexts used across the entire application.

```
common/
├── component/          # Global UI components
│   ├── GeminiIcon.tsx
│   ├── MainFooter.tsx
│   ├── MainNavigationMenu.tsx
│   ├── ScrollToTop.tsx
│   ├── SocialMediaIcon.tsx
│   └── TmaLogo.tsx
├── const/              # Global constants
│   └── appConst.ts
├── context/            # Global context providers
│   └── AuthContext.tsx
├── hook/               # Custom React hooks
│   └── useScrollControl.ts
├── lib/                # Utility libraries
│   └── axios.ts        # Axios instance configuration
└── util/               # Helper functions
    ├── common.ts
    ├── jwtUtil.ts
    └── localStorageUtil.ts
```

**Use this folder for:**
- Navigation components
- Authentication context
- Shared utilities (JWT, localStorage helpers)
- Global constants
- Reusable custom hooks

### 📦 `feature/` - Feature-Based Modules

Organized by feature with all related code (components, services, types) grouped together. Each feature is independent and self-contained.

```
feature/
├── auth/                   # Authentication feature
│   ├── component/          # Auth-specific components
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── VerifyOtpForm.tsx
│   ├── const/              # Auth constants
│   │   └── authConst.ts
│   ├── helper/             # Auth utilities
│   │   └── authHelper.ts
│   ├── hook/               # Auth-specific hooks
│   │   ├── useAuthMutation.ts
│   │   └── useOtpMutation.ts
│   ├── page/               # Auth pages (routable)
│   │   └── LoginPage.tsx
│   ├── service/            # API service
│   │   └── authService.ts
│   └── type/               # TypeScript types
│       ├── authEnum.ts
│       └── authServiceType.ts
│
├── history/                # Test history/results feature
│   ├── component/
│   ├── const/
│   ├── context/
│   ├── helper/
│   ├── hook/
│   ├── loading/             # Loading skeletons
│   ├── page/
│   ├── service/
│   └── type/
│
├── landing/                # Landing page feature
│   ├── component/
│   ├── const/
│   └── page/
│
└── test/                   # Test practice/exam feature
    ├── component/
    │   ├── AllTestsSection.tsx
    │   ├── Audio.tsx        # Audio player with position tracking
    │   ├── CountdownTimer.tsx
    │   ├── ExplainationCard.tsx
    │   ├── GeminiAssistCard.tsx
    │   ├── SubmitTestButton.tsx
    │   └── ... (more components)
    ├── const/
    │   └── testConst.ts
    ├── context/
    │   └── TestContext.tsx  # Test state management
    ├── helper/
    │   └── testHelper.ts    # Duration & audio position persistence
    ├── hook/
    ├── loading/
    ├── page/
    ├── service/
    └── type/
```

**Feature Structure Pattern:**
- `component/` - Feature-specific UI components
- `page/` - Full page components (connected to routes)
- `service/` - API calls & external data fetching
- `context/` - Feature-specific state management
- `hook/` - Feature-specific custom hooks
- `type/` - TypeScript interfaces & types
- `const/` - Feature constants
- `helper/` - Utility functions
- `loading/` - Skeleton/loading components

### 🛣️ `routes/` - File-Based Routes (TanStack Router)

File-based routing following [TanStack Router conventions](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing).

```
routes/
├── __root.tsx              # Root layout
├── index.tsx               # Home route (/)
├── (auth)/                 # Route group: /auth routes
│   ├── login.tsx           # /login
│   └── password/
│       ├── forgot.tsx      # /password/forgot
│       ├── reset.tsx       # /password/reset
│       └── verify.tsx      # /password/verify
├── _protected/             # Protected route group (requires auth)
│   ├── _protected.tsx      # Middleware/layout for protected routes
│   ├── history/
│   │   ├── index.tsx       # /history
│   │   └── $historyId/     # /history/:historyId (dynamic)
│   │       ├── _layout.tsx # Layout for history detail
│   │       ├── index.tsx   # /history/:historyId
│   │       └── solution.tsx # /history/:historyId/solution
│   └── test/
│       ├── index.tsx       # /test
│       └── $testId/        # /test/:testId (dynamic)
│           ├── _layout.tsx # Layout for test detail
│           ├── index.tsx   # /test/:testId
│           └── practice.tsx # /test/:testId/practice
```

**TanStack Router File Conventions:**
- `index.tsx` - Default route segment
- `_layout.tsx` - Layout component (no URL segment)
- `_protected.tsx` - Layout/middleware (no URL segment)
- `(name)/` - Route groups (no URL segment)
- `$param/` - Dynamic route parameters
- `__root.tsx` - Root layout

### 🎨 `shadcn/` - Shadcn UI Components

Pre-built, customizable UI components from [Shadcn UI](https://ui.shadcn.com/).

```
shadcn/
├── component/
│   └── ui/                 # Shadcn components
│       ├── button/
│       ├── card/
│       ├── dialog/
│       ├── alert-dialog/
│       ├── badge/
│       ├── progress/
│       ├── input/
│       ├── select/
│       ├── checkbox/
│       ├── radio-group/
│       ├── tabs/
│       ├── scroll-area/
│       ├── separator/
│       ├── tooltip/
│       ├── avatar/
│       ├── navigation-menu/
│       ├── slider/
│       ├── label/
│       └── dropdown-menu/
└── lib/
    └── util.ts            # Utility functions (e.g., cn for class merging)
```

**Installation:**
```bash
npx shadcn-ui@latest add [component-name]
```
**Find components on:** [Shadcn UI component page](https://ui.shadcn.com/docs/components)


**Note:** If the CLI is blocked by your company proxy, components can be manually added. See the [Shadcn UI component page](https://ui.shadcn.com/docs/components) for manual installation instructions.

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd toeic-react-ts-vite
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Lint code
npm run lint
```

### Adding New Features

1. Create a new folder in `src/feature/[feature-name]/`
2. Follow the folder structure:
```
feature/[feature-name]/
├── component/
├── page/
├── service/
├── context/
├── hook/
├── type/
├── const/
└── helper/
```

3. Create route files in `src/routes/` following TanStack Router conventions

### Adding New Shadcn Components

**Option 1: Using CLI (Recommended)**
```bash
npx shadcn-ui@latest add [component-name]
```

Components will be added to `src/shadcn/component/ui/`

**Option 2: Manual Installation**
If the CLI is blocked by your company proxy, you can manually add components. Detailed instructions are available on the [Shadcn UI component documentation page](https://ui.shadcn.com/docs/components).

## Building

### Production Build

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Previewing Production Build

```bash
npm run preview
```

## Key Features

### 1. **Test Practice & Exam Mode**
- Located in `feature/test/`
- Real-time progress tracking
- Audio playback with position memory
- Test state management via TestContext

### 2. **Authentication**
- Located in `feature/auth/`
- Login, registration, password reset
- OTP verification
- JWT token management in `common/util/jwtUtil.ts`

### 3. **Test History & Results**
- Located in `feature/history/`
- View past test results
- Detailed solution reviews
- Performance analytics per part

### 4. **Persistence Layer**
- **Local Storage Management**: `common/util/localStorageUtil.ts`
- **Audio Position Memory**: Saves playback position per part
- **Practice Duration**: Auto-saves elapsed time
- Helpers in `feature/test/helper/testHelper.ts`

### 5. **State Management**
- **Global Auth**: `common/context/AuthContext.tsx`
- **Test State**: `feature/test/context/TestContext.tsx`
- **Solution State**: `feature/history/context/SolutionContext.tsx`
- **Server State**: TanStack Query for API caching

## Architecture

### Data Flow

```
Routes (TanStack Router)
    ↓
Feature Pages
    ↓
Feature Components
    ↓
Context (Local State) / TanStack Query (Server State)
    ↓
Services (API Calls)
    ↓
Backend API
```

### State Management Strategy

| State Type    | Location                         | Tool                       | Use Case               |
| ------------- | -------------------------------- | -------------------------- | ---------------------- |
| Global Auth   | `common/context/AuthContext.tsx` | React Context              | User session           |
| Feature State | `feature/*/context/`             | React Context + useReducer | Feature-specific state |
| Server State  | Entire app                       | TanStack Query             | API data caching       |
| Form State    | Components                       | React Hook Form            | Form handling          |

### Component Hierarchy

```
<RootLayout> (__root.tsx)
├── <AuthGroup> ((auth)/)
│   ├── <LoginPage> (login.tsx)
│   └── <PasswordGroup> (password/)
├── <ProtectedGroup> (_protected/)
│   ├── <TestGroup> (test/)
│   │   ├── <TestPage> (test/index.tsx)
│   │   └── <TestDetailLayout> (test/$testId/_layout.tsx)
│   │       ├── <TestPracticePage> (test/$testId/practice.tsx)
│   │       └── <TestIndexPage> (test/$testId/index.tsx)
│   └── <HistoryGroup> (history/)
│       ├── <HistoryPage> (history/index.tsx)
│       └── <HistoryDetailLayout> (history/$historyId/_layout.tsx)
│           ├── <ResultPage> (history/$historyId/index.tsx)
│           └── <SolutionPage> (history/$historyId/solution.tsx)
└── <LandingPage> (index.tsx)
```

## Common Patterns

### Feature Service Pattern
```typescript
// feature/[name]/service/[name]Service.ts
export const [name]Service = {
  getList: async () => { /* API call */ },
  getDetail: async (id) => { /* API call */ },
  create: async (data) => { /* API call */ },
};
```

### Feature Mutation Pattern
```typescript
// feature/[name]/hook/useCreate[Name]Mutation.ts
export const useCreate[Name]Mutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: [name]Service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['[name]List'] });
    },
  });
};
```

### Feature Context Pattern
```typescript
// feature/[name]/context/[Name]Context.tsx
type [Name]State = { /* state */ };
type [Name]ContextType = [Name]State & { /* actions */ };
export const [Name]Provider = ({ children, initialState }) => { /* ... */ };
export const use[Name]Context = () => { /* ... */ };
```

## Best Practices

1. **Keep features independent** - Avoid cross-feature imports
2. **Use proper typing** - All types in `type/` folder
3. **Centralize API calls** - Use `service/` folder
4. **Reuse with context** - Feature-specific state in `context/`
5. **Local storage helpers** - Use utility functions from `common/util/`
6. **Component composition** - Build complex UIs from smaller components
7. **Error handling** - Use try-catch in async operations
8. **Cache invalidation** - Use TanStack Query for server state

## Contributing

When adding new features:
1. Create feature folder with proper structure
2. Add route files in `routes/`
3. Use TypeScript for type safety
4. Follow naming conventions
5. Add proper error handling
6. Update this documentation

## TanStack Documentation

### TanStack Router
Essential documentation for understanding file-based routing and navigation:

- **[Router Overview](https://tanstack.com/router/latest/docs/framework/react/overview)** - Start here to understand TanStack Router fundamentals
- **[File-Based Routing Guide](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)** - Learn about the routing conventions used in this project

### TanStack Query
Complete guides for server state management and data fetching:

**Overview & Fundamentals:**
- **[Query Overview](https://tanstack.com/query/latest/docs/framework/react/overview)** - Introduction to TanStack Query

**Queries (Data Fetching):**
- **[Queries Guide](https://tanstack.com/query/latest/docs/framework/react/guides/queries)** - How to fetch and cache data
- **[Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)** - Best practices for structuring query keys
- **[Query Functions](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)** - How to define query functions
- **[Query Options](https://tanstack.com/query/latest/docs/framework/react/guides/query-options)** - Configuration options for queries

**Mutations (Data Updates):**
- **[Mutations Guide](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)** - How to handle data mutations
- **[Mutation Options](https://tanstack.com/query/v5/docs/framework/react/reference/mutationOptions)** - Configuration reference for mutations

## Learn More

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Documentation](https://react.dev)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)