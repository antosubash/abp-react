---
sidebar_position: 1
---

# Introduction

Welcome to ABP React - A modern React-based frontend solution for ABP Framework applications. This documentation will guide you through setting up and developing your application.

## Overview

ABP React provides a robust foundation for building modern web applications using React and ABP Framework. It combines the power of React's component-based architecture with ABP's enterprise-grade features.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [pnpm](https://pnpm.js.org/en/installation) (Fast, disk space efficient package manager)
- [ABP Framework](https://abp.io/) (Latest version)
- [.NET 8](https://dotnet.microsoft.com/download/dotnet/8.0) (SDK)

### Installation Steps

1. **Install the ABP React Template**

```bash
dotnet new install Anto.Abp.React.Template
```

2. **Create a New Project**

```bash
dotnet new abp-react -o my-project-name --apiUrl abp.antosubash.com
```

> **Note**: The project name should be in kebab-case format (all lowercase with words separated by hyphens) as it will be used for package organization.

3. **Install Dependencies**

```bash
cd my-project-name
pnpm install
```

4. **Configure Environment Variables**

Copy the `.env.sample` file to `.env` and update the values according to your project requirements:

```bash
cp .env.sample .env
```

5. **Start Development Server**

```bash
pnpm dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

The template provides a well-organized project structure:

- `/src` - Contains all React source code
- `/public` - Static assets
- `/docs` - Documentation files
- `/scripts` - Build and utility scripts

## Next Steps

- Explore the [Components](/docs/components) section to learn about available UI components
- Check out the [Authentication](/docs/authentication) guide for setting up user authentication
- Review the [API Integration](/docs/api) documentation for backend communication

## Support

If you encounter any issues or have questions:

- Check the [GitHub Issues](https://github.com/your-repo/issues)
- Join our [Discord Community](https://discord.gg/your-server)
- Review the [FAQ](/docs/faq) section

## Contributing

We welcome contributions! Please see our [Contributing Guide](/docs/contributing) for details on how to get involved.
