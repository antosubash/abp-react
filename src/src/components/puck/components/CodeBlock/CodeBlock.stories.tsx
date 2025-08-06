import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from './CodeBlock'

const meta: Meta<typeof CodeBlock> = {
  title: 'Puck/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'github', 'vs-code'],
    },
    fontSize: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
    showLineNumbers: {
      control: { type: 'boolean' },
    },
    showCopyButton: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const JavaScript: Story = {
  args: {
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
    language: 'javascript',
    title: 'JavaScript Example',
    theme: 'vs-code',
    showLineNumbers: true,
    showCopyButton: true,
  },
}

export const Python: Story = {
  args: {
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))`,
    language: 'python',
    title: 'Python Example',
    theme: 'github',
    showLineNumbers: true,
    showCopyButton: true,
  },
}

export const HTML: Story = {
  args: {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a sample HTML page.</p>
</body>
</html>`,
    language: 'html',
    title: 'HTML Example',
    theme: 'light',
    showLineNumbers: false,
    showCopyButton: true,
  },
}

export const CSS: Story = {
  args: {
    code: `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}`,
    language: 'css',
    title: 'CSS Example',
    theme: 'dark',
    showLineNumbers: true,
    showCopyButton: true,
  },
}

export const JSON: Story = {
  args: {
    code: `{
  "name": "example-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1",
    "react": "^17.0.2"
  }
}`,
    language: 'json',
    title: 'JSON Example',
    theme: 'vs-code',
    showLineNumbers: true,
    showCopyButton: true,
  },
}

export const NoTitle: Story = {
  args: {
    code: `// Simple function without title
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(add(5, 3)); // 8
console.log(multiply(4, 7)); // 28`,
    language: 'javascript',
    theme: 'github',
    showLineNumbers: true,
    showCopyButton: false,
  },
} 