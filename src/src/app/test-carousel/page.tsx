'use client'

import React from 'react'
import { CarouselBlock } from '@/components/puck/components/CarouselBlock'
import type { CarouselBlockProps } from '@/components/puck/components/CarouselBlock/CarouselBlockProps'

export default function TestCarouselPage() {
  const testCarouselProps: CarouselBlockProps = {
    slides: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/1200/600?random=1',
        title: 'Welcome to Our Platform',
        description: 'Discover amazing features and possibilities with our innovative solution.',
        buttonText: 'Get Started',
        buttonUrl: '#',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        textAlignment: 'center',
        overlayOpacity: 0.3,
      },
      {
        id: '2',
        imageUrl: 'https://picsum.photos/1200/600?random=2',
        title: 'Powerful Features',
        description: 'Experience the power of our advanced features designed for modern needs.',
        buttonText: 'Learn More',
        buttonUrl: '#',
        backgroundColor: '#1f2937',
        textColor: '#ffffff',
        textAlignment: 'left',
        overlayOpacity: 0.4,
      },
      {
        id: '3',
        imageUrl: 'https://picsum.photos/1200/600?random=3',
        title: 'Seamless Integration',
        description: 'Integrate effortlessly with your existing workflow and tools.',
        buttonText: 'Try Now',
        buttonUrl: '#',
        backgroundColor: '#374151',
        textColor: '#ffffff',
        textAlignment: 'right',
        overlayOpacity: 0.5,
      },
    ],
    autoPlay: true,
    autoPlayInterval: 5000,
    showArrows: true,
    showDots: true,
    loop: true,
    pauseOnHover: true,
    height: '400px',
    responsive: {
      mobile: {
        height: '300px',
        showArrows: false,
        showDots: true,
      },
      tablet: {
        height: '350px',
        showArrows: true,
        showDots: true,
      },
      desktop: {
        height: '400px',
        showArrows: true,
        showDots: true,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">CarouselBlock Test Page</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Basic Carousel</h2>
            <CarouselBlock {...testCarouselProps} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Minimal Carousel (No Auto-play)</h2>
            <CarouselBlock 
              {...testCarouselProps} 
              autoPlay={false}
              height="350px"
              borderRadius="12px"
              shadow={true}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Hero Carousel (Large)</h2>
            <CarouselBlock 
              {...testCarouselProps} 
              height="600px"
              autoPlayInterval={7000}
              responsive={{
                mobile: { height: '400px', showArrows: false },
                tablet: { height: '500px' },
                desktop: { height: '600px' },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 