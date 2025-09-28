// Enhanced Context Menu for React Flow Editor
// Features: hierarchical categories, search functionality, keyboard shortcuts

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { NodeDefinition } from '../definitions';

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  nodeDefinitions: NodeDefinition[];
  onNodeSelect: (nodeType: string) => void;
  onClose: () => void;
}

interface CategoryGroup {
  name: string;
  displayName: string;
  nodes: NodeDefinition[];
  isExpanded: boolean;
}

// Category mapping for better organization
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

const EnhancedContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  nodeDefinitions,
  onNodeSelect,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Group nodes by category
  const categoryGroups = useMemo(() => {
    const groups: Record<string, CategoryGroup> = {};
    
    nodeDefinitions.forEach(node => {
      const categoryKey = node.category.toLowerCase();
      const displayName = CATEGORY_MAPPING[categoryKey] || node.category;
      
      if (!groups[categoryKey]) {
        groups[categoryKey] = {
          name: categoryKey,
          displayName,
          nodes: [],
          isExpanded: expandedCategories.has(categoryKey)
        };
      }
      groups[categoryKey].nodes.push(node);
    });
    
    // Sort categories and nodes within each category
    const sortedGroups = Object.values(groups).sort((a, b) => 
      a.displayName.localeCompare(b.displayName)
    );
    
    sortedGroups.forEach(group => {
      group.nodes.sort((a, b) => a.label.localeCompare(b.label));
    });
    
    return sortedGroups;
  }, [nodeDefinitions, expandedCategories]);

  // Filter nodes based on search term
  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) {
      return categoryGroups;
    }
    
    const term = searchTerm.toLowerCase();
    return categoryGroups.map(group => ({
      ...group,
      nodes: group.nodes.filter(node => 
        node.label.toLowerCase().includes(term) ||
        node.type.toLowerCase().includes(term) ||
        (node.description && node.description.toLowerCase().includes(term)) ||
        (node.tags && node.tags.some(tag => tag.toLowerCase().includes(term)))
      ),
      isExpanded: true // Auto-expand when searching
    })).filter(group => group.nodes.length > 0);
  }, [categoryGroups, searchTerm]);

  // Get flattened list of all visible nodes for keyboard navigation
  const flatNodeList = useMemo(() => {
    const nodes: { node: NodeDefinition; categoryName: string }[] = [];
    filteredGroups.forEach(group => {
      if (group.isExpanded || searchTerm.trim()) {
        group.nodes.forEach(node => {
          nodes.push({ node, categoryName: group.displayName });
        });
      }
    });
    return nodes;
  }, [filteredGroups, searchTerm]);

  // Reset state when menu opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedIndex(0);
      // Auto-focus search input with cleanup
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
          setSelectedIndex(prev => Math.min(prev + 1, flatNodeList.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatNodeList[selectedIndex]) {
            onNodeSelect(flatNodeList[selectedIndex].node.type);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, flatNodeList, onNodeSelect, onClose]);

  // Handle category toggle
  const toggleCategory = useCallback((categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  }, []);

  // Handle node selection
  const handleNodeSelect = useCallback((nodeType: string) => {
    onNodeSelect(nodeType);
    onClose();
  }, [onNodeSelect, onClose]);

  if (!isOpen) return null;

  // Calculate position to keep menu on screen
  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    left: Math.min(position.x, window.innerWidth - 320),
    top: Math.min(position.y, window.innerHeight - 400),
    width: '300px',
    maxHeight: '400px',
    backgroundColor: 'white',
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 10000,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  let currentIndex = 0;

  return (
    <div ref={menuRef} style={menuStyle}>
      {/* Search Bar */}
      <div style={{ 
        padding: '12px', 
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fafafa'
      }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search nodes... (Cmd+G)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#1890ff'}
          onBlur={(e) => e.target.style.borderColor = '#d9d9d9'}
        />
      </div>

      {/* Scrollable Content */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: '8px 0'
      }}>
        {filteredGroups.length === 0 ? (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            color: '#999',
            fontSize: '14px'
          }}>
            No nodes found for "{searchTerm}"
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.name}>
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(group.name)}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #e8e8e8',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              >
                <span>{group.displayName} ({group.nodes.length})</span>
                <span style={{ fontSize: '12px' }}>
                  {group.isExpanded || searchTerm.trim() ? '▼' : '▶'}
                </span>
              </div>

              {/* Category Items */}
              {(group.isExpanded || searchTerm.trim()) && group.nodes.map((node) => {
                const isSelected = currentIndex === selectedIndex;
                currentIndex++;
                
                return (
                  <div
                    key={node.type}
                    onClick={() => handleNodeSelect(node.type)}
                    style={{
                      padding: '10px 20px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#e6f7ff' : 'white',
                      borderLeft: isSelected ? '3px solid #1890ff' : '3px solid transparent',
                      fontSize: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ fontWeight: '500', color: '#333' }}>
                      {node.label}
                    </div>
                    {node.description && (
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666',
                        lineHeight: '1.3'
                      }}>
                        {node.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Footer with shortcuts */}
      <div style={{
        padding: '8px 12px',
        borderTop: '1px solid #f0f0f0',
        backgroundColor: '#fafafa',
        fontSize: '11px',
        color: '#666',
        textAlign: 'center'
      }}>
        ↑↓ Navigate • Enter Select • Esc Close • Cmd+G Search
      </div>
    </div>
  );
};

export default EnhancedContextMenu;
