// Type Parser for Backend Type Strings
// Maps backend type strings to appropriate frontend control components

import React from 'react';
import { BaseControlProps } from '../../../../types/control';
import {
  FloatControl,
  Vector2Control,
  Vector3Control,
  Vector4Control,
  StringControl,
  SelectControl,
  CheckboxControl,
  Matrix2x2Control,
  Matrix3x3Control,
  ListFloatControl,
  ListVec2Control,
  ListVec3Control,
  ListVec4Control
} from './index';

// Type mapping for different backend type strings
export interface TypeMapping {
  component: React.FC<BaseControlProps>;
  defaultValue?: any;
  description?: string;
  config?: any;
}

/**
 * Parse backend type string and return appropriate control mapping
 */
export function parseTypeString(typeStr: string): TypeMapping {
  const normalizedType = typeStr.toLowerCase().trim();
  
  // Boolean types
  if (normalizedType === 'bool' || normalizedType === 'boolean') {
    return {
      component: CheckboxControl,
      defaultValue: false,
      description: 'Boolean value'
    };
  }
  
  // Float/Number types
  if (normalizedType === 'float' || normalizedType === 'int' || normalizedType === 'number') {
    return {
      component: FloatControl,
      defaultValue: 0,
      description: 'Numeric value'
    };
  }
  
  // String types
  if (normalizedType === 'str' || normalizedType === 'string') {
    return {
      component: StringControl,
      defaultValue: '',
      description: 'Text input'
    };
  }
  
  // Vector types - handle both vec2/vec3/vec4 and Vector[2]/Vector[3]/Vector[4] formats
  if (normalizedType === 'vec2' || normalizedType === 'vector[2]') {
    return {
      component: Vector2Control,
      defaultValue: [0, 0],
      description: '2D vector'
    };
  }
  
  if (normalizedType === 'vec3' || normalizedType === 'vector[3]') {
    return {
      component: Vector3Control,
      defaultValue: [0, 0, 0],
      description: '3D vector'
    };
  }
  
  if (normalizedType === 'vec4' || normalizedType === 'vector[4]') {
    return {
      component: Vector4Control,
      defaultValue: [0, 0, 0, 0],
      description: '4D vector'
    };
  }
  
  // Matrix types - handle Matrix[2,2], Matrix[3,3] formats from backend
  if (normalizedType === 'matrix[2,2]' || normalizedType === 'matrix[2]' || normalizedType === 'mat2' || normalizedType === 'matrix2x2') {
    return {
      component: Matrix2x2Control,
      defaultValue: [1, 0, 0, 1], // Identity matrix
      description: '2x2 matrix'
    };
  }
  
  if (normalizedType === 'matrix[3,3]' || normalizedType === 'matrix[3]' || normalizedType === 'mat3' || normalizedType === 'matrix3x3') {
    return {
      component: Matrix3x3Control,
      defaultValue: [1, 0, 0, 0, 1, 0, 0, 0, 1], // Identity matrix
      description: '3x3 matrix'
    };
  }
  
  // List types - check for List[...] pattern (handle both List[Vector[3]] and List[float] formats)
  const listMatch = normalizedType.match(/^list\[(.+)\]$/);
  if (listMatch) {
    const innerType = listMatch[1].trim();
    
    if (innerType === 'float' || innerType === 'int' || innerType === 'number') {
      return {
        component: ListFloatControl,
        defaultValue: [],
        description: 'List of numbers'
      };
    }
    
    if (innerType === 'vec2' || innerType === 'vector[2]') {
      return {
        component: ListVec2Control,
        defaultValue: [],
        description: 'List of 2D vectors'
      };
    }
    
    if (innerType === 'vec3' || innerType === 'vector[3]') {
      return {
        component: ListVec3Control,
        defaultValue: [],
        description: 'List of 3D vectors'
      };
    }
    
    if (innerType === 'vec4' || innerType === 'vector[4]') {
      return {
        component: ListVec4Control,
        defaultValue: [],
        description: 'List of 4D vectors'
      };
    }
  }
  
  // Enum/Select types - handle Enum["option1"|"option2"|...] format from backend
  const enumMatch = typeStr.match(/^Enum\[(.+)\]$/);
  if (enumMatch) {
    // Extract options from the enum string: "option1"|"option2"|"option3"
    const optionsString = enumMatch[1];
    const options = optionsString
      .split('|')
      .map(opt => opt.trim().replace(/^"/, '').replace(/"$/, '')) // Remove quotes
      .filter(opt => opt.length > 0);
    
    // Successfully parsed enum options
    
    return {
      component: SelectControl,
      defaultValue: options[0] || '',
      description: `Selection from: ${options.join(', ')}`,
      config: {
        options: options
      }
    };
  }
  
  // Fallback enum detection
  if (normalizedType.includes('enum') || normalizedType.includes('choice')) {
    return {
      component: SelectControl,
      defaultValue: '',
      description: 'Selection from options'
    };
  }
  
  // Default fallback - use string control for unknown types
  console.warn(`Unknown type string: "${typeStr}", falling back to string control`);
  return {
    component: StringControl,
    defaultValue: '',
    description: `Unknown type: ${typeStr}`
  };
}

/**
 * Get control component for a type string
 */
export function getControlForType(typeStr: string): React.FC<BaseControlProps> {
  return parseTypeString(typeStr).component;
}

/**
 * Get default value for a type string
 */
export function getDefaultValueForType(typeStr: string): any {
  return parseTypeString(typeStr).defaultValue;
}

/**
 * Check if a type string represents a list/array type
 */
export function isListType(typeStr: string): boolean {
  return typeStr.toLowerCase().includes('list[');
}

/**
 * Check if a type string represents a vector type
 */
export function isVectorType(typeStr: string): boolean {
  const normalized = typeStr.toLowerCase();
  return normalized.includes('vec') || normalized.includes('vector[');
}

/**
 * Check if a type string represents a matrix type
 */
export function isMatrixType(typeStr: string): boolean {
  const normalized = typeStr.toLowerCase();
  return normalized.includes('matrix') || normalized.includes('mat');
}

/**
 * Extract inner type from List[...] type string
 */
export function extractListInnerType(typeStr: string): string | null {
  const match = typeStr.toLowerCase().match(/^list\[(.+)\]$/);
  return match ? match[1].trim() : null;
}
