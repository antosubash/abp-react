'use client'

import { Hero } from './Hero'

export const HeroDemo = () => {
  return (
    <div className="space-y-16">
      {/* Basic Hero */}
      <Hero
        title="Welcome to Our Amazing Platform"
        subtitle="Discover incredible features that will transform your experience and help you achieve your goals faster than ever before."
        backgroundColor="#1f2937"
        textColor="#ffffff"
        showButton={true}
        buttonText="Get Started"
        buttonLink="#"
        alignment="center"
        minHeight="500px"
        titleSize="large"
        subtitleSize="medium"
        animation="fade-in"
        shadow="lg"
      />

      {/* Gradient Hero */}
      <Hero
        title="Modern Design with Gradient"
        subtitle="Beautiful gradient backgrounds that create stunning visual impact and modern aesthetics."
        showGradient={true}
        gradientDirection="to-r"
        gradientColors="#667eea, #764ba2"
        textColor="#ffffff"
        showButton={true}
        buttonText="Explore Features"
        buttonLink="#"
        showSecondaryButton={true}
        secondaryButtonText="Learn More"
        secondaryButtonLink="#"
        secondaryButtonStyle="outline"
        alignment="center"
        minHeight="600px"
        titleSize="xl"
        subtitleSize="large"
        animation="slide-up"
        shadow="xl"
      />

      {/* Left Aligned Hero */}
      <Hero
        title="Left Aligned Content"
        subtitle="Perfect for creating a more personal and intimate feel with your audience."
        backgroundColor="#2d3748"
        textColor="#ffffff"
        showButton={true}
        buttonText="Contact Us"
        buttonLink="#"
        buttonStyle="primary"
        alignment="left"
        minHeight="450px"
        padding="100px 48px"
        titleSize="large"
        subtitleSize="medium"
        animation="slide-down"
        shadow="md"
      />

      {/* Background Image Hero */}
      <Hero
        title="Hero with Background Image"
        subtitle="Stunning background images with overlay effects for maximum visual impact."
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        backgroundOverlay="rgba(0, 0, 0, 0.5)"
        textColor="#ffffff"
        showButton={true}
        buttonText="View Gallery"
        buttonLink="#"
        showSecondaryButton={true}
        secondaryButtonText="Download"
        secondaryButtonLink="#"
        secondaryButtonStyle="ghost"
        alignment="center"
        minHeight="700px"
        titleSize="xl"
        subtitleSize="large"
        animation="fade-in"
        shadow="lg"
        borderRadius="16px"
      />

      {/* Small Hero */}
      <Hero
        title="Compact Hero Section"
        subtitle="Perfect for smaller spaces and quick messaging."
        backgroundColor="#4a5568"
        textColor="#ffffff"
        showButton={true}
        buttonText="Learn More"
        buttonLink="#"
        alignment="center"
        minHeight="300px"
        padding="60px 24px"
        titleSize="medium"
        subtitleSize="small"
        animation="none"
        shadow="sm"
      />
    </div>
  )
}
