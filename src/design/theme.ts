export const theme = {
  colors: {
    // Primary accent - Subtle blue for highlights only
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryLight: '#eff6ff',
    primaryDark: '#1d4ed8',
    
    // Secondary colors
    secondary: '#6366f1',
    secondaryHover: '#4f46e5',
    
    // Status colors
    success: '#10b981',
    successHover: '#059669',
    successLight: '#ecfdf5',
    warning: '#f59e0b',
    warningLight: '#fffbeb',
    error: '#ef4444',
    errorLight: '#fef2f2',
    info: '#06b6d4',
    infoLight: '#f0fdfa',
    
    // Mode accent colors
    modePurple: '#8b5cf6',
    modePurpleHover: '#7c3aed',
    modeGreen: '#10b981',
    modeGreenHover: '#059669',
    
    // Neutrals - Ultra clean and minimal
    white: '#ffffff',
    black: '#000000',
    gray50: '#fafafa',
    gray100: '#f5f5f5',
    gray200: '#e5e5e5',
    gray300: '#d4d4d4',
    gray400: '#a3a3a3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',
    
    // Background colors - Pure and clean
    background: '#ffffff',
    backgroundSecondary: '#fafafa',
    backgroundTertiary: '#f5f5f5',
    
    // Text colors - Optimized readability
    textPrimary: '#171717',
    textSecondary: '#525252',
    textTertiary: '#737373',
    textInverse: '#ffffff',
    textMuted: '#a3a3a3',
    
    // Borders - Almost invisible when needed
    border: 'transparent',
    borderLight: 'transparent',
    borderDark: 'rgba(0, 0, 0, 0.06)',
    borderFocus: '#3b82f6',
    
    // Panel specific - Pure and borderless
    panelBackground: '#ffffff',
    panelBorder: 'transparent',
    panelShadow: 'none',
    panelShadowHover: 'rgba(0, 0, 0, 0.02)',
    
    // Header - Borderless clean theme
    headerBackground: '#ffffff',
    headerBackgroundHover: '#fafafa',
    headerText: '#171717',
    headerTextSecondary: '#525252',
    headerBorder: 'transparent',
    
    // Node editor
    nodeEditorBackground: '#fafafa',
    nodeEditorGrid: '#f0f0f0',
    
    // Interactive elements - Borderless and minimal
    buttonPrimary: '#3b82f6',
    buttonPrimaryHover: '#2563eb',
    buttonSecondary: '#ffffff',
    buttonSecondaryHover: '#fafafa',
    buttonSecondaryBorder: 'transparent',
    
    // Input fields - Clean and borderless
    inputBackground: '#fafafa',
    inputBorder: 'transparent',
    inputBorderFocus: 'transparent',
    inputPlaceholder: '#a3a3a3',
    
    // Hover states - Subtle
    hoverBackground: '#fafafa',
    hoverBorder: 'transparent',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },
  
  shadows: {
    none: 'none',
    sm: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
    inner: 'none',
    focus: 'none',
  },
  
  typography: {
    fontFamily: {
      sans: [
        'Lato',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'sans-serif'
      ].join(', '),
      mono: [
        'SF Mono',
        'Consolas',
        'Monaco',
        'monospace'
      ].join(', '),
    },
    fontSize: {
      xs: '13px',
      sm: '15px',
      md: '17px',
      lg: '19px',
      xl: '22px',
      xxl: '26px',
      '3xl': '32px',
      '4xl': '40px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.3,
      normal: 1.5,
      relaxed: 1.7,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.02em',
    },
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    notification: 1070,
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type Theme = typeof theme;