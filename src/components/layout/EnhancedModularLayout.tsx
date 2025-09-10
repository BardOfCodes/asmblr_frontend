import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSettings } from '../../store/SettingsContext';
import { Card, Text, Title, HeaderPanel } from '../../design/components';
import { theme } from '../../design/theme';
import { ResizableLayout } from './ResizableLayout';
import type { AsmblrMode, ViewerHandle } from '../../modes/types';

const StyledCard = styled(Card)`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0;
  border-radius: 0;
  border: none;
  background: ${theme.colors.white};
  box-shadow: none;
  transition: none;
`;

const PanelContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
`;

const ViewerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 0;
  overflow: hidden;
  background: ${theme.colors.backgroundSecondary};
  padding-left: 10px; /* Add left padding to prevent resize handle interference */
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${theme.colors.backgroundSecondary};
`;

const EmptyStateContent = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  max-width: 400px;
`;

interface EnhancedModularLayoutProps {
  mode: AsmblrMode;
  modeName: string;
  setMode: (name: string) => void;
}

export const EnhancedModularLayout: React.FC<EnhancedModularLayoutProps> = ({ 
  mode, 
  modeName, 
  setMode 
}) => {
  console.log('EnhancedModularLayout rendering with:', { mode, modeName });
  
  try {
    const { settings } = useSettings();
    console.log('Settings loaded:', settings);
    
    const viewerRef = useRef<ViewerHandle>(null);
    
    console.log('Getting editor...');
    const editor = mode.useEditor();
    console.log('Editor loaded:', editor);
    
    console.log('Getting components...');
    const Viewer = mode.ViewerComponent;
    const ControlPanel = mode.ControlPanelComponent;
    console.log('Components loaded:', { Viewer, ControlPanel });

  // Header should always be visible so users can access settings
  // Check if any other panels are visible
  const { layout } = settings.ui;
  const hasMainContent = layout.nodeEditor.visible || layout.viewer.visible || layout.controlPanel.visible;

  if (!hasMainContent) {
    // Still show header even when main content is hidden
    return (
      <ResizableLayout
        header={(
          <HeaderPanel>
            <mode.HeaderComponent 
              editor={editor} 
              modeName={modeName} 
              setMode={setMode} 
            />
          </HeaderPanel>
        )}
      >
        <EmptyStateContent style={{ margin: 'auto', gridArea: 'main' }}>
          <Title $level={3}>Main panels are hidden</Title>
          <Text $variant="secondary" $size="sm">
            Use the Settings button above to show editor, viewer, or control panel
          </Text>
        </EmptyStateContent>
      </ResizableLayout>
    );
  }

  return (
    <ResizableLayout
      header={(
        <HeaderPanel>
          <mode.HeaderComponent 
            editor={editor} 
            modeName={modeName} 
            setMode={setMode} 
          />
        </HeaderPanel>
      )}

      editor={layout.nodeEditor.visible ? (
        <PanelContent>
          <StyledCard>
            {editor.view}
          </StyledCard>
        </PanelContent>
      ) : undefined}

      viewer={layout.viewer.visible ? (
        <PanelContent>
          <StyledCard>
            <ViewerContainer>
              <Viewer ref={viewerRef} />
            </ViewerContainer>
          </StyledCard>
        </PanelContent>
      ) : undefined}

      controlPanel={layout.controlPanel.visible ? (
        <PanelContent>
          <StyledCard>
            <ControlPanel editor={editor} viewerRef={viewerRef} />
          </StyledCard>
        </PanelContent>
      ) : undefined}
    />
  );
  
  } catch (error) {
    console.error('Error in EnhancedModularLayout:', error);
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <h2>Error Loading Interface</h2>
        <p>Mode: {modeName}</p>
        <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onClick={() => {
          localStorage.removeItem('asmblr-enhanced-mode');
          window.location.reload();
        }}>
          Reset and Reload
        </button>
      </div>
    );
  }
};
