# Package Details

This document explains each package used in this portfolio project and its purpose.

## Main Dependencies

### Core Framework & Runtime
- **next** (15.2.4) - The React framework for production applications, providing server-side rendering, routing, and optimization features
- **react** (^19) - JavaScript library for building user interfaces with component-based architecture
- **react-dom** (^19) - Provides DOM-specific methods for React components

### UI Component Libraries (Radix UI)
- **@radix-ui/react-accordion** (1.2.2) - Accessible accordion component for collapsible content sections
- **@radix-ui/react-alert-dialog** (1.1.4) - Modal dialog component for alerts and confirmations
- **@radix-ui/react-aspect-ratio** (1.1.1) - Component for maintaining consistent aspect ratios
- **@radix-ui/react-avatar** (1.1.2) - Avatar component for displaying user profile images
- **@radix-ui/react-checkbox** (1.1.3) - Accessible checkbox input component
- **@radix-ui/react-collapsible** (1.1.2) - Component for creating collapsible content areas
- **@radix-ui/react-context-menu** (2.2.4) - Right-click context menu component
- **@radix-ui/react-dialog** (1.1.4) - Modal dialog component for overlays and popups
- **@radix-ui/react-dropdown-menu** (2.1.4) - Dropdown menu component for navigation and actions
- **@radix-ui/react-hover-card** (1.1.4) - Card component that appears on hover
- **@radix-ui/react-label** (2.1.1) - Accessible label component for form inputs
- **@radix-ui/react-menubar** (1.1.4) - Horizontal menu bar component
- **@radix-ui/react-navigation-menu** (1.2.3) - Complex navigation menu with submenus
- **@radix-ui/react-popover** (1.1.4) - Floating content component positioned relative to triggers
- **@radix-ui/react-progress** (1.1.1) - Progress bar component for showing completion status
- **@radix-ui/react-radio-group** (1.2.2) - Group of radio button inputs
- **@radix-ui/react-scroll-area** (1.2.2) - Custom scrollbar component with better styling control
- **@radix-ui/react-select** (2.1.4) - Accessible select dropdown component
- **@radix-ui/react-separator** (1.1.1) - Visual separator line component
- **@radix-ui/react-slider** (1.2.2) - Range slider input component
- **@radix-ui/react-slot** (1.1.1) - Utility for merging props and refs in compound components
- **@radix-ui/react-switch** (1.1.2) - Toggle switch component
- **@radix-ui/react-tabs** (1.1.2) - Tab navigation component for organizing content
- **@radix-ui/react-toast** (1.2.4) - Notification toast component
- **@radix-ui/react-toggle** (1.1.1) - Toggle button component
- **@radix-ui/react-toggle-group** (1.1.1) - Group of toggle buttons
- **@radix-ui/react-tooltip** (1.1.6) - Tooltip component for displaying helpful information on hover

### Styling & CSS
- **tailwindcss** (^3.4.17) - Utility-first CSS framework for rapid UI development
- **tailwind-merge** (^2.5.5) - Utility for merging Tailwind CSS classes intelligently
- **tailwindcss-animate** (^1.0.7) - Animation utilities for Tailwind CSS
- **autoprefixer** (^10.4.20) - PostCSS plugin to add vendor prefixes to CSS
- **postcss** (^8) - CSS transformation tool
- **clsx** (^2.1.1) - Utility for constructing className strings conditionally
- **class-variance-authority** (^0.7.1) - Library for creating variant-based component APIs

### Icons & Animations
- **lucide-react** (^0.454.0) - Beautiful and consistent icon library for React
- **framer-motion** (latest) - Production-ready motion library for React animations

### Theme & Dark Mode
- **next-themes** (^0.4.4) - Perfect dark mode support for Next.js applications

### Forms & Validation
- **react-hook-form** (^7.54.1) - Performant, flexible forms library with easy validation
- **@hookform/resolvers** (^3.9.1) - Validation resolvers for react-hook-form
- **zod** (^3.24.1) - TypeScript-first schema declaration and validation library

### UI Enhancements
- **cmdk** (1.0.4) - Command palette component for keyboard navigation
- **input-otp** (1.4.1) - One-time password input component
- **react-day-picker** (8.10.1) - Date picker component for React
- **date-fns** (4.1.0) - Modern JavaScript date utility library
- **embla-carousel-react** (8.5.1) - Carousel/slider component library
- **react-resizable-panels** (^2.1.7) - Resizable panel components for layouts
- **vaul** (^0.9.6) - Drawer component for mobile-friendly interfaces

### Charts & Data Visualization
- **recharts** (2.15.0) - Composable charting library built on React components

### Notifications
- **sonner** (^1.7.1) - Opinionated toast notification library

### Email Functionality
- **nodemailer** (^6.10.1) - Module for sending emails from Node.js applications (used in contact form)

### Development Enhancement
- **@emotion/is-prop-valid** (latest) - Utility to filter props for styled components

## Dev Dependencies

### TypeScript Support
- **typescript** (^5) - TypeScript language for type-safe JavaScript development
- **@types/node** (^22) - TypeScript definitions for Node.js
- **@types/react** (^19) - TypeScript definitions for React
- **@types/react-dom** (^19) - TypeScript definitions for React DOM

## Project Structure Benefits

This package selection provides:

1. **Accessibility**: Radix UI components ensure WCAG compliance
2. **Performance**: Next.js optimizations and efficient bundling
3. **Developer Experience**: TypeScript for type safety, Tailwind for rapid styling
4. **User Experience**: Smooth animations, responsive design, dark mode support
5. **Maintainability**: Well-structured component library with consistent APIs
6. **Functionality**: Complete form handling, email integration, and data visualization

## Usage Examples

- **Icons**: `lucide-react` provides icons like `<Mail />`, `<Github />`, `<ExternalLink />`
- **Animations**: `framer-motion` enables smooth page transitions and hover effects
- **Forms**: `react-hook-form` + `zod` for type-safe form validation
- **UI Components**: Radix UI components wrapped with Tailwind styling for consistent design
- **Theme**: `next-themes` for seamless dark/light mode switching
- **Notifications**: `sonner` for success/error messages after form submissions
