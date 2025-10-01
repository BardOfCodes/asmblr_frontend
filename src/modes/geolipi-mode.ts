import { GeoLIPIControlPanel } from '../components/control-panel/GeoLIPIControlPanel';
import { AsmblrMode } from './types';
import { createStandardMode } from './mode-factory';

export function makeGeoLIPIMode(): AsmblrMode {
  return createStandardMode('geolipi', 'GeoLIPI Graph', GeoLIPIControlPanel);
}
