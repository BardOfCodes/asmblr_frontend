// Node Theme System
// Centralized theming for React Flow nodes

export interface NodeTheme {
  // Container
  container: {
    background: string;
    border: string;
    borderSelected: string;
    borderRadius: number;
    shadow: string;
    shadowHover: string;
    fontFamily: string;
    fontSize: number;
  };
  
  // Header
  header: {
    background: string;
    color: string;
    fontSize: number;
    fontWeight: number;
    padding: string;
    borderBottom: string;
    height: number;
  };
  
  // Body
  body: {
    padding: string;
    gap: number;
  };
  
  // Sockets
  sockets: {
    size: {
      normal: number;
      small: number;
    };
    // How far the handle should protrude outside the node edge, as a multiple of its size
    // Example: left=1.0 (full size outside), right=0.75
    offsetFactors?: {
      left: number;
      right: number;
    };
    border: string;
    shadow: string;
    shadowHover: string;
    colors: {
      ExprSocket: string;
      VectorSocket: string;
      FloatSocket: string;
      BoolSocket: string;
      StringSocket: string;
      MaterialSocket: string;
      StateSocket: string;
      default: string;
    };
  };
  
  // Labels
  labels: {
    color: string;
    colorSecondary: string;  // For dimension labels, placeholders, etc.
    fontSize: number;
    fontWeight: number;
    margin: string;
  };
  
  // Controls
  controls: {
    background: string;
    backgroundSecondary: string;  // For containers, matrix backgrounds
    border: string;
    borderFocus: string;
    borderRadius: number;
    padding: string;
    fontSize: number;
    gap: number;
    height: number;
    step: number;
    // Colors
    textColor: string;
    textColorSecondary: string;  // For placeholders, secondary text
    // Action buttons
    buttonAdd: string;
    buttonAddHover: string;
    buttonDelete: string;
    buttonDeleteHover: string;
    // Standardized input styling (matches vector controls)
    inputPadding: string;        // Standard padding for all inputs
    inputFontSize: number;       // Standard font size for all inputs
    inputBorderRadius: number;   // Standard border radius for all inputs
    // Vector control sizing
    vectorInputWidth: number;
    vectorInputWidthList: number;
    floatInputWidth: number;
    floatInputWidthList: number;
    // Matrix control sizing
    matrixInputWidth: number;
    matrixContainerPadding: number;
  };
  
  // Layout
  layout: {
    minWidth: number;
    maxWidth: number;
    socketPadding: number;
    columnGap: number;
    rowGap: number;
    rowPadding: number;  // Padding between rows for sockets/labels/controls
  };
  
  // Connections/Edges
  connections: {
    strokeWidth: number;
    strokeWidthSelected: number;
    color: string;
    colorSelected: string;
    colorHover: string;
    type: 'default' | 'straight' | 'step' | 'smoothstep' | 'bezier';
    animated: boolean;
    animationDuration: number;
    shadow: string;
  };
}

/**
 * Default light theme - Modern, cohesive color palette
 * Based on a sophisticated blue-gray foundation with vibrant accent colors
 */
export const DEFAULT_NODE_THEME: NodeTheme = {
  container: {
    background: '#ffffff',
    border: '#e2e8f0',           // Slate-200 - soft, modern border
    borderSelected: '#3b82f6',   // Blue-500 - clean selection color
    borderRadius: 8,
    shadow: '0 2px 8px rgba(15, 23, 42, 0.08)',      // Slate-900 with low opacity
    shadowHover: '0 4px 16px rgba(15, 23, 42, 0.12)', // Enhanced shadow on hover
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
  },
  
  header: {
    background: '#f8fafc',       // Slate-50 - very light background
    color: '#1e293b',            // Slate-800 - strong readable text
    fontSize: 14,
    fontWeight: 600,
    padding: '10px 20px',
    borderBottom: '1px solid #e2e8f0', // Slate-200
    height: 32,
  },
  
  body: {
    padding: '15px 20px',
    gap: 50,
  },
  
  sockets: {
    size: {
      normal: 20,
      small: 0,
    },
    offsetFactors: {
      left: -0.35,
      right: -0.35,
    },
    border: '2px solid #ffffff',
    shadow: '0 2px 4px rgba(15, 23, 42, 0.15)',
    shadowHover: '0 4px 8px rgba(15, 23, 42, 0.25)',
    colors: {
      // Modern, accessible color palette with good contrast
      ExprSocket: '#10b981',     // Emerald-500 - geometry/expressions
      VectorSocket: '#3b82f6',   // Blue-500 - vectors/math
      FloatSocket: '#f59e0b',    // Amber-500 - numbers
      BoolSocket: '#8b5cf6',     // Violet-500 - boolean logic
      StringSocket: '#64748b',   // Slate-500 - text/strings
      MaterialSocket: '#ec4899', // Pink-500 - materials/appearance
      StateSocket: '#6366f1',    // Indigo-500 - state/data
      default: '#94a3b8',        // Slate-400 - neutral default
    },
  },
  
  labels: {
    color: '#475569',            // Slate-600 - readable secondary text
    colorSecondary: '#94a3b8',   // Slate-400 - muted text for dimensions, etc.
    fontSize: 13,
    fontWeight: 500,
    margin: '2px 4px 2px 20px',
  },
  
  controls: {
    background: '#ffffff',
    backgroundSecondary: '#f8fafc', // Slate-50 - for containers
    border: '#e2e8f0',           // Slate-200
    borderFocus: '#3b82f6',      // Blue-500 - focus state
    borderRadius: 6,
    padding: '8px 12px',
    fontSize: 13,
    gap: 10,
    height: 36,
    step: 0.1,
    // Colors
    textColor: '#1e293b',        // Slate-800 - primary text
    textColorSecondary: '#94a3b8', // Slate-400 - secondary text
    // Action buttons - semantic colors
    buttonAdd: '#10b981',        // Emerald-500 - positive action
    buttonAddHover: '#059669',   // Emerald-600 - hover state
    buttonDelete: '#ef4444',     // Red-500 - destructive action
    buttonDeleteHover: '#dc2626', // Red-600 - hover state
    // Standardized input styling (matches vector controls)
    inputPadding: '4px 8px',     // Standard padding for all inputs
    inputFontSize: 11,           // Standard font size for all inputs
    inputBorderRadius: 3,        // Standard border radius for all inputs
    // Vector control sizing
    vectorInputWidth: 60,
    vectorInputWidthList: 55,
    floatInputWidth: 90,
    floatInputWidthList: 120,
    // Matrix control sizing
    matrixInputWidth: 90,
    matrixContainerPadding: 8,
  },
  
  layout: {
    minWidth: 220,
    maxWidth: 450,
    socketPadding: 26,
    columnGap: 38,
    rowGap: 30,
    rowPadding: 5,
  },
  
  connections: {
    strokeWidth: 2,
    strokeWidthSelected: 4,
    color: '#64748b',            // Slate-500 - neutral connection color
    colorSelected: '#3b82f6',    // Blue-500 - selected connection
    colorHover: '#10b981',       // Emerald-500 - hover connection
    type: 'default',
    animated: false,
    animationDuration: 2000,
    shadow: '0 1px 3px rgba(15, 23, 42, 0.1)',
  },
};

/**
 * Dark theme variant - Modern dark theme with excellent contrast
 * Based on slate-900 foundation with bright accent colors
 */
export const DARK_NODE_THEME: NodeTheme = {
  ...DEFAULT_NODE_THEME,
  container: {
    ...DEFAULT_NODE_THEME.container,
    background: '#0f172a',       // Slate-900 - deep dark background
    border: '#334155',           // Slate-700 - visible but subtle border
    borderSelected: '#3b82f6',   // Blue-500 - bright selection
    shadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    shadowHover: '0 4px 16px rgba(0, 0, 0, 0.35)',
  },
  
  header: {
    ...DEFAULT_NODE_THEME.header,
    background: '#1e293b',       // Slate-800 - slightly lighter header
    color: '#f1f5f9',            // Slate-100 - bright readable text
    borderBottom: '1px solid #334155', // Slate-700
  },
  
  labels: {
    ...DEFAULT_NODE_THEME.labels,
    color: '#cbd5e1',            // Slate-300 - readable light text
    colorSecondary: '#64748b',   // Slate-500 - muted text
  },
  
  controls: {
    ...DEFAULT_NODE_THEME.controls,
    background: '#1e293b',       // Slate-800 - dark input background
    backgroundSecondary: '#0f172a', // Slate-900 - darker containers
    border: '#475569',           // Slate-600 - visible borders
    borderFocus: '#3b82f6',      // Blue-500 - bright focus
    textColor: '#f1f5f9',        // Slate-100 - bright text
    textColorSecondary: '#94a3b8', // Slate-400 - muted text
    // Keep the same semantic button colors - they work well in dark mode
  },
  
  sockets: {
    ...DEFAULT_NODE_THEME.sockets,
    border: '2px solid #0f172a',  // Dark border for contrast
    shadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
    shadowHover: '0 4px 8px rgba(0, 0, 0, 0.5)',
    colors: {
      // Slightly brighter versions for dark theme visibility
      ExprSocket: '#34d399',     // Emerald-400 - brighter green
      VectorSocket: '#60a5fa',   // Blue-400 - brighter blue
      FloatSocket: '#fbbf24',    // Amber-400 - brighter amber
      BoolSocket: '#a78bfa',     // Violet-400 - brighter violet
      StringSocket: '#94a3b8',   // Slate-400 - neutral
      MaterialSocket: '#f472b6', // Pink-400 - brighter pink
      StateSocket: '#818cf8',    // Indigo-400 - brighter indigo
      default: '#cbd5e1',        // Slate-300 - brighter default
    },
  },
  
  connections: {
    ...DEFAULT_NODE_THEME.connections,
    color: '#94a3b8',            // Slate-400 - visible in dark
    colorSelected: '#60a5fa',    // Blue-400 - bright selection
    colorHover: '#34d399',       // Emerald-400 - bright hover
    shadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  },
};
