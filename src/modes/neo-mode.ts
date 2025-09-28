import AdaptiveViewer, { AdaptiveViewerHandle } from '../components/visualizer/AdaptiveViewer';
import { HybridControlPanel } from '../components/control-panel/HybridControlPanel';
import { useAdaptiveEditor } from '../components/editors/AdaptiveEditor';
import { Header } from '../components/header/Header';
import { AsmblrMode } from './types';
import { asViewerComponent } from './utils';

export function makeNeoMode(): AsmblrMode {
  return {
    name: 'Neo',
    label: 'Neo Graph',
    useEditor: () => useAdaptiveEditor({ modeName: 'neo' }),
    HeaderComponent: Header,
    ViewerComponent: asViewerComponent<AdaptiveViewerHandle>(AdaptiveViewer),
    ControlPanelComponent: HybridControlPanel,
  };
}
