import { MigumiControlPanel } from '../components/control-panel/MigumiControlPanel';
import { AsmblrMode } from './types';
import { createStandardMode } from './mode-factory';

export function makeMigumiMode(): AsmblrMode {
  return createStandardMode('migumi', 'Migumi Graph', MigumiControlPanel);
}
