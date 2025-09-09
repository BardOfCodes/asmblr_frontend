import React from 'react';
import { EnhancedHeader } from './EnhancedHeader';

interface CleanEnhancedHeaderProps {
  modeName: string;
  setMode: (name: string) => void;
}

export const CleanEnhancedHeader: React.FC<CleanEnhancedHeaderProps> = (props) => {
  // Adapt the old header interface to the new clean interface
  return <EnhancedHeader {...props} />;
};
