'use client'

import React from 'react'
import { CarouselBlock } from './CarouselBlock'
import type { CarouselBlockProps } from './CarouselBlockProps'

export const CarouselBlockDemo = () => {
  // Basic carousel with default settings
  const basicCarouselProps: CarouselBlockProps = {
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
  }

  // Minimal carousel without auto-play
  const minimalCarouselProps: CarouselBlockProps = {
    slides: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/1200/600?random=4',
        title: 'Minimal Design',
        description: 'Clean and simple design that focuses on content.',
        backgroundColor: '#f3f4f6',
        textColor: '#1f2937',
        textAlignment: 'center',
        overlayOpacity: 0.1,
      },
      {
        id: '2',
        imageUrl: 'https://picsum.photos/1200/600?random=5',
        title: 'Elegant Typography',
        description: 'Beautiful typography that enhances readability.',
        backgroundColor: '#e5e7eb',
        textColor: '#374151',
        textAlignment: 'center',
        overlayOpacity: 0.1,
      },
    ],
    autoPlay: false,
    showArrows: true,
    showDots: true,
    loop: false,
    height: '350px',
    borderRadius: '12px',
    shadow: true,
  }

  // Hero carousel with large text
  const heroCarouselProps: CarouselBlockProps = {
    slides: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/1200/800?random=6',
        title: 'Transform Your Business',
        description: 'Leverage cutting-edge technology to drive growth and innovation.',
        buttonText: 'Start Transformation',
        buttonUrl: '#',
        backgroundColor: '#1e40af',
        textColor: '#ffffff',
        textAlignment: 'center',
        overlayOpacity: 0.6,
      },
      {
        id: '2',
        imageUrl: 'https://picsum.photos/1200/800?random=7',
        title: 'Scale with Confidence',
        description: 'Build scalable solutions that grow with your business needs.',
        buttonText: 'Scale Now',
        buttonUrl: '#',
        backgroundColor: '#059669',
        textColor: '#ffffff',
        textAlignment: 'center',
        overlayOpacity: 0.6,
      },
    ],
    autoPlay: true,
    autoPlayInterval: 7000,
    showArrows: true,
    showDots: true,
    loop: true,
    pauseOnHover: true,
    height: '600px',
    responsive: {
      mobile: {
        height: '400px',
        showArrows: false,
        showDots: true,
      },
      tablet: {
        height: '500px',
        showArrows: true,
        showDots: true,
      },
      desktop: {
        height: '600px',
        showArrows: true,
        showDots: true,
      },
    },
  }

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">Carousel Block Examples</h2>

        {/* Basic Carousel */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Basic Carousel</h3>
          <CarouselBlock {...basicCarouselProps} />
        </div>

        {/* Minimal Carousel */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Minimal Carousel (No Auto-play)</h3>
          <CarouselBlock {...minimalCarouselProps} />
        </div>

        {/* Hero Carousel */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Hero Carousel (Responsive)</h3>
          <CarouselBlock {...heroCarouselProps} />
        </div>
      </div>
    </div>
  )
}
