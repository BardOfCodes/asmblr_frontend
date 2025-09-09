import { CleanAsmblrMode } from '../types';
import { NeoEditor } from './NeoEditor';
import { NeoViewer } from './NeoViewer';
import { NeoControlPanel } from './NeoControlPanel';

export const createNeoMode = (): CleanAsmblrMode => ({
  name: 'neo',
  label: 'Neo Graph',
  
  editor: {
    Component: NeoEditor,
  },
  
  viewer: {
    Component: NeoViewer,
  },
  
  controlPanel: {
    Component: NeoControlPanel,
  },
  
  initialize: () => {
    console.log('Initializing Neo mode');
    // Neo-specific initialization logic
  },
  
  cleanup: () => {
    console.log('Cleaning up Neo mode');
    // Neo-specific cleanup logic
  },
});

export * from './NeoEditor';
export * from './NeoViewer';
export * from './NeoControlPanel';

