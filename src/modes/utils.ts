import React from 'react';
import { ViewerHandle } from './types';

export function asViewerComponent<T extends ViewerHandle>(
  Component: React.ForwardRefExoticComponent<React.RefAttributes<T>>
): React.ForwardRefExoticComponent<React.RefAttributes<ViewerHandle>> {
  return Component as unknown as React.ForwardRefExoticComponent<React.RefAttributes<ViewerHandle>>;
}