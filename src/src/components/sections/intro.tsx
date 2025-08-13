import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Rocket, 
  Shield, 
  Users, 
  Palette, 
  Globe, 
  Code, 
  CheckCircle, 
  ArrowRight,
  Github,
  Mail,
  MessageCircle
} from 'lucide-react'

export const Intro = () => {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to AbpReact
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern, high-performance React-based frontend solution for ABP Framework applications. 
            Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and developer experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🎨 UI Components
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Basic building blocks like buttons, inputs, cards, and more. These are the foundation of your user interface.
            </p>
            <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
              <li>• Buttons and form controls</li>
              <li>• Layout and navigation</li>
              <li>• Data display components</li>
              <li>• Feedback and notification</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🧩 Puck Components
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Visual builder components for the CMS. These allow content editors to create rich layouts without code.
            </p>
            <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
              <li>• Content blocks and sections</li>
              <li>• Layout and grid components</li>
              <li>• Media and interactive elements</li>
              <li>• Customizable styling options</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🔐 Enterprise Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Full ABP authentication and authorization integration with enterprise-grade security features.
            </p>
            <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
              <li>• JWT-based authentication</li>
              <li>• Role-based access control</li>
              <li>• Multi-tenant support</li>
              <li>• Permission management</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🚀 Modern Stack
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Built with the latest technologies for optimal performance and developer experience.
            </p>
            <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
              <li>• Next.js 14+ with App Router</li>
              <li>• TypeScript for type safety</li>
              <li>• Tailwind CSS for styling</li>
              <li>• shadcn/ui components</li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Getting Started
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="font-semibold mb-2">Install Template</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Install the ABP React template using dotnet CLI
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <h3 className="font-semibold mb-2">Create Project</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate a new project with your API configuration
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <h3 className="font-semibold mb-2">Start Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Run the development server and start building
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-16">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Quick Commands
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <code className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded flex-1">
                dotnet new install Anto.Abp.React.Template
              </code>
            </div>
            <div className="flex items-center gap-3">
              <code className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded flex-1">
                dotnet new abp-react -o my-app --apiUrl https://your-api-url.com
              </code>
            </div>
            <div className="flex items-center gap-3">
              <code className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded flex-1">
                cd my-app && pnpm dev
              </code>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Explore Components
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start exploring the components in Storybook to see what&apos;s available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://abp-react-storybook.antosubash.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Storybook
            </a>
            <a 
              href="https://antosubash.github.io/abp-react/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 