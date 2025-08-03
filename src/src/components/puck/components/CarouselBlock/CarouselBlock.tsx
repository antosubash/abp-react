'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { CarouselBlockProps, CarouselSlide } from './CarouselBlockProps'
import { CarouselBlockDefaults } from './CarouselBlockDefaults'

export const CarouselBlock = ({
  slides = CarouselBlockDefaults.slides,
  autoPlay = CarouselBlockDefaults.autoPlay,
  autoPlayInterval = CarouselBlockDefaults.autoPlayInterval,
  showArrows = CarouselBlockDefaults.showArrows,
  showDots = CarouselBlockDefaults.showDots,
  loop = CarouselBlockDefaults.loop,
  pauseOnHover = CarouselBlockDefaults.pauseOnHover,
  height = CarouselBlockDefaults.height,
  width = CarouselBlockDefaults.width,
  maxWidth = CarouselBlockDefaults.maxWidth,
  padding = CarouselBlockDefaults.padding,
  borderRadius = CarouselBlockDefaults.borderRadius,
  shadow = CarouselBlockDefaults.shadow,
  arrowColor = CarouselBlockDefaults.arrowColor,
  arrowBackgroundColor = CarouselBlockDefaults.arrowBackgroundColor,
  dotColor = CarouselBlockDefaults.dotColor,
  dotActiveColor = CarouselBlockDefaults.dotActiveColor,
  responsive = CarouselBlockDefaults.responsive,
}: CarouselBlockProps) => {
  const [api, setApi] = useState<any>(null)
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!api || !autoPlay || isHovered) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, autoPlay, autoPlayInterval, isHovered])

  // Update current slide
  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Get responsive settings
  const getResponsiveSettings = () => {
    if (isMobile && responsive?.mobile) {
      return {
        height: responsive.mobile.height || height,
        showArrows: responsive.mobile.showArrows ?? showArrows,
        showDots: responsive.mobile.showDots ?? showDots,
      }
    }
    if (isTablet && responsive?.tablet) {
      return {
        height: responsive.tablet.height || height,
        showArrows: responsive.tablet.showArrows ?? showArrows,
        showDots: responsive.tablet.showDots ?? showDots,
      }
    }
    if (responsive?.desktop) {
      return {
        height: responsive.desktop.height || height,
        showArrows: responsive.desktop.showArrows ?? showArrows,
        showDots: responsive.desktop.showDots ?? showDots,
      }
    }
    return { height, showArrows, showDots }
  }

  const responsiveSettings = getResponsiveSettings()

  // Handle dot click
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  // Handle mouse events for pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true)
    }
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(false)
    }
  }, [pauseOnHover])

  if (!slides || slides.length === 0) {
    return (
      <div 
        style={{
          height: responsiveSettings.height,
          width,
          maxWidth,
          padding,
          borderRadius,
          boxShadow: shadow ? '0 10px 25px rgba(0, 0, 0, 0.1)' : 'none',
        }}
        className="flex items-center justify-center bg-gray-100 text-gray-500"
      >
        <p>No slides to display</p>
      </div>
    )
  }

  return (
    <div
      style={{
        width,
        maxWidth,
        padding,
        borderRadius,
        boxShadow: shadow ? '0 10px 25px rgba(0, 0, 0, 0.1)' : 'none',
      }}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        setApi={setApi}
        opts={{
          loop,
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide: CarouselSlide, index: number) => (
            <CarouselItem key={slide.id || index}>
              <div
                style={{
                  height: responsiveSettings.height,
                  backgroundColor: slide.backgroundColor || '#000000',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="relative flex items-center justify-center"
              >
                {/* Background Image */}
                {slide.imageUrl && (
                  <>
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title || `Slide ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                    />
                    {/* Overlay */}
                    <div
                      style={{
                        backgroundColor: `rgba(0, 0, 0, ${slide.overlayOpacity || 0.3})`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    />
                  </>
                )}

                {/* Content */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    color: slide.textColor || '#ffffff',
                    textAlign: slide.textAlignment || 'center',
                    padding: '2rem',
                    maxWidth: '800px',
                    width: '100%',
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  {slide.title && (
                    <h2 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                      style={{ textAlign: slide.textAlignment || 'center' }}
                    >
                      {slide.title}
                    </h2>
                  )}
                  
                  {slide.description && (
                    <p 
                      className="text-lg md:text-xl mb-6 leading-relaxed"
                      style={{ textAlign: slide.textAlignment || 'center' }}
                    >
                      {slide.description}
                    </p>
                  )}
                  
                  {slide.buttonText && slide.buttonUrl && (
                    <Button
                      asChild
                      size="lg"
                      className="px-8 py-3 text-lg font-semibold"
                      style={{
                        backgroundColor: slide.textColor || '#ffffff',
                        color: slide.backgroundColor || '#000000',
                      }}
                    >
                      <a href={slide.buttonUrl}>
                        {slide.buttonText}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        {responsiveSettings.showArrows && slides.length > 1 && (
          <>
            <CarouselPrevious
              style={{
                color: arrowColor,
                backgroundColor: arrowBackgroundColor,
                border: 'none',
              }}
              className="left-4"
            />
            <CarouselNext
              style={{
                color: arrowColor,
                backgroundColor: arrowBackgroundColor,
                border: 'none',
              }}
              className="right-4"
            />
          </>
        )}

        {/* Dots Indicator */}
        {responsiveSettings.showDots && slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                style={{
                  backgroundColor: index === current ? dotActiveColor : dotColor,
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  )
} 