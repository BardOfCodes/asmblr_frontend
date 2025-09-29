import AdaptiveViewer, { AdaptiveViewerHandle } from '../components/visualizer/AdaptiveViewer';
import { SySLControlPanel } from '../components/control-panel/SySLControlPanel';
import { useAdaptiveEditor } from '../components/editors/AdaptiveEditor';
import { Header } from '../components/header/Header';
import { AsmblrMode } from './types';
import { asViewerComponent } from './utils';

export function makeSySLMode(): AsmblrMode {
  return {
    name: 'SySL',
    label: 'SySL Graph',
    useEditor: () => useAdaptiveEditor({ modeName: 'sysl' }),
    HeaderComponent: Header,
    ViewerComponent: asViewerComponent<AdaptiveViewerHandle>(AdaptiveViewer),
    ControlPanelComponent: SySLControlPanel,
  };
}
