export const CarouselBlockFields = {
  slides: {
    type: 'array' as const,
    label: 'Slides',
    arrayFields: {
      id: {
        type: 'text' as const,
        label: 'Slide ID',
      },
      imageUrl: {
        type: 'text' as const,
        label: 'Image URL',
      },
      title: {
        type: 'text' as const,
        label: 'Title',
      },
      description: {
        type: 'textarea' as const,
        label: 'Description',
      },
      buttonText: {
        type: 'text' as const,
        label: 'Button Text',
      },
      buttonUrl: {
        type: 'text' as const,
        label: 'Button URL',
      },
      backgroundColor: {
        type: 'text' as const,
        label: 'Background Color (hex)',
      },
      textColor: {
        type: 'text' as const,
        label: 'Text Color (hex)',
      },
      textAlignment: {
        type: 'select' as const,
        label: 'Text Alignment',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
      overlayOpacity: {
        type: 'number' as const,
        label: 'Overlay Opacity (0-1)',
      },
    },
  },
  autoPlay: {
    type: 'select' as const,
    label: 'Auto Play',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  autoPlayInterval: {
    type: 'number' as const,
    label: 'Auto Play Interval (ms)',
  },
  showArrows: {
    type: 'select' as const,
    label: 'Show Navigation Arrows',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  showDots: {
    type: 'select' as const,
    label: 'Show Dots Indicator',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  loop: {
    type: 'select' as const,
    label: 'Loop Carousel',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  pauseOnHover: {
    type: 'select' as const,
    label: 'Pause on Hover',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  height: {
    type: 'text' as const,
    label: 'Height (CSS value)',
  },
  width: {
    type: 'text' as const,
    label: 'Width (CSS value)',
  },
  maxWidth: {
    type: 'text' as const,
    label: 'Max Width (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
  borderRadius: {
    type: 'text' as const,
    label: 'Border Radius (CSS value)',
  },
  shadow: {
    type: 'select' as const,
    label: 'Shadow',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  arrowColor: {
    type: 'text' as const,
    label: 'Arrow Color (hex)',
  },
  arrowBackgroundColor: {
    type: 'text' as const,
    label: 'Arrow Background Color (CSS)',
  },
  dotColor: {
    type: 'text' as const,
    label: 'Dot Color (CSS)',
  },
  dotActiveColor: {
    type: 'text' as const,
    label: 'Active Dot Color (CSS)',
  },
  responsive: {
    type: 'object' as const,
    label: 'Responsive Settings',
    fields: {
      mobile: {
        type: 'object' as const,
        label: 'Mobile',
        fields: {
          height: {
            type: 'text' as const,
            label: 'Height (CSS value)',
          },
          showArrows: {
            type: 'select' as const,
            label: 'Show Arrows',
            options: [
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ],
          },
          showDots: {
            type: 'select' as const,
            label: 'Show Dots',
            options: [
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ],
          },
        },
      },
      tablet: {
        type: 'object' as const,
        label: 'Tablet',
        fields: {
          height: {
            type: 'text' as const,
            label: 'Height (CSS value)',
          },
          showArrows: {
            type: 'select' as const,
            label: 'Show Arrows',
            options: [
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ],
          },
          showDots: {
            type: 'select' as const,
            label: 'Show Dots',
            options: [
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ],
          },
        },
      },
      desktop: {
        type: 'object' as const,
        label: 'Desktop',
        fields: {
          height: {
            type: 'text' as const,
            label: 'Height (CSS value)',
          },
          showArrows: {
            type: 'select' as const,
            label: 'Show Arrows',
            options: [
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ],
          },
          showDots: {
            type: 'select' as const,
            label: 'Show Dots',
            options: [
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ],
          },
        },
      },
    },
  },
} 