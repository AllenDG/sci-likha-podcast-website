/**
 * Design System Constants
 * Centralized configuration for consistent UI/UX
 */

export const BUTTON_SIZES = {
  sm: { padding: 'px-3 py-2', fontSize: 'text-xs', height: 'h-8', width: 'w-8' },
  md: { padding: 'px-4 py-2', fontSize: 'text-sm', height: 'h-10', width: 'w-auto' },
  lg: { padding: 'px-6 py-3', fontSize: 'text-base', height: 'h-12', width: 'w-auto' },
  xl: { padding: 'px-8 py-4', fontSize: 'text-lg', height: 'h-14', width: 'w-auto' },
} as const;

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
} as const;

export const COLORS = {
  primary: '#163409',
  primaryHover: '#1b3e0d',
  secondary: '#14320f',
  accent: '#22c55e',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

export const TYPOGRAPHY = {
  h1: { size: 'text-4xl md:text-5xl', weight: 'font-bold', lineHeight: 'leading-tight' },
  h2: { size: 'text-3xl md:text-4xl', weight: 'font-bold', lineHeight: 'leading-tight' },
  h3: { size: 'text-2xl md:text-3xl', weight: 'font-semibold', lineHeight: 'leading-snug' },
  h4: { size: 'text-xl md:text-2xl', weight: 'font-semibold', lineHeight: 'leading-snug' },
  body: { size: 'text-base', weight: 'font-normal', lineHeight: 'leading-relaxed' },
  bodySmall: { size: 'text-sm', weight: 'font-normal', lineHeight: 'leading-relaxed' },
  caption: { size: 'text-xs', weight: 'font-normal', lineHeight: 'leading-normal' },
} as const;

export const BORDER_RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
} as const;

export const SHADOWS = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
} as const;

export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultraWide: 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000,
} as const;

export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  notification: 70,
  debug: 9999,
} as const;

export const TOUCH_TARGET = {
  min: 44,
  recommended: 48,
  large: 56,
} as const;

export const NAVIGATION = {
  home: { path: '/', label: 'Home' },
  content: { path: '/content', label: 'Content' },
  about: { path: '/about', label: 'About' },
  admin: { path: '/admin', label: 'Admin' },
  login: { path: '/login', label: 'Login' },
  notFound: { path: '*', label: 'Not Found' },
} as const;

export const API_CONFIG = {
  baseUrl: 'http://localhost:3000/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

export const FEATURE_FLAGS = {
  enableAnalytics: true,
  enableNotifications: true,
  enableOfflineMode: false,
  enableBeta: false,
} as const;