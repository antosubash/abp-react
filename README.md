# ABP React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, high-performance React UI implementation for the [ABP Framework](https://abp.io/). This project serves as a drop-in replacement for the default Angular UI, offering improved performance, better SEO capabilities, and a more modern development experience.

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
  - [📊 Performance](#-performance)
  - [🤝 Contributing](#-contributing)
  - [💬 Support](#-support)
  - [📄 License](#-license)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [👥 Contributors](#-contributors)

## 🚀 Demo

Check out the live demo at [https://abpreact.antosubash.com/](https://abpreact.antosubash.com/)

## ✨ Features

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark/Light theme support
  - Tailwind CSS styling

- 🔐 **Authentication & Authorization**
  - Login/Logout functionality
  - User registration
  - Password recovery
  - Role-based access control

- 🌐 **Multi-tenant Support**
  - Tenant management
  - Tenant switching
  - Tenant-specific configurations

- 👥 **User Management**
  - User CRUD operations
  - Role management
  - Permission management
  - Profile management

- ⚙️ **System Features**
  - Multilingual support
  - Theme customization
  - Settings management
  - Feature management

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

## 📚 Project Overview

ABP React is built with modern web technologies:

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

The project aims to provide a production-ready React UI for ABP Framework applications, focusing on:

- Performance optimization
- SEO friendliness
- Modern development experience
- Full ABP Framework integration

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

## 👥 Contributors

- [Anto Subash](https://github.com/antosubash) - Project Maintainer
- [Sajan](https://github.com/sajanv88) - Contributor
