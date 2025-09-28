// Node Search Modal for React Flow Editor
// Activated by Cmd+G / Ctrl+G keyboard shortcut

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { NodeDefinition } from '../definitions';

interface NodeSearchModalProps {
  isOpen: boolean;
  nodeDefinitions: NodeDefinition[];
  onNodeSelect: (nodeType: string, position?: { x: number; y: number }) => void;
  onClose: () => void;
  editorBounds?: DOMRect;
}

interface SearchResult {
  node: NodeDefinition;
  category: string;
  score: number; // For ranking search results
}

const NodeSearchModal: React.FC<NodeSearchModalProps> = ({
  isOpen,
  nodeDefinitions,
  onNodeSelect,
  onClose,
  editorBounds
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Category mapping
  const CATEGORY_MAPPING: Record<string, string> = {
    'auto': 'Utilities',
    'primitives2d': 'Primitives 2D',
    'primitives3d': 'Primitives 3D', 
    'transforms2d': 'Transforms 2D',
    'transforms3d': 'Transforms 3D',
    'combinators': 'Combinators',
    'color': 'Color Operations',
    'Primitives': 'Primitives',
    'Transforms': 'Transforms',
    'Combinators': 'Combinators',
    'Math': 'Math Operations',
    'Variables': 'Variables',
    'Materials': 'Materials',
    'Utilities': 'Utilities',
    'Advanced': 'Advanced'
  };

  // Search and rank results
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return nodeDefinitions.slice(0, 20).map(node => ({
        node,
        category: CATEGORY_MAPPING[node.category.toLowerCase()] || node.category,
        score: 1
      }));
    }

    const term = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    nodeDefinitions.forEach(node => {
      let score = 0;
      const label = node.label.toLowerCase();
      const type = node.type.toLowerCase();
      const description = node.description?.toLowerCase() || '';
      const tags = node.tags?.join(' ').toLowerCase() || '';

      // Exact label match gets highest score
      if (label === term) score += 100;
      // Label starts with term
      else if (label.startsWith(term)) score += 50;
      // Label contains term
      else if (label.includes(term)) score += 25;

      // Type matching
      if (type === term) score += 80;
      else if (type.startsWith(term)) score += 40;
      else if (type.includes(term)) score += 20;

      // Description matching
      if (description.includes(term)) score += 10;

      // Tags matching
      if (tags.includes(term)) score += 15;

      // Category matching
      const category = CATEGORY_MAPPING[node.category.toLowerCase()] || node.category;
      if (category.toLowerCase().includes(term)) score += 5;

      if (score > 0) {
        results.push({
          node,
          category,
          score
        });
      }
    });

    // Sort by score (descending) then by label
    return results
      .sort((a, b) => b.score - a.score || a.node.label.localeCompare(b.node.label))
      .slice(0, 50); // Limit results
  }, [searchTerm, nodeDefinitions]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedIndex(0);
      // Use a timer that gets cleaned up on unmount
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Update selected index when search results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            handleNodeSelect(searchResults[selectedIndex].node.type);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, searchResults, onClose]);

  // Handle node selection
  const handleNodeSelect = useCallback((nodeType: string) => {
    // Calculate center position of the editor
    let position = { x: 400, y: 300 }; // Default center
    
    if (editorBounds) {
      position = {
        x: editorBounds.width / 2,
        y: editorBounds.height / 2
      };
    }
    
    onNodeSelect(nodeType, position);
    onClose();
  }, [onNodeSelect, onClose, editorBounds]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '10vh',
      zIndex: 20000
    }}>
      <div
        ref={modalRef}
        style={{
          width: '600px',
          maxWidth: '90vw',
          maxHeight: '70vh',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '12px'
          }}>
            Add Node
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search nodes by name, type, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e8e8e8',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1890ff'}
            onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
          />
        </div>

        {/* Results */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 0'
        }}>
          {searchResults.length === 0 ? (
            <div style={{
              padding: '40px 24px',
              textAlign: 'center',
              color: '#999'
            }}>
              {searchTerm.trim() ? (
                <>
                  <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                    No nodes found for "{searchTerm}"
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    Try different keywords or browse by category
                  </div>
                </>
              ) : (
                <div style={{ fontSize: '14px' }}>
                  Start typing to search for nodes...
                </div>
              )}
            </div>
          ) : (
            searchResults.map((result, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={result.node.type}
                  onClick={() => handleNodeSelect(result.node.type)}
                  style={{
                    padding: '12px 24px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#e6f7ff' : 'transparent',
                    borderLeft: isSelected ? '4px solid #1890ff' : '4px solid transparent',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {/* Node Icon/Category */}
                  <div style={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '6px',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#666',
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}>
                    {result.category.split(' ').map(word => word[0]).join('').toUpperCase()}
                  </div>

                  {/* Node Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '4px'
                    }}>
                      {result.node.label}
                    </div>
                    
                    <div style={{
                      fontSize: '12px',
                      color: '#1890ff',
                      marginBottom: '4px'
                    }}>
                      {result.category}
                    </div>
                    
                    {result.node.description && (
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: '1.4',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {result.node.description}
                      </div>
                    )}
                  </div>

                  {/* Score indicator (for debugging) */}
                  {searchTerm.trim() && (
                    <div style={{
                      fontSize: '10px',
                      color: '#999',
                      backgroundColor: '#f5f5f5',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      alignSelf: 'flex-start'
                    }}>
                      {result.score}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid #f0f0f0',
          backgroundColor: '#fafafa',
          fontSize: '12px',
          color: '#666',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>↑↓ Navigate • Enter Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
};

export default NodeSearchModal;
