# ABP React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white)](https://storybook.js.org/)

A modern, high-performance React UI implementation for the [ABP Framework](https://abp.io/). This project serves as a drop-in replacement for the default Angular UI, offering improved performance, better SEO capabilities, and a more modern development experience with advanced features like visual page building and component documentation.

## 📋 Table of Contents

- [ABP React](#abp-react)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Demo](#-demo)
  - [✨ Features](#-features)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the Project](#running-the-project)
  - [📚 Project Overview](#-project-overview)
  - [🎨 Visual Page Builder](#-visual-page-builder)
    - [Available Components](#available-components)
  - [📖 Storybook](#-storybook)
    - [CI/CD Integration](#cicd-integration)
      - [CI Workflow Features:](#ci-workflow-features)
      - [Accessing Storybook:](#accessing-storybook)
  - [🐳 Docker Support](#-docker-support)
    - [Main Application](#main-application)
    - [Storybook](#storybook)
  - [📊 Performance](#-performance)
  - [🤝 Contributing](#-contributing)
    - [Development Scripts](#development-scripts)
  - [💬 Support](#-support)
  - [📄 License](#-license)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [👥 Contributors](#-contributors)

## 🚀 Demo

Check out the live demo at [https://abpreact.antosubash.com/](https://abpreact.antosubash.com/)

## ✨ Features

- 🎨 **Modern UI/UX**
  - Responsive design with Tailwind CSS v4
  - Dark/Light theme support
  - Modern component library with Radix UI
  - Beautiful animations and transitions

- 🔐 **Authentication & Authorization**
  - Login/Logout functionality
  - User registration
  - Password recovery
  - Role-based access control
  - OpenID Connect support

- 🌐 **Multi-tenant Support**
  - Tenant management
  - Tenant switching
  - Tenant-specific configurations

- 👥 **User Management**
  - User CRUD operations
  - Role management
  - Permission management
  - Profile management

- 📝 **Content Management System (CMS)**
  - Visual page builder with Puck editor
  - Drag-and-drop interface
  - Rich text editing
  - Component library
  - Page templates and layouts

- ⚙️ **System Features**
  - Multilingual support
  - Theme customization
  - Settings management
  - Feature management
  - Email configuration

- 🧪 **Development Tools**
  - Storybook for component documentation
  - TypeScript for type safety
  - ESLint and Prettier for code quality
  - Husky for git hooks
  - Vitest for testing

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [pnpm](https://pnpm.js.org/en/installation) (Package manager)
- [.NET 8](https://dotnet.microsoft.com/download/dotnet/8.0) (Backend framework)
- [ABP Framework](https://abp.io/) (Backend framework)

### Installation

1. Install the ABP React .NET Template:

```bash
dotnet new install Anto.Abp.React.Template
```

2. Create a new project:

```bash
dotnet new abp-react -o my-project-name --apiUrl your-api-url
```

> **Note**: Use kebab-case for project names (e.g., `my-project-name`) as it will be used for package organization.

### Configuration

1. Copy the environment variables:

```bash
cp .env.sample .env
```

2. Update the `.env` file with your project-specific values:

- API URL
- Authentication settings
- Other configuration options

### Running the Project

1. Navigate to your project directory:

```bash
cd my-project-name
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. (Optional) Start Storybook for component development:

```bash
pnpm storybook
```

## 📚 Project Overview

ABP React is built with modern web technologies:

- [Next.js 15](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
- [React Hook Form](https://react-hook-form.com/) - Form management
- [Zod](https://zod.dev/) - Schema validation

The project aims to provide a production-ready React UI for ABP Framework applications, focusing on:

- Performance optimization
- SEO friendliness
- Modern development experience
- Full ABP Framework integration
- Visual content creation

## 🎨 Visual Page Builder

ABP React includes a powerful visual page builder powered by [Puck](https://measured.co/puck):

- **Drag-and-Drop Interface**: Create pages visually without coding
- **Component Library**: Pre-built components for common UI patterns
- **Responsive Design**: Built-in responsive design tools
- **Real-time Preview**: See changes instantly as you build
- **Template System**: Save and reuse page layouts

### Available Components

- Hero sections
- Text blocks and headings
- Image galleries and carousels
- Cards and containers
- Buttons and forms
- Grid layouts and spacers
- And many more...

## 📖 Storybook

The project includes comprehensive component documentation with Storybook:

```bash
# Start Storybook development server
pnpm storybook

# Build Storybook for production
pnpm build-storybook

# Run Storybook tests
pnpm test-storybook
```

Storybook provides:
- Interactive component documentation
- Component testing and validation
- Design system guidelines
- Accessibility testing
- Visual regression testing

### CI/CD Integration

Storybook is fully integrated into the CI/CD pipeline:

- **Automatic Building**: Storybook is built on every push to main and pull request
- **Testing**: Storybook tests run automatically to ensure component quality
- **Docker Deployment**: Storybook is containerized and deployed to GitHub Container Registry
- **Artifact Storage**: Storybook build artifacts are stored for 30 days

#### CI Workflow Features:

1. **Storybook Build Job**: Builds and tests Storybook on every change
2. **Docker Image**: Creates and pushes Storybook Docker image to GHCR

#### Accessing Storybook:

- **Development**: [https://abp-react-storybook.antosubash.com](https://abp-react-storybook.antosubash.com)
- **Docker**: `http://localhost:80` (run `docker run -p 80:80 ghcr.io/your-repo/storybook:latest`)
- **CI Artifacts**: Download Storybook build artifacts from GitHub Actions

## 🐳 Docker Support

ABP React includes Docker support for easy deployment:

### Main Application

```bash
# Build the application
docker build -t abp-react .

# Run the application
docker run -p 3000:3000 abp-react
```

### Storybook

```bash
# Build Storybook
docker build -f Dockerfile.storybook -t abp-react-storybook .

# Run Storybook
docker run -p 80:80 abp-react-storybook
```

The Docker setup includes:
- Multi-stage builds for optimization
- Nginx configuration for production
- Security headers and caching
- Non-root user execution

## 📊 Performance

![Lighthouse Score](/images/lighthosescore.png)

The project maintains high performance scores across all Lighthouse metrics. View the detailed report [here](https://pagespeed.web.dev/report?url=https%3A%2F%2Fabpreact.antosubash.com%2F&form_factor=desktop).

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code:

- Follows the existing code style
- Includes appropriate tests
- Updates documentation as needed
- Passes all CI checks

### Development Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Storybook
pnpm storybook        # Start Storybook
pnpm build-storybook  # Build Storybook
pnpm test-storybook   # Test Storybook

# API Generation
pnpm gen-api          # Generate API client from OpenAPI spec
```

## 💬 Support

For support, please:

- Open an issue in the GitHub repository
- Contact [antosubash@outlook.com](mailto:antosubash@outlook.com)
- Join our community discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to:

- [ABP Framework](https://abp.io/) - The foundation of this project
- [React](https://reactjs.org/) - The UI library
- [Next.js](https://nextjs.org/) - The framework
- [TypeScript](https://www.typescriptlang.org/) - The language
- [Tailwind CSS](https://tailwindcss.com/) - The styling
- [Puck](https://measured.co/puck) - The visual page builder
- [Storybook](https://storybook.js.org/) - The component documentation

## 👥 Contributors

- [Anto Subash](https://github.com/antosubash) - Project Maintainer
- [Sajan](https://github.com/sajanv88) - Contributor
