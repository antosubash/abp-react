import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    // Removed deprecated addon configurations
    // Controls are now built into Storybook 9
    // Viewport, backgrounds, measure, and outline addons are deprecated
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
      },
    },
    docs: {
      toc: true,
    },
    // Note: Default story is set via URL parameter when starting Storybook
    // Use: npm run storybook -- --initial-story=introduction-welcome--welcome
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
}

export default preview
