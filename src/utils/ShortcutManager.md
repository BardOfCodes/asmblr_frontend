# Keyboard Shortcut Manager

## Overview

The ShortcutManager provides a centralized system for managing mode-specific keyboard shortcuts in the ASMBLR application. Each mode can register its main function, and users can trigger it using **Cmd+Enter** (Mac) or **Ctrl+Enter** (Windows/Linux).

## Architecture

### Components

1. **ShortcutManager** - Singleton class that manages registrations and keyboard events
2. **useMainFunctionRegistration** - React hook for registering main functions
3. **useShortcutManager** - React hook for managing the shortcut manager lifecycle

### Flow

```
User presses Cmd/Ctrl+Enter
    ↓
ShortcutManager.handleKeyDown()
    ↓
ShortcutManager.executeMainFunction()
    ↓
Calls registered function for current mode
    ↓
Mode-specific action (e.g., generate shader)
```

## Usage

### 1. App-Level Integration

```typescript
// App.tsx
import { useShortcutManager } from './utils/ShortcutManager';

const AppContent: React.FC = () => {
  const [modeName, setModeName] = useState<string | null>(null);
  
  // Initialize keyboard shortcut manager
  useShortcutManager(modeName);
  
  // ... rest of component
};
```

### 2. Control Panel Registration

```typescript
// GeoLIPIControlPanel.tsx
import { useMainFunctionRegistration } from '../../utils/ShortcutManager';

export const GeoLIPIControlPanel: React.FC<Props> = ({ editor, viewerRef }) => {
  const handleGenerateShader = useCallback(async () => {
    // Main function logic
  }, [editor, settings, viewerRef]);

  // Register as main function for this mode
  useMainFunctionRegistration(
    'GeoLIPI Graph', 
    handleGenerateShader, 
    'Generate GeoLIPI shader from node graph (Cmd/Ctrl+Enter)'
  );

  // ... rest of component
};
```

## Registered Functions by Mode

| Mode | Function | Description |
|------|----------|-------------|
| `GeoLIPI Graph` | `handleGenerateGeoLIPIShader` | Generate GeoLIPI shader from node graph |
| `SySL Graph` | `handleGenerateSySLShader` | Generate SySL shader from node graph |
| `Neo Graph` | `handleGenerateShader` | Generate Neo shader from node graph |

## Features

### ✅ **Cross-Platform Shortcuts**
- **Mac**: Cmd+Enter
- **Windows/Linux**: Ctrl+Enter

### ✅ **Mode-Aware Execution**
- Automatically calls the correct function based on current mode
- No function call if no mode is active

### ✅ **Type Safety**
- Full TypeScript support
- Proper error handling and logging

### ✅ **Easy Extension**
- Simple hook-based registration
- Automatic cleanup on component unmount

### ✅ **Debug Support**
- Comprehensive logging for troubleshooting
- Registration status tracking

## Adding New Modes

To add keyboard shortcut support for a new mode:

1. **Create the main function** in your control panel:
```typescript
const handleMainAction = useCallback(async () => {
  // Your mode's main logic
}, [dependencies]);
```

2. **Register the function**:
```typescript
useMainFunctionRegistration(
  'Your Mode Name', 
  handleMainAction, 
  'Description of what this does (Cmd/Ctrl+Enter)'
);
```

3. **Ensure mode name matches** the key used in `Modes` object in `modes.ts`

## Error Handling

The system gracefully handles:
- **No current mode**: Logs warning, no action taken
- **Unregistered mode**: Logs warning, no action taken  
- **Function execution errors**: Logs error, returns false
- **Multiple registrations**: Last registration wins

## Performance

- **Minimal overhead**: Event listener only active when app is running
- **Efficient lookup**: O(1) mode-to-function mapping
- **Clean lifecycle**: Automatic cleanup prevents memory leaks

## Testing

```typescript
import { ShortcutManager } from './ShortcutManager';

// Test registration
const mockFunction = jest.fn();
ShortcutManager.register('test-mode', mockFunction);
ShortcutManager.setCurrentMode('test-mode');

// Test execution
await ShortcutManager.executeMainFunction();
expect(mockFunction).toHaveBeenCalled();
```
