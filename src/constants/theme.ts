export const COLORS = {
  // Primary mystical colors
  primary: '#ff4444',
  secondary: '#ffd700',
  accent: '#8b5cf6',
  
  // Dark theme colors
  background: '#000000',
  surface: '#111111',
  surfaceVariant: '#1a1a1a',
  surfaceElevated: '#2a2a2a',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  textTertiary: '#888888',
  textDisabled: '#666666',
  
  // Mystical accent colors
  soulRed: '#ff4444',
  cosmicGold: '#ffd700',
  lunarSilver: '#c0c0c0',
  shadowPurple: '#8b5cf6',
  etherealBlue: '#3b82f6',
  mysticGreen: '#10b981',
  chaosOrange: '#f97316',
  voidBlack: '#000000',
  
  // Gradient colors
  gradients: {
    primary: ['#ff4444', '#ff6666'],
    secondary: ['#ffd700', '#ffed4e'],
    shadow: ['#1a1a1a', '#2a2a2a'],
    shadowLevel1: ['#1a1a1a', '#2a2a2a'],
    shadowLevel2: ['#2a1a2a', '#3a2a3a'],
    shadowLevel3: ['#3a2a3a', '#4a3a4a'],
    soul: ['#ff4444', '#cc0000'],
    cosmic: ['#ffd700', '#ffb300'],
  },
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 50,
} as const;

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
} as const;

export const ANIMATIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const; 