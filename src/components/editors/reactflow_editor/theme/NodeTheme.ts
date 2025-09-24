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
    fontSize: number;
    fontWeight: number;
    margin: string;
  };
  
  // Controls
  controls: {
    background: string;
    border: string;
    borderFocus: string;
    borderRadius: number;
    padding: string;
    fontSize: number;
    gap: number;
    height: number;
    step: number;
  };
  
  // Layout
  layout: {
    minWidth: number;
    maxWidth: number;
    socketPadding: number;
    columnGap: number;
    rowGap: number;
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
 * Default light theme
 */
export const DEFAULT_NODE_THEME: NodeTheme = {
  container: {
    background: '#ffffff',
    border: '#d9d9d9',
    borderSelected: '#1890ff',
    borderRadius: 8,
    shadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    shadowHover: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
  },
  
  header: {
    background: '#f5f5f5',
    color: '#333333',
    fontSize: 13,
    fontWeight: 600,
    padding: '8px 12px',
    borderBottom: '1px solid #e8e8e8',
    height: 32,
  },
  
  body: {
    padding: '10px',
    gap: 10,
  },
  
  sockets: {
    size: {
      normal: 20,
      small: 16,
    },
    offsetFactors: {
      left: 1.0,
      right: 0.75,
    },
    border: '2px solid white',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    shadowHover: '0 2px 6px rgba(0, 0, 0, 0.3)',
    colors: {
      ExprSocket: '#4CAF50',
      VectorSocket: '#2196F3',
      FloatSocket: '#FF9800',
      BoolSocket: '#9C27B0',
      StringSocket: '#607D8B',
      MaterialSocket: '#E91E63',
      StateSocket: '#795548',
      default: '#9E9E9E',
    },
  },
  
  labels: {
    color: '#666666',
    fontSize: 11,
    fontWeight: 500,
    margin: '0 4px',
  },
  
  controls: {
    background: '#ffffff',
    border: '#d9d9d9',
    borderFocus: '#1890ff',
    borderRadius: 4,
    padding: '8px 10px',
    fontSize: 12,
    gap: 10,
    height: 36,
    step: 0.1,
  },
  
  layout: {
    minWidth: 200,
    maxWidth: 450,
    socketPadding: 26,
    columnGap: 18,
    rowGap: 10,
  },
  
  connections: {
    strokeWidth: 4,
    strokeWidthSelected: 5,
    color: '#6366F1',
    colorSelected: '#1890ff',
    colorHover: '#4096ff',
    type: 'default',
    animated: false,
    animationDuration: 2000,
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Dark theme variant
 */
export const DARK_NODE_THEME: NodeTheme = {
  ...DEFAULT_NODE_THEME,
  container: {
    ...DEFAULT_NODE_THEME.container,
    background: '#2d2d2d',
    border: '#4a4a4a',
    borderSelected: '#1890ff',
  },
  
  header: {
    ...DEFAULT_NODE_THEME.header,
    background: '#3a3a3a',
    color: '#ffffff',
    borderBottom: '1px solid #4a4a4a',
  },
  
  labels: {
    ...DEFAULT_NODE_THEME.labels,
    color: '#cccccc',
  },
  
  controls: {
    ...DEFAULT_NODE_THEME.controls,
    background: '#3a3a3a',
    border: '#4a4a4a',
  },
  
  connections: {
    ...DEFAULT_NODE_THEME.connections,
    color: '#6B7280',
    colorSelected: '#3B82F6',
    colorHover: '#60A5FA',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  },
};
