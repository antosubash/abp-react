# Storybook CI Setup Guide

This guide will help you set up the Storybook CI/CD pipeline for your project.

## Prerequisites

1. A GitHub repository with the ABP React template
2. Access to GitHub repository settings

## Setup Steps

### 1. Enable GitHub Actions

GitHub Actions should be enabled by default. If not:
1. Go to your repository settings
2. Navigate to "Actions" → "General"
3. Ensure "Allow all actions and reusable workflows" is selected

### 2. Verify CI Workflow

The Storybook CI workflow will automatically run when:
- You push to the `main` branch
- You create a pull request
- You modify files in the following paths:
  - `src/**/*.stories.@(js|jsx|ts|tsx)`
  - `src/**/*.mdx`
  - `src/.storybook/**`
  - `src/components/**`
  - `src/stories/**`

### 3. Test the Setup

1. **Create a test story**:
   ```bash
   # In the src directory
   pnpm storybook
   ```

2. **Make a small change to a story file** and push to trigger the CI

3. **Check the Actions tab** in your GitHub repository to see the workflow running

## CI Workflow Jobs

### Storybook Build Job
- **Trigger**: Every push and pull request
- **Purpose**: Builds and tests Storybook
- **Output**: Storybook static files as artifacts

### Storybook Docker
- **Trigger**: Only on pushes to main branch
- **Purpose**: Builds and pushes Docker image to GHCR
- **Output**: `ghcr.io/your-repo/storybook:latest`

## Troubleshooting

### Common Issues

1. **Workflow not triggering**:
   - Check that you're modifying files in the watched paths
   - Ensure GitHub Actions are enabled

2. **Docker build failures**:
   - Ensure your repository has access to GitHub Container Registry
   - Check that the `GITHUB_TOKEN` secret is available

3. **Storybook build failures**:
   - Run `pnpm build-storybook` locally to debug
   - Check for missing dependencies or configuration issues

### Getting Help

- Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
- Open an issue in the repository for CI-specific problems

## Next Steps

Once your CI is set up:

1. **Add more stories** to your components
2. **Set up branch protection** rules to require CI checks
3. **Customize the workflow** for your specific needs

## Advanced Configuration

### Customizing the Workflow

You can modify `.github/workflows/storybook.yml` to:
- Add additional testing steps
- Change the trigger conditions
- Add custom deployment targets
- Integrate with other CI tools

### Environment-Specific Settings

The workflow uses these environment variables:
- `NODE_VERSION`: Set to 22 (can be customized)
- `PNPM_VERSION`: Set to 9 (can be customized)

### Performance Optimization

The workflow includes:
- pnpm caching for faster installs
- Docker layer caching for faster builds
- Parallel job execution where possible 