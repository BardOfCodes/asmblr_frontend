import { SySLControlPanel } from '../components/control-panel/SySLControlPanel';
import { AsmblrMode } from './types';
import { createStandardMode } from './mode-factory';

export function makeSySLMode(): AsmblrMode {
  return createStandardMode('sysl', 'SySL Graph', SySLControlPanel);
}
