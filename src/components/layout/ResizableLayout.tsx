import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSettings } from '../../store/SettingsContext';
import { theme } from '../../design/theme';

interface PanelSizes {
  editorWidth: number;
  controlPanelHeight: number;
  headerHeight: number;
}

interface ResizableLayoutProps {
  header?: React.ReactNode;
  editor?: React.ReactNode;
  viewer?: React.ReactNode;
  controlPanel?: React.ReactNode;
  children?: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: ${theme.colors.background};
  position: relative;
`;

const Panel = styled.div<{ $gridArea: string; $visible: boolean }>`
  grid-area: ${props => props.$gridArea};
  overflow: hidden;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderDark};
  display: ${props => props.$visible ? 'block' : 'none'};
  position: relative;
`;

const ResizeHandle = styled.div<{ $direction: 'horizontal' | 'vertical' }>`
  position: absolute;
  background: transparent;
  z-index: 1000; /* Higher z-index to ensure it's above canvas elements */
  transition: all 0.2s ease;
  
  ${props => props.$direction === 'horizontal' ? `
    width: 24px;
    height: 100%;
    right: -12px;
    top: 0;
    cursor: col-resize;
    
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 3px;
      height: 60px;
      background: ${theme.colors.borderDark};
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
  ` : `
    height: 24px;
    width: 100%;
    bottom: -12px;
    left: 0;
    cursor: row-resize;
    
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 3px;
      background: ${theme.colors.borderDark};
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
  `}

  &:hover {
    background: ${theme.colors.primary}20;
    
    &::before {
      opacity: 1;
      background: ${theme.colors.primary};
    }
  }
  
  /* Subtle visual indicator for better UX */
  background: rgba(0, 122, 204, 0.03);

  &:active {
    background: ${props => props.theme?.colors?.primary || '#007acc'}30;
    
    &::before {
      opacity: 1;
      background: ${theme.colors.primary};
    }
  }
`;

const STORAGE_KEY = 'asmblr-panel-sizes';
const MIN_PANEL_SIZE = 120;
const MIN_CONTROL_PANEL_SIZE = 80; // Smaller minimum for control panel
const DEFAULT_SIZES: PanelSizes = {
  editorWidth: 500,
  controlPanelHeight: 200,
  headerHeight: 56, // Match the HeaderContainer height from design/components.ts
};

export const ResizableLayout: React.FC<ResizableLayoutProps> = ({
  header,
  editor,
  viewer,
  controlPanel,
  children
}) => {
  const { settings } = useSettings();
  const [sizes, setSizes] = useState<PanelSizes>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_SIZES, ...JSON.parse(saved) } : DEFAULT_SIZES;
  });
  
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const startSizesRef = useRef<PanelSizes>(sizes);

  // Save sizes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sizes));
  }, [sizes]);

  const handleMouseDown = useCallback((handle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(handle);
    startPositionRef.current = { x: e.clientX, y: e.clientY };
    startSizesRef.current = sizes;
    
    // Add visual feedback immediately
    document.body.style.cursor = handle.includes('right') ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  }, [sizes]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const deltaX = e.clientX - startPositionRef.current.x;
    const deltaY = e.clientY - startPositionRef.current.y;
    const containerRect = containerRef.current.getBoundingClientRect();

    setSizes(prevSizes => {
      const newSizes = { ...prevSizes };

      switch (isDragging) {
        case 'editor-right':
          // Horizontal resize between editor and viewer
          newSizes.editorWidth = Math.max(
            MIN_PANEL_SIZE,
            Math.min(
              containerRect.width - MIN_PANEL_SIZE,
              startSizesRef.current.editorWidth + deltaX
            )
          );
          break;

        case 'control-top':
          // Vertical resize for control panel with smaller minimum
          newSizes.controlPanelHeight = Math.max(
            MIN_CONTROL_PANEL_SIZE,
            Math.min(
              containerRect.height - sizes.headerHeight - MIN_PANEL_SIZE,
              startSizesRef.current.controlPanelHeight - deltaY
            )
          );
          break;
      }

      return newSizes;
    });
  }, [isDragging, sizes.headerHeight]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isDragging.includes('right') ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Memoize visible panels to prevent recreating object on every render
  const visiblePanels = useMemo(() => ({
    header: !!header,
    editor: !!editor,
    viewer: !!viewer,
    controlPanel: !!controlPanel,
  }), [header, editor, viewer, controlPanel]);

  // Memoize grid template calculation to prevent recalculation on every render
  const gridTemplate = useMemo(() => {
    const rows = [];
    const areas = [];
    
    // Header row
    if (visiblePanels.header) {
      rows.push(`${sizes.headerHeight}px`);
      areas.push('"header header"');
    }
    
    // Main content area (editor + viewer)
    const hasMainContent = visiblePanels.editor || visiblePanels.viewer;
    if (hasMainContent) {
      const mainHeight = visiblePanels.controlPanel 
        ? `calc(100vh - ${sizes.headerHeight}px - ${sizes.controlPanelHeight}px)`
        : visiblePanels.header 
          ? `calc(100vh - ${sizes.headerHeight}px)`
          : '1fr';
      rows.push(mainHeight);
      
      if (visiblePanels.editor && visiblePanels.viewer) {
        areas.push('"editor viewer"');
      } else if (visiblePanels.editor) {
        areas.push('"editor editor"');
      } else if (visiblePanels.viewer) {
        areas.push('"viewer viewer"');
      }
    }
    
    // Control panel row
    if (visiblePanels.controlPanel) {
      rows.push(`${sizes.controlPanelHeight}px`);
      areas.push('"control control"');
    }
    
    // Columns: editor width and remaining space for viewer
    const cols = visiblePanels.editor && visiblePanels.viewer
      ? `${sizes.editorWidth}px 1fr`
      : '1fr';

    return {
      gridTemplateRows: rows.join(' ') || '1fr',
      gridTemplateColumns: cols,
      gridTemplateAreas: areas.join(' ') || '"main"',
    };
  }, [visiblePanels, sizes.headerHeight, sizes.editorWidth, sizes.controlPanelHeight]);

  return (
    <LayoutContainer 
      ref={containerRef}
      style={gridTemplate}
    >
      {header && (
        <Panel $gridArea="header" $visible={true}>
          {header}
        </Panel>
      )}

      {editor && (
        <Panel $gridArea="editor" $visible={true}>
          {editor}
          {viewer && (
            <ResizeHandle 
              $direction="horizontal"
              onMouseDown={(e) => handleMouseDown('editor-right', e)}
            />
          )}
        </Panel>
      )}

      {viewer && (
        <Panel $gridArea="viewer" $visible={true}>
          {viewer}
        </Panel>
      )}

      {controlPanel && (
        <Panel $gridArea="control" $visible={true} data-grid-area="control">
          {controlPanel}
          <ResizeHandle 
            $direction="vertical"
            onMouseDown={(e) => handleMouseDown('control-top', e)}
            style={{ bottom: 'auto', top: '-3px' }}
          />
        </Panel>
      )}

      {children}
    </LayoutContainer>
  );
};
