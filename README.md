# ABP React

This project can be used as a drop-in replacement for the Angular UI of the ABP Framework.

## Demo

You can see a demo of the app [here](https://abpreact.antosubash.com/)

## Getting Started

### Documentation

You can find the documentation [here](https://antosubash.github.io/AbpReact/)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.js.org/en/installation)
- [ABP Framework](https://abp.io/)
- [.Net 7](https://dotnet.microsoft.com/download/dotnet/7.0)

### Installing Template

Install the ABP React .Net Template

```bash
dotnet new install Anto.Abp.React.Template
```

### Creating a new project

Create a new project using the template

```bash
dotnet new abp-react -o my-project-name --apiUrl abp.antosubash.com
```

> Note: You can use any name for the project. I used `my-project-name` for this example. keep in mind that the project name should be in kebab case (all lowercase and words separated by hyphens) because it will be used as the name of the packages org name.

### Update the Environment Variables

I have added the sample environment variables in the `.env.sample` file. You can update the values according to your project.

### Running the project

```bash
cd my-project-name
pnpm install
pnpm dev
```

## What is this?

This is a React UI for the [ABP Framework](https://abp.io/). We are working on a beta release and it is officially not ready for production, However, you can use it with your own risk. It uses [AbpTemplate](https://github.com/antosubash/AbpTemplate) as the backend. It is built using [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Why Use ABP React?

The main reason is React and Next.js. In the modern web you need a framework which can build a fast and SEO friendly website. React and Next.js are the best options for that. You can build a static, SSR and CSR website with Next.js. It is also very easy to integrate with ABP Framework.

## LightHouse Score

![Lighthouse Score](/images/lighthosescore.png)

The score is for the landing page. other pages are not yet checked for with lighthouse. you can check the score for the landing page [here](https://pagespeed.web.dev/report?url=https%3A%2F%2Fabpreact.antosubash.com%2F&form_factor=desktop).

## Goals

The goal of this project is to provide a React UI for the ABP Framework. It will be a fully functional UI that can be used as a starting point for any ABP project. It will also be a reference for anyone who wants to build a React UI for ABP. We will try to implement all the features of the ABP Framework Open Source Application.

## Features

- [x] Landing Page
- [x] Login, Logout, Register, Forgot Password
- [x] Multilingual
- [x] Theme Switcher
- [x] Profile
- [x] Tenant Management
- [x] Role Management
- [x] User Management
- [x] Settings Management
- [x] Feature Management

## Roadmap

Most of the features are implemented. We are planning to keep it similar to the ABP Framework Open Source Application. That means all the commercial features will not be implemented.

## Support

If want to build your project with ABP React and need support, you can contact me at [antosubash@outlook.com](mailto:antosubash@outlook.com)

## How to run

1. Clone the repo
2. cd into the src folder
3. Run `pnpm install`
4. Run `pnpm dev`

## How to contribute

1. Fork the repo
2. Create a branch for your feature
3. Make your changes
4. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [ABP Framework](https://abp.io/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contributors

- [Anto Subash](https://github.com/antosubash)
- [Sajan](https://github.com/sajanv88)
