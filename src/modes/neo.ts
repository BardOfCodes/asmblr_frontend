import { NewReglViewer, ReglViewerHandle } from '../components/NewReglViewer';
import { ControlPanel } from '../components/ControlPanel';
import { useEditor } from '../components/NodeEditor';
import { Header } from '../components/Header';
import { AsmblrMode } from './types';
import { asViewerComponent } from './utils';

export function makeNeoMode(): AsmblrMode {
  return {
    name: 'Neo',
    label: 'Neo Graph',
    useEditor: () => useEditor({ modeName: 'neo' }),
    HeaderComponent: Header,
    ViewerComponent: asViewerComponent<ReglViewerHandle>(NewReglViewer),
    ControlPanelComponent: ControlPanel,
  };
}