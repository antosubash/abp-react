# Gemini Guidelines for AbpReact

This document provides guidelines for Gemini to follow when working with the AbpReact project.

## Project Overview

AbpReact is a project template for creating web applications with ASP.NET Core and React. It uses the ABP Framework on the backend and Next.js for the frontend. It serves as a drop-in replacement for the default Angular UI, offering improved performance, better SEO capabilities, and a more modern development experience with advanced features like visual page building and component documentation.

## Development Environment

-   **Backend:** .NET 8, ABP Framework
-   **Frontend:** Node.js, pnpm, Next.js 15, React, TypeScript, Tailwind CSS v4
-   **Component Primitives:** Radix UI
-   **Data Fetching:** TanStack Query
-   **Form Management:** React Hook Form, Zod
-   **Component Documentation:** Storybook
-   **Testing:** Vitest
-   **Code Quality:** ESLint, Prettier, Husky

## Getting Started

To run the project:

1.  Navigate to the `src` directory.
2.  Install dependencies: `pnpm install`
3.  Start the development server: `pnpm dev`

## Testing

-   Run unit tests with `pnpm test` in the `src` directory.
-   Run Storybook with `pnpm storybook` in the `src` directory.
-   Run Storybook tests with `pnpm test-storybook` in the `src` directory.

## Coding Style

-   Follow the existing coding style.
-   Use Prettier for code formatting (`pnpm format`).
-   Use ESLint for linting (`pnpm lint`).

## Commits

-   Follow the Conventional Commits specification.

## Available Scripts

Located in `src/package.json`:

-   `pnpm dev`: Start development server
-   `pnpm build`: Build for production
-   `pnpm start`: Start production server
-   `pnpm lint`: Run ESLint
-   `pnpm format`: Format code with Prettier
-   `pnpm storybook`: Start Storybook
-   `pnpm build-storybook`: Build Storybook
-   `pnpm gen-api`: Generate API client from OpenAPI spec
