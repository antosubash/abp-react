---
sidebar_position: 1
---

# Introduction

Lets see how to get started with ABP React.

## Getting Started

Get started by **creating a new application**.

### What you'll need

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.js.org/en/installation)
- [ABP Framework](https://abp.io/)
- [.Net 8](https://dotnet.microsoft.com/download/dotnet/8.0)

## Generate a new application

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

### Install the dependencies

```bash
cd my-project-name
pnpm install
```

### Update the Environment Variables

I have added the sample environment variables in the `.env.sample` file. You can update the values according to your project.

### Running the project

```bash
pnpm dev
```

Now you can open the app in your browser by visiting [http://localhost:3000](http://localhost:3000)
