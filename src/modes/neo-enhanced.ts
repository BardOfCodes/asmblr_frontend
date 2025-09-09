import { HybridViewer, HybridViewerHandle } from '../components/visualizer/HybridViewer';
import { HybridControlPanel } from '../components/control-panel/HybridControlPanel';
import { useEditor } from '../components/editors/NodeEditor';
import { EnhancedHeader } from '../components/header/EnhancedHeader';
import { AsmblrMode } from './types';
import { asViewerComponent } from './utils';

export function makeEnhancedNeoMode(): AsmblrMode {
  return {
    name: 'Neo',
    label: 'Neo Graph',
    useEditor: () => useEditor({ modeName: 'neo' }),
    HeaderComponent: EnhancedHeader,
    ViewerComponent: asViewerComponent<HybridViewerHandle>(HybridViewer),
    ControlPanelComponent: HybridControlPanel,
  };
}
