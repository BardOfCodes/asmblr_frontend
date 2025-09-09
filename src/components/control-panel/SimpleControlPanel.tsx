import React from 'react';
import styled from 'styled-components';
import { theme } from '../../design/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${theme.spacing.lg};
`;

const GenerateButton = styled.button`
  background: ${theme.colors.primary};
  border: none;
  color: ${theme.colors.textInverse};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-family: ${theme.typography.fontFamily.sans};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.normal};
  cursor: pointer;
  transition: background-color ${theme.transitions.fast};
  border-radius: 0;
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryHover};
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: none;
  }
`;

interface SimpleControlPanelProps {
  editor: any;
  viewerRef: React.RefObject<any>;
}

export const SimpleControlPanel: React.FC<SimpleControlPanelProps> = ({ 
  editor, 
  viewerRef 
}) => {
  const handleGenerateShader = () => {
    // TODO: Wire up shader generation logic
    console.log('Generate Shader clicked');
    console.log('Editor:', editor);
    console.log('Viewer ref:', viewerRef.current);
  };

  return (
    <Container>
      <GenerateButton onClick={handleGenerateShader}>
        Generate Shader
      </GenerateButton>
    </Container>
  );
};
