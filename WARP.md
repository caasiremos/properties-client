# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Property256 is a Vue.js 3 real estate application that provides a platform for property listings, agent management, and property transactions in Uganda. It's built with Vue 3, Vite, TailwindCSS, and uses a dual-layout architecture for guest and authenticated users.

## Common Development Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
```bash
# Copy environment file and configure
cp .env.example .env
# Edit .env to set VITE_BASE_URL
```

### Dependencies
```bash
# Install dependencies
npm install

# Add new dependency
npm install <package-name>

# Add development dependency
npm install --save-dev <package-name>
```

## Architecture Overview

### Core Stack
- **Framework**: Vue 3 with Composition API and `<script setup>` syntax
- **Build Tool**: Vite with manual chunking for vendor libraries
- **Styling**: TailwindCSS 4.0 with PostCSS
- **Router**: Vue Router 4 with history mode
- **HTTP Client**: Axios with custom interceptors and token management
- **State Management**: VueUse storage composables (no Vuex/Pinia)
- **UI Components**: Headless UI Vue + Heroicons
- **Notifications**: Vue Toastification

### Project Structure

#### Layouts System
The application uses a dual-layout architecture:
- **GuestLayout**: For public pages (home, buy, rent, sell, agents, news)
- **AgentLayout**: For authenticated agent dashboard with collapsible sidebar

#### Router Configuration
- **Guest routes**: Nested under root `/` with GuestLayout
- **Auth routes**: Standalone routes for login, register, password reset
- **Agent routes**: Nested under `/agent` with AgentLayout and auth protection
- **Route guards**: Automatic redirect based on authentication status using VueUse storage

#### Authentication Flow
- Token-based authentication using `ACCESS_TOKEN` in localStorage
- Axios interceptors handle automatic token injection and 401 responses
- VueUse `useStorage` composable manages token persistence
- Navigation guards redirect users based on authentication state

#### Component Organization
```
components/
├── agents/          # Agent-specific components
├── dashboard/       # Dashboard widgets and stats
├── filters/         # Property filtering components
├── home/           # Homepage sections (Hero, Featured, etc.)
├── layout/         # Global layout components (Header, Footer)
├── news/           # News and articles components
├── property/       # Property-related components
├── sell/           # Property selling forms
├── shared/         # Shared agent dashboard components
└── ui/             # Reusable UI components
```

#### Views Structure
```
views/
├── Agents/         # Agent dashboard pages
├── Home.vue        # Homepage with section components
├── Buy.vue         # Property buying page
├── Rent.vue        # Property rental page
├── Sell.vue        # Property selling page
├── News.vue        # News listing page
└── Auth pages      # Login, Register, Password reset
```

### Data Management
- **Static Data**: Located in `src/data/` (agents.js, articles.js, rentalProperties.js)
- **API Integration**: Centralized Axios instance in `src/libs/axios.js`
- **Environment Variables**: Vite environment variables with `VITE_` prefix
- **Local Storage**: VueUse storage composables for token and user data

### Styling Approach
- **TailwindCSS 4.0**: Latest version with PostCSS integration
- **Component-scoped styles**: Minimal custom CSS, primarily Tailwind utilities
- **Responsive Design**: Mobile-first approach with responsive navigation
- **Color Scheme**: Primary color system for branding consistency

### Build Configuration
- **Vite**: Modern build tool with HMR
- **Manual Chunking**: Vendor chunk separation (vue, vue-router, heroicons, headlessui)
- **Alias Configuration**: `@` alias points to `/src` directory
- **Asset Organization**: Static assets in `src/assets/`

## Development Guidelines

### Vue 3 Patterns
- Use Composition API with `<script setup>` syntax
- Leverage VueUse composables for common functionality
- Follow Vue 3 best practices for reactivity and lifecycle management

### Component Development
- Place reusable UI components in `src/components/ui/`
- Use Headless UI Vue for accessible interactive components
- Implement responsive designs using Tailwind's responsive utilities
- Use Heroicons for consistent iconography

### API Integration
- Use the centralized Axios instance from `src/libs/axios.js`
- Handle authentication tokens automatically through interceptors
- Implement proper error handling for API responses

### Routing
- Follow the nested routing pattern established in the router
- Use route meta fields for titles and authentication requirements
- Implement proper navigation guards for protected routes

### State Management
- Use VueUse storage composables for persistent state
- Leverage Vue 3's reactive system for component state
- Avoid prop drilling by using provide/inject when appropriate

### Environment Configuration
- Store API endpoints and configuration in environment variables
- Use the `VITE_` prefix for environment variables
- Copy and configure `.env.example` for local development

## Key Technical Considerations

### Authentication System
The authentication system uses token-based authentication with automatic token injection and refresh handling. The router guards automatically redirect users based on their authentication status.

### Mobile Responsiveness
The AgentLayout implements a responsive sidebar that collapses on mobile devices with overlay functionality. The layout automatically adapts to screen size changes.

### Asset Management
Vite handles asset optimization and bundling. The build configuration includes manual chunking for optimal loading performance of vendor libraries.

### Error Handling
Axios interceptors handle common HTTP errors, including automatic logout on 401 responses and token cleanup.