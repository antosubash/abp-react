export const HeroFields = {
  preset: {
    type: 'select' as const,
    label: 'Preset Style',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Modern Gradient', value: 'modern-gradient' },
      { label: 'Dark Professional', value: 'dark-professional' },
      { label: 'Light Clean', value: 'light-clean' },
      { label: 'Bold & Bright', value: 'bold-bright' },
      { label: 'Minimal', value: 'minimal' },
    ],
  },
  title: {
    type: 'text' as const,
    label: 'Title',
  },
  subtitle: {
    type: 'text' as const,
    label: 'Subtitle',
  },
  backgroundColor: {
    type: 'text' as const,
    label: 'Background Color (hex or CSS color)',
  },
  backgroundImage: {
    type: 'text' as const,
    label: 'Background Image URL',
  },
  backgroundOverlay: {
    type: 'text' as const,
    label: 'Background Overlay (rgba or hex)',
  },
  textColor: {
    type: 'text' as const,
    label: 'Text Color (hex or CSS color)',
  },
  showButton: {
    type: 'select' as const,
    label: 'Show Primary Button',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  buttonText: {
    type: 'text' as const,
    label: 'Primary Button Text',
  },
  buttonLink: {
    type: 'text' as const,
    label: 'Primary Button Link',
  },
  buttonStyle: {
    type: 'select' as const,
    label: 'Primary Button Style',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
    ],
  },
  showSecondaryButton: {
    type: 'select' as const,
    label: 'Show Secondary Button',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  secondaryButtonText: {
    type: 'text' as const,
    label: 'Secondary Button Text',
  },
  secondaryButtonLink: {
    type: 'text' as const,
    label: 'Secondary Button Link',
  },
  secondaryButtonStyle: {
    type: 'select' as const,
    label: 'Secondary Button Style',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
    ],
  },
  alignment: {
    type: 'select' as const,
    label: 'Content Alignment',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
  minHeight: {
    type: 'text' as const,
    label: 'Minimum Height (CSS value)',
  },
  padding: {
    type: 'text' as const,
    label: 'Padding (CSS value)',
  },
  titleSize: {
    type: 'select' as const,
    label: 'Title Size',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
      { label: 'Extra Large', value: 'xl' },
    ],
  },
  subtitleSize: {
    type: 'select' as const,
    label: 'Subtitle Size',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ],
  },
  showGradient: {
    type: 'select' as const,
    label: 'Show Gradient Background',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  gradientDirection: {
    type: 'select' as const,
    label: 'Gradient Direction',
    options: [
      { label: 'To Right', value: 'to-r' },
      { label: 'To Left', value: 'to-l' },
      { label: 'To Top', value: 'to-t' },
      { label: 'To Bottom', value: 'to-b' },
      { label: 'To Top Right', value: 'to-tr' },
      { label: 'To Top Left', value: 'to-tl' },
      { label: 'To Bottom Right', value: 'to-br' },
      { label: 'To Bottom Left', value: 'to-bl' },
    ],
  },
  gradientColors: {
    type: 'text' as const,
    label: 'Gradient Colors (comma-separated)',
  },
  animation: {
    type: 'select' as const,
    label: 'Animation',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Fade In', value: 'fade-in' },
      { label: 'Slide Up', value: 'slide-up' },
      { label: 'Slide Down', value: 'slide-down' },
    ],
  },
  borderRadius: {
    type: 'text' as const,
    label: 'Border Radius (CSS value)',
  },
  shadow: {
    type: 'select' as const,
    label: 'Shadow',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2XL', value: '2xl' },
    ],
  },
}
