import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { action } from 'storybook/actions'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Heart, Share2, MessageCircle, Calendar, MapPin } from 'lucide-react'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with header, content, and footer sections. Perfect for displaying content in a structured layout.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Basic card
export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is where you can put any content you want to display.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

// Card with action
export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button in the header</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates how to add an action button in the header area.</p>
      </CardContent>
    </Card>
  ),
}

// Profile card
export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Passionate about building great user experiences and scalable applications.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Follow
        </Button>
        <Button size="sm">Message</Button>
      </CardFooter>
    </Card>
  ),
}

// Blog post card
export const BlogPostCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Getting Started with React</CardTitle>
            <CardDescription>Learn the basics of React development</CardDescription>
          </div>
          <Badge variant="secondary">New</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          React is a JavaScript library for building user interfaces. In this guide, we&apos;ll cover the fundamentals...
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Dec 12, 2023</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>5 min read</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Heart className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  ),
}

// Event card
export const EventCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Tech Conference 2024</CardTitle>
        <CardDescription>Join us for the biggest tech event of the year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>March 15, 2024 • 9:00 AM</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Free</Badge>
            <Badge variant="secondary">In Person</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Register Now</Button>
      </CardFooter>
    </Card>
  ),
}

// Stats card
export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">1,234</CardTitle>
          <CardDescription>Total Users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-green-600">+12% from last month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">$45,678</CardTitle>
          <CardDescription>Revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-green-600">+8% from last month</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">89%</CardTitle>
          <CardDescription>Satisfaction Rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-blue-600">+2% from last month</div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

// Interactive card
export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover and click to see interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates hover effects and interactive states.</p>
      </CardContent>
      <CardFooter>
        <Button onClick={action('onClick')} className="w-full">
          Click Me
        </Button>
      </CardFooter>
    </Card>
  ),
} 