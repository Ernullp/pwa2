# DermaRokh - Iranian E-commerce Platform

## Overview

DermaRokh (درمارُخ) is an e-commerce platform for beauty and personal care products targeting Iranian users aged 18-45. The platform features a bilingual (Persian/Farsi and English) interface with RTL (right-to-left) support, offering cosmetics, skincare, haircare, fragrances, and personal care products.

**Tagline:** "زیبایی طبیعی، فناوری پیشرفته" (Natural Beauty, Advanced Technology)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management
- Zustand with persistence for client state management
- Tailwind CSS for styling with shadcn/ui component library

**UI Framework:**
- Custom design system based on shadcn/ui (New York style variant)
- Radix UI primitives for accessible components
- RTL-first design with Persian (Vazirmatn) and English (Open Sans, Poppins) typography
- Dark mode support with theme toggle functionality

**State Management Strategy:**
- **Server State:** TanStack Query manages API data fetching, caching, and synchronization
- **Client State:** Zustand stores handle cart, wishlist, filters, search, and theme preferences
- **Persistence:** LocalStorage integration for cart, wishlist, and theme via zustand/persist middleware

**Key Design Patterns:**
- Component-based architecture with reusable UI components in `/client/src/components`
- Custom hooks for mobile detection and toast notifications
- Utility-first CSS with Tailwind
- Type-safe API integration using shared TypeScript schemas

**Routing Structure:**
- `/` - Homepage with hero banner, categories, best sellers, brands, and testimonials
- `/products` - All products with filtering and sorting
- `/category/:slug` - Category-specific product listings
- `/product/:slug` - Product detail page with reviews and related products
- `/cart` - Shopping cart with discount code support
- `/wishlist` - Saved products
- `/account` - User account management
- `/search` - Product search results
- Fallback 404 page for unmatched routes

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js
- TypeScript for type safety
- Drizzle ORM for database operations
- Neon serverless PostgreSQL database

**API Design:**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Middleware for logging, body parsing, and error handling
- Raw body capture for webhook support (e.g., payment processors)

**Server Structure:**
- `/server/index.ts` - Main Express application setup
- `/server/routes.ts` - API route definitions
- `/server/static.ts` - Static file serving for production builds
- `/server/vite.ts` - Vite middleware integration for development
- `/server/storage.ts` - Database abstraction layer (implied)

**Build Process:**
- Development: tsx with hot reload
- Production: esbuild bundles server code with selective dependency bundling
- Client build via Vite produces static assets in `/dist/public`
- Allowlist strategy bundles frequently-used dependencies to reduce syscalls and improve cold start times

**Key Features:**
- Request/response logging with timing information
- Development tools (Replit cartographer and dev banner) excluded in production
- HTTP server creation for potential WebSocket support
- Session management preparation (connect-pg-simple dependency)

### Database Architecture

**ORM Choice:** Drizzle ORM provides type-safe database queries with minimal overhead

**Schema Design (PostgreSQL):**

**Core Tables:**
- `categories` - Product categories with Persian/English names, slugs, icons, and product counts
- `brands` - Brand information with logos and descriptions
- `products` - Main product catalog with bilingual content, pricing, images array, stock status, and metadata (ingredients, usage instructions, benefits)
- Reviews system (implied by Review type usage)

**Key Fields:**
- Bilingual support: `name` (Persian) and `nameEn` (English) fields
- SEO-friendly `slug` fields with unique constraints
- Pricing: `price`, `originalPrice`, and calculated `discountPercent`
- Image management: Array type for multiple product images
- Rich text content: `description`, `ingredients`, `howToUse`, `benefits`

**Design Decisions:**
- Schema-first approach using `drizzle-zod` for validation
- Shared schema types between client and server (`/shared/schema.ts`)
- UUID-based IDs using varchar type
- Real type for monetary values (price fields)

### External Dependencies

**Database:**
- Neon Serverless PostgreSQL via `@neondatabase/serverless`
- Connection via `DATABASE_URL` environment variable
- Drizzle ORM v0.39+ for database operations
- Drizzle Kit for migrations (output: `/migrations`)

**UI Libraries:**
- Radix UI components (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, label, popover, select, separator, slider, switch, tabs, toast, tooltip, etc.)
- Embla Carousel for product image galleries
- Lucide React for icons
- cmdk for command palette functionality

**Form Handling:**
- React Hook Form via `@hookform/resolvers`
- Zod for schema validation
- Integration with shadcn/ui form components

**Styling:**
- Tailwind CSS with PostCSS
- class-variance-authority for component variants
- clsx and tailwind-merge for conditional classes

**Development Tools:**
- Replit-specific plugins (vite-plugin-runtime-error-modal, cartographer, dev-banner)
- TypeScript strict mode with path aliases (`@/*`, `@shared/*`, `@assets/*`)

**Potential Future Integrations:**
- Session management (connect-pg-simple, express-session, memorystore)
- Authentication (passport, passport-local, jsonwebtoken)
- File uploads (multer)
- Email (nodemailer)
- Payment processing (stripe)
- AI features (@google/generative-ai, openai)
- WebSocket support (ws)
- Rate limiting (express-rate-limit)

**Brand Color System:**
- Primary: #D4A5B8 (Soft pink)
- Secondary: #5FB9B9 (Light turquoise)
- Accent: #F39C12 (Warm orange for CTAs)
- Dark Neutral: #2C3E50
- Light Neutral: #ECF0F1
- Success: #27AE60
- Warning: #E74C3C