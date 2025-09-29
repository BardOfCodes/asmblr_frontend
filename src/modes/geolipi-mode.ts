import AdaptiveViewer, { AdaptiveViewerHandle } from '../components/visualizer/AdaptiveViewer';
import { GeoLIPIControlPanel } from '../components/control-panel/GeoLIPIControlPanel';
import { useAdaptiveEditor } from '../components/editors/AdaptiveEditor';
import { Header } from '../components/header/Header';
import { AsmblrMode } from './types';
import { asViewerComponent } from './utils';

export function makeGeoLIPIMode(): AsmblrMode {
  return {
    name: 'GeoLIPI',
    label: 'GeoLIPI Graph',
    useEditor: () => useAdaptiveEditor({ modeName: 'geolipi' }),
    HeaderComponent: Header,
    ViewerComponent: asViewerComponent<AdaptiveViewerHandle>(AdaptiveViewer),
    ControlPanelComponent: GeoLIPIControlPanel,
  };
}
