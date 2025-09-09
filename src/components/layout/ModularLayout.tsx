import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSettings } from '../../store/SettingsContext';
import { Card, Panel, Stack, Text, Title } from '../../design/components';
import { theme } from '../../design/theme';
import type { AsmblrMode, ViewerHandle } from '../../modes/types';

interface LayoutProps {
  $headerVisible: boolean;
  $nodeEditorVisible: boolean;
  $viewerVisible: boolean;
  $controlPanelVisible: boolean;
}

const Container = styled.div<LayoutProps>`
  display: grid;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: ${theme.colors.backgroundSecondary};
  
  grid-template-rows: ${props => {
    const rows = [];
    if (props.$headerVisible) rows.push('auto');
    
    const hasMainContent = props.$nodeEditorVisible || props.$viewerVisible;
    if (hasMainContent) rows.push('1fr');
    
    if (props.$controlPanelVisible) rows.push('auto');
    
    return rows.join(' ') || '1fr';
  }};
  
  grid-template-columns: ${props => {
    if (!props.$nodeEditorVisible && !props.$viewerVisible) return '1fr';
    if (props.$nodeEditorVisible && !props.$viewerVisible) return '1fr';
    if (!props.$nodeEditorVisible && props.$viewerVisible) return '1fr';
    return '1fr 1fr'; // Both visible - equal width
  }};
  
  grid-template-areas: ${props => {
    const areas = [];
    
    if (props.$headerVisible) {
      areas.push('"header header"');
    }
    
    if (props.$nodeEditorVisible && props.$viewerVisible) {
      areas.push('"editor viewer"');
    } else if (props.$nodeEditorVisible) {
      areas.push('"editor editor"');
    } else if (props.$viewerVisible) {
      areas.push('"viewer viewer"');
    }
    
    if (props.$controlPanelVisible) {
      areas.push('"controls controls"');
    }
    
    return areas.join(' ') || '"main"';
  }};
  
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
`;

const StyledCard = styled(Card)`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SquareContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Maintain 1:1 aspect ratio */
`;

const SquareContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

interface ModularLayoutProps {
  mode: AsmblrMode;
  modeName: string;
  setMode: (name: string) => void;
}

export const ModularLayout: React.FC<ModularLayoutProps> = ({ mode, modeName, setMode }) => {
  const { settings } = useSettings();
  const { layout } = settings.ui;
  const viewerRef = useRef<ViewerHandle>(null);
  
  const editor = mode.useEditor();
  const Viewer = mode.ViewerComponent;
  const ControlPanel = mode.ControlPanelComponent;

  // Check if any main content is visible
  const hasVisibleContent = layout.header.visible || layout.nodeEditor.visible || 
                           layout.viewer.visible || layout.controlPanel.visible;

  if (!hasVisibleContent) {
    return (
      <EmptyState>
        <EmptyStateContent>
          <Title $level={3}>All panels are hidden</Title>
          <Text $variant="secondary" $size="sm">
            Open Settings to show interface panels
          </Text>
        </EmptyStateContent>
      </EmptyState>
    );
  }

  return (
    <Container
      $headerVisible={layout.header.visible}
      $nodeEditorVisible={layout.nodeEditor.visible}
      $viewerVisible={layout.viewer.visible}
      $controlPanelVisible={layout.controlPanel.visible}
    >
      {layout.header.visible && (
        <Panel $area="header">
          <StyledCard>
            <mode.HeaderComponent 
              editor={editor} 
              modeName={modeName} 
              setMode={setMode} 
            />
          </StyledCard>
        </Panel>
      )}

      {layout.nodeEditor.visible && (
        <Panel $area="editor">
          <StyledCard>
            {editor.view}
          </StyledCard>
        </Panel>
      )}

      {layout.viewer.visible && (
        <Panel $area="viewer">
          <StyledCard>
            <SquareContainer>
              <SquareContent>
                <Viewer ref={viewerRef} />
              </SquareContent>
            </SquareContainer>
          </StyledCard>
        </Panel>
      )}

      {layout.controlPanel.visible && (
        <Panel $area="controls">
          <StyledCard>
            <ControlPanel editor={editor} viewerRef={viewerRef} />
          </StyledCard>
        </Panel>
      )}
    </Container>
  );
};