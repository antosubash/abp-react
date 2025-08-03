import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PublicLayout from '@/layout/public-layout'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Rocket, 
  Shield, 
  Palette, 
  Globe, 
  Code, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Layers,
  Database,
  Cpu
} from 'lucide-react'

/**
 * The Home component is an asynchronous function that returns a comprehensive landing page.
 * It showcases the AbpReact template features and provides clear next steps for users.
 *
 * @returns {React.ReactElement} The rendered JSX element.
 */
export default async function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">
                  <Rocket className="w-3 h-3 mr-1" />
                  Modern React Template
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  AbpReact
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A modern, high-performance React-based frontend solution for ABP Framework applications. 
                  Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and developer experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admin">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Zap className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
                <Link href="https://abp-react-storybook.antosubash.com">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Palette className="w-4 h-4 mr-2" />
                    View Components
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/img/macbook.png"
              alt="AbpReact Dashboard"
              width={900}
              height={600}
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Everything you need to build modern web apps
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              AbpReact provides a complete foundation for building enterprise-grade React applications 
              with ABP Framework integration, modern tooling, and beautiful UI components.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>UI Components</CardTitle>
                <CardDescription>
                  Comprehensive set of reusable components built with shadcn/ui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Buttons, forms, and navigation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Data tables and charts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Modals and overlays
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Visual Builder</CardTitle>
                <CardDescription>
                  Puck CMS integration for visual content editing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Drag-and-drop interface
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Content blocks and layouts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Real-time preview
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Full ABP authentication and authorization integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    JWT-based authentication
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Role-based access control
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Multi-tenant support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Modern Stack</CardTitle>
                <CardDescription>
                  Built with the latest technologies for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Next.js 14+ with App Router
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    TypeScript for type safety
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Tailwind CSS for styling
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>ABP Integration</CardTitle>
                <CardDescription>
                  Seamless integration with ABP Framework backend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Auto-generated API client
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Permission management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Multi-tenancy support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Ready to Deploy</CardTitle>
                <CardDescription>
                  Production-ready with optimized build and deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Optimized bundle size
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    SEO optimized
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Docker support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Follow these simple steps to create your first AbpReact application
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Install Template</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Install the ABP React template using dotnet CLI
              </p>
              <div className="bg-muted p-3 rounded-lg text-left">
                <code className="text-xs">
                  dotnet new install Anto.Abp.React.Template
                </code>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Create Project</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate a new project with your API configuration
              </p>
              <div className="bg-muted p-3 rounded-lg text-left">
                <code className="text-xs">
                  dotnet new abp-react -o my-app --apiUrl https://your-api-url.com
                </code>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Start Development</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Run the development server and start building
              </p>
              <div className="bg-muted p-3 rounded-lg text-left">
                <code className="text-xs">
                  cd my-app && pnpm dev
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Ready to build something amazing?
            </h2>
            <p className="text-muted-foreground md:text-xl mb-8 max-w-2xl mx-auto">
              Start exploring the components, check out the documentation, or dive into the admin panel to see what AbpReact can do for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admin">
                <Button size="lg" className="w-full sm:w-auto">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Explore Admin Panel
                </Button>
              </Link>
              <Link href="/storybook">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Palette className="w-4 h-4 mr-2" />
                  View Storybook
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Code className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}