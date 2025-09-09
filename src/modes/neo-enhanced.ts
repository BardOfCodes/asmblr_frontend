import AdaptiveViewer, { AdaptiveViewerHandle } from '../components/visualizer/AdaptiveViewer';
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
    ViewerComponent: asViewerComponent<AdaptiveViewerHandle>(AdaptiveViewer),
    ControlPanelComponent: HybridControlPanel,
  };
}
