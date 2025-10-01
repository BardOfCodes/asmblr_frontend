// Mode Factory - Reduces boilerplate while preserving flexibility
import React from 'react';
import { AsmblrMode, ViewerHandle } from './types';
import { useAdaptiveEditor } from '../components/editors/AdaptiveEditor';
import { Header } from '../components/header/Header';
import AdaptiveViewer, { AdaptiveViewerHandle } from '../components/visualizer/AdaptiveViewer';
import { asViewerComponent } from './utils';

/**
 * Configuration for creating a mode
 */
export interface ModeConfig {
  name: string;
  label: string;
  controlPanelComponent: React.ComponentType<{
    editor: any;
    viewerRef: React.RefObject<ViewerHandle>;
  }>;
  // Optional overrides for flexibility
  editorHook?: () => any;
  headerComponent?: React.ComponentType<{
    editor: any;
    modeName: string;
    setMode: (name: string) => void;
  }>;
  viewerComponent?: React.ForwardRefExoticComponent<React.RefAttributes<ViewerHandle>>;
}

/**
 * Default components that can be overridden
 */
const DEFAULT_COMPONENTS = {
  editorHook: (modeName: string) => () => useAdaptiveEditor({ modeName }),
  headerComponent: Header as any, // Type assertion to handle interface mismatch
  viewerComponent: asViewerComponent<AdaptiveViewerHandle>(AdaptiveViewer),
};

/**
 * Factory function to create modes with sensible defaults
 * Reduces boilerplate while allowing full customization when needed
 */
export function createMode(config: ModeConfig): AsmblrMode {
  return {
    name: config.name,
    label: config.label,
    useEditor: config.editorHook || DEFAULT_COMPONENTS.editorHook(config.name),
    HeaderComponent: config.headerComponent || DEFAULT_COMPONENTS.headerComponent,
    ViewerComponent: config.viewerComponent || DEFAULT_COMPONENTS.viewerComponent,
    ControlPanelComponent: config.controlPanelComponent,
  };
}

/**
 * Convenience function for creating standard modes
 * Uses all defaults except the control panel
 */
export function createStandardMode(
  name: string,
  label: string,
  controlPanelComponent: ModeConfig['controlPanelComponent']
): AsmblrMode {
  return createMode({
    name,
    label,
    controlPanelComponent,
  });
}
