import { HybridControlPanel } from '../components/control-panel/HybridControlPanel';
import { AsmblrMode } from './types';
import { createStandardMode } from './mode-factory';

export function makeNeoMode(): AsmblrMode {
  return createStandardMode('neo', 'Neo Graph', HybridControlPanel);
}
