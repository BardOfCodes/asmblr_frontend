# ASMBLR Frontend Repository Information

## Overview

**ASMBLR** is a node-based geometry editor built with React, TypeScript, and Vite. It provides a visual programming interface for creating and editing geometric shaders through a ReactFlow-based node editor system. The application supports multiple modes (Neo Graph, SySL Graph, GeoLIPI Graph) and features real-time shader visualization.

## Project Structure

### Root Configuration Files

- **`package.json`**: Main project configuration
  - Name: `shader-editor` 
  - Type: ES Module
  - Main dependencies: React 19, ReactFlow 11, Monaco Editor, Ant Design, Three.js, REGL
  - Build system: Vite + TypeScript
  - Testing: Vitest with jsdom environment

- **`vite.config.ts`**: Vite build configuration with React and GLSL plugin support
- **`tsconfig.json`**: TypeScript project references (app + node configs)
- **`tsconfig.app.json`**: Main app TypeScript configuration (ES2020, React JSX, strict mode)
- **`eslint.config.js`**: ESLint configuration with React hooks and TypeScript support
- **`vitest.config.ts`**: Test configuration using jsdom environment

### Build System & Dependencies

**Core Framework:**
- React 19.0.0 with TypeScript
- Vite 4.3.2 for build tooling
- ES2020 target with bundler module resolution

**Key Libraries:**
- **ReactFlow 11.10.1**: Visual node editor framework
- **Monaco Editor 4.6.0**: Code editor component
- **Ant Design 5.21.5**: UI component library
- **Three.js 0.152.2**: 3D graphics library
- **REGL 2.1.0**: WebGL abstraction layer
- **Styled Components 5.3.10**: CSS-in-JS styling

**Shader & Graphics:**
- `vite-plugin-glsl`: GLSL shader file support
- `glslify`: GLSL module system
- `gl-matrix`: Matrix operations
- `texturity.js`: Texture utilities

**Development Tools:**
- Vitest for testing with coverage support
- ESLint with TypeScript and React rules
- Node generation script (`generate_nodes_from_json.py`)

### Source Code Architecture

#### `/src` - Main Application Code

**Entry Points:**
- `main.tsx`: React application entry point
- `App.tsx`: Main app component with mode management and error boundaries
- `index.css`: Global styles

**Core Architecture Patterns:**

1. **Mode-Based Architecture** (`/modes/`)
   - `modes.ts`: Central mode registry (Neo, SySL, GeoLIPI)
   - `types.ts`: Mode interface definitions
   - Individual mode implementations with clean component separation

2. **Context-Based State Management** (`/store/`)
   - `AppContext.tsx`: Global app state with reducer pattern
   - `SettingsContext.tsx`: UI settings and preferences
   - `types.ts`: State type definitions

3. **Modular Component System** (`/components/`)

#### Component Structure

**Layout Components** (`/components/layout/`)
- `ModularLayout.tsx`: Main layout with resizable panels
- `ResizableLayout.tsx`: Base resizable layout system
- `CleanModeLayout.tsx`: Simplified layout variant
- `SimpleDebugLayout.tsx`: Error fallback layout

**Header Components** (`/components/header/`)
- `Header.tsx`: Application header
- `ModePicker.tsx`: Mode selection interface

**Editor System** (`/components/editors/`)
- `AdaptiveEditor.tsx`: Editor wrapper component
- `CodeEditor.tsx`: Monaco-based code editor
- **ReactFlow Editor** (`/reactflow_editor/`): Complete visual node editor system

**Viewer System** (`/components/visualizer/` & `/viewers/`)
- Multiple viewer implementations (IFrame, REGL, Hybrid)
- `ViewerFactory.ts`: Viewer instantiation system
- Adaptive viewer selection based on mode

**Control Panels** (`/components/control-panel/`)
- Mode-specific control panels (Neo, SySL, GeoLIPI, Hybrid)
- `SettingsDialog.tsx`: Application settings interface

#### ReactFlow Editor Deep Dive (`/src/components/editors/reactflow_editor/`)

**Core System:**
- `ReactFlowEditor.tsx`: Main editor component with node management
- `ReactFlowCore.ts`: Core editor logic and state management
- `ReactFlowGraphManager.ts`: Graph operations and serialization
- `SerializationAdapter.ts`: Data format conversion

**Node System:**
- `/definitions/`: Node type definitions and registry
- `/nodes/auto_nodes/`: Auto-generated node definitions from JSON
- `/components/`: Custom node components (BasicNode, CustomNode)
- Node categories: primitives (2D/3D), transforms, combinators, materials

**Control System:**
- `/controls/`: Reusable control components
- `TypeParser.ts`: Control type parsing and validation
- Vector, Matrix, String, Checkbox, Select controls

**Services & Utilities:**
- `/services/ProjectService.ts`: Project management
- `/utils/`: Graph serialization, node registry, sizing utilities
- `/hooks/`: Custom React hooks for editor state

**Theming & Styling:**
- `/theme/`: Node theming system
- `/styles/`: CSS for editor and theme customization

#### Type System (`/src/types/`)

Comprehensive TypeScript definitions for:
- `node.ts`: Node and connection types
- `control.ts`: Control component interfaces  
- `editor.ts`: Editor state and actions
- `viewer.ts`: Viewer component interfaces
- `components.ts`: Reusable component types

#### Utility Systems

**Debug & Development** (`/src/utils/`)
- `debug.ts`: Centralized logging system
- `eventListeners.ts`: Event management utilities
- Comprehensive test coverage

**Asset Management** (`/src/assets/`)
- Default project templates
- React logo and static assets
- IFrame loader templates

**Shader Resources** (`/src/renderer/`)
- GLSL shader files (vertex/fragment)
- Default rendering pipeline

## Build & Development Workflow

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn start        # Alias for dev

# Building
yarn build        # TypeScript compilation + Vite build
yarn preview      # Preview production build

# Code Quality
yarn lint         # ESLint checking
yarn test         # Run Vitest tests
yarn test:ui      # Interactive test UI
yarn test:coverage # Test coverage report

# Node Generation
yarn gen:nodes    # Generate node definitions from JSON
```

### Development Setup

1. **Prerequisites**: Node.js, Yarn package manager
2. **Installation**: `yarn install`
3. **Development**: `yarn dev` (starts on localhost:5173)
4. **Node Updates**: `yarn gen:nodes --force` to regenerate node definitions

### Build Process

1. **TypeScript Compilation**: `tsc -b` compiles all TypeScript
2. **Vite Build**: Bundles application with tree-shaking and optimization
3. **Asset Processing**: GLSL shaders, static assets, and fonts
4. **Output**: Optimized bundle in `/dist` directory

## Key Features & Capabilities

### Multi-Mode Architecture
- **Neo**: Advanced node-based editing
- **SySL**: Specialized shader language support  
- **GeoLIPI**: Geometric processing pipeline
- Runtime mode switching with persistent preferences

### Visual Node Editor
- ReactFlow-based drag-and-drop interface
- Auto-layout with Dagre algorithm
- Context menus and node search
- Real-time connection validation
- Undo/redo functionality

### Shader Pipeline
- GLSL shader compilation and rendering
- Real-time uniform updates from node controls
- Multiple viewer backends (WebGL, Three.js)
- Screenshot and export capabilities

### Project Management
- Save/load project files
- JSON-based serialization
- Template system for quick starts
- Version compatibility handling

## Testing Strategy

### Test Framework
- **Vitest**: Fast unit testing with Vite integration
- **jsdom**: Browser environment simulation
- **Testing Library**: React component testing utilities
- **Coverage**: V8 coverage reporting

### Test Structure
- Unit tests for utilities and core logic
- Component tests for React components
- Integration tests for editor workflows
- Coverage reporting and CI integration

## Development Guidelines

### Code Organization
- Modular component architecture
- Clear separation of concerns
- TypeScript for type safety
- Consistent naming conventions

### Performance Considerations
- Lazy loading for large components
- Memoization for expensive computations
- Efficient ReactFlow node rendering
- Debounced shader compilation

### Error Handling
- Comprehensive error boundaries
- Graceful fallbacks for failed modes
- Debug logging system
- User-friendly error messages

## Extension Points

### Adding New Modes
1. Create mode definition in `/modes/`
2. Implement required components (Editor, Viewer, ControlPanel)
3. Register in `modes.ts`
4. Add mode-specific node definitions if needed

### Custom Node Types
1. Define node schema in JSON format
2. Run `yarn gen:nodes` to generate TypeScript definitions
3. Implement custom controls if needed
4. Register with NodeRegistry

### New Viewer Backends
1. Implement viewer interface in `/viewers/`
2. Add to ViewerFactory
3. Update mode configurations
4. Test with existing shader pipeline

## Dependencies & Licensing

The project uses standard open-source libraries with permissive licenses. Key dependencies are regularly updated for security and performance. The build system supports modern JavaScript features while maintaining broad browser compatibility.

## Deployment Considerations

- Static site generation compatible
- CDN-friendly asset structure  
- Environment-specific configuration support
- Progressive web app capabilities
- WebGL requirement for full functionality

---

This repository represents a sophisticated visual programming environment for shader development, built with modern web technologies and designed for extensibility and performance.
