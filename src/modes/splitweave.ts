import { NewReglViewer, ReglViewerHandle } from '../components/NewReglViewer';
import { ControlPanel } from '../components/ControlPanel';
import { useEditor } from '../components/NodeEditor';
import { Header } from '../components/Header';
import { AsmblrMode } from './types';
import { asViewerComponent } from './utils';

export function makeSplitWeaveMode(): AsmblrMode {
  return {
    name: 'SplitWeave',
    label: 'SplitWeave Graph',
    HeaderComponent: Header,
    useEditor: () => useEditor({}),
    ViewerComponent: asViewerComponent<ReglViewerHandle>(NewReglViewer),
    ControlPanelComponent: ControlPanel,
  };
}