// List Control Components
// Handles list inputs for vec2, vec3, vec4, float with theme integration

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BaseControl, clampControlValue } from './BaseControl';
import { BaseControlProps } from '../../../../types/control';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 8px;
  background: var(--control-bg-secondary);
  border: 1px solid var(--control-border);
  border-radius: var(--control-radius);
`;

const ListHeader = styled.div`
  font-weight: 600;
  font-size: 10px;
  color: var(--label-color-secondary);
  text-align: center;
  margin-bottom: 4px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  background: var(--control-bg);
  border-radius: 3px;
  border: 1px solid var(--control-border);
`;

const VectorInputs = styled.div`
  display: flex;
  gap: 3px;
  flex: 1;
`;

const ListInput = styled.input`
  width: var(--control-float-width-list);
  padding: var(--control-input-padding);
  font-size: var(--control-input-font-size);
  text-align: center;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  border-radius: var(--control-input-border-radius);
  transition: border-color 0.1s ease;
  
  &:focus {
    border-color: var(--control-border-focus);
    outline: none;
    box-shadow: 0 0 0 1px var(--control-border-focus-shadow);
  }
  
  &:hover:not(:focus) {
    border-color: var(--control-border-focus);
  }
`;

const VectorInput = styled.input`
  width: var(--control-vector-width-list);
  padding: var(--control-input-padding);
  font-size: var(--control-input-font-size);
  text-align: center;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  border-radius: var(--control-input-border-radius);
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: var(--control-border-focus);
    outline: none;
    box-shadow: 0 0 0 1px var(--control-border-focus-shadow);
  }
  
  &:hover:not(:focus) {
    border-color: var(--control-border-focus);
  }
`;

const ActionButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  transition: all 0.1s ease;
  
  &:hover {
  }
  
  &:active {
  }
`;

const AddButton = styled(ActionButton)`
  width: 100%;
  height: 24px;
  margin-top: 4px;
  background: var(--control-button-add);
  color: white;
  font-size: 10px;
  
  &:hover {
    background: var(--control-button-add-hover);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: var(--control-button-delete);
  color: white;
  
  &:hover {
    background: var(--control-button-delete-hover);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--control-text-color-secondary);
  font-size: 10px;
  padding: 8px;
  font-style: italic;
`;

// Helper function to create default values
const createDefaultValue = (type: 'float' | 'vec2' | 'vec3' | 'vec4') => {
  switch (type) {
    case 'float': return 0;
    case 'vec2': return [0, 0];
    case 'vec3': return [0, 0, 0];
    case 'vec4': return [0, 0, 0, 0];
    default: return 0;
  }
};

// Helper function to render vector inputs
const VectorInputComponent: React.FC<{
  value: any;
  onChange: (value: any) => void;
  type: 'float' | 'vec2' | 'vec3' | 'vec4';
  disabled?: boolean;
}> = ({ value, onChange, type, disabled }) => {
  if (type === 'float') {
    return (
      <ListInput
        type="text"
        value={value !== undefined ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder=""
      />
    );
  }

  const vectorValue = Array.isArray(value) ? value : createDefaultValue(type) as any[];
  const dimensions = type === 'vec2' ? 2 : type === 'vec3' ? 3 : 4;
  const labels = ['x', 'y', 'z', 'w'];

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < dimensions; i++) {
      inputs.push(
        <VectorInput
          key={i}
          type="text"
          value={vectorValue[i] !== undefined ? vectorValue[i] : ''}
          onChange={(e) => {
            const newVector = vectorValue.slice();
            newVector[i] = e.target.value; // Store raw string value
            onChange(newVector);
          }}
          disabled={disabled}
          placeholder={labels[i]}
        />
      );
    }
    return inputs;
  };

  return (
    <VectorInputs>
      {renderInputs()}
    </VectorInputs>
  );
};

// Base List Control Component
const BaseListControl: React.FC<BaseControlProps & {
  itemType: 'float' | 'vec2' | 'vec3' | 'vec4';
}> = ({
  id,
  label,
  value,
  config,
  onChange,
  className,
  disabled,
  itemType
}) => {
  const listValue = Array.isArray(value) ? value : (config.defaultValue || []);

  const handleAddItem = useCallback(() => {
    const newItem = createDefaultValue(itemType);
    const newList = listValue.slice();
    newList.push(newItem);
    const clampedList = clampControlValue(newList, config);
    onChange(clampedList);
  }, [listValue, onChange, itemType, config]);

  const handleRemoveItem = useCallback((index: number) => {
    const newList = listValue.filter((_: any, i: number) => i !== index);
    const clampedList = clampControlValue(newList, config);
    onChange(clampedList);
  }, [listValue, onChange, config]);

  const handleItemChange = useCallback((index: number, newValue: any) => {
    const newList = listValue.slice();
    newList[index] = newValue;
    const clampedList = clampControlValue(newList, config);
    onChange(clampedList);
  }, [listValue, onChange, config]);

  const typeLabel = itemType.toUpperCase();

  return (
    <BaseControl 
      id={id} 
      label={label} 
      className={`list-control list-${itemType}-control ${className || ''}`}
      disabled={disabled}
    >
      <ListContainer>
        <ListHeader>List of {typeLabel} ({listValue.length} items)</ListHeader>
        
        {listValue.length === 0 ? (
          <EmptyState>No items added yet</EmptyState>
        ) : (
          listValue.map((item: any, index: number) => (
            <ListItem key={index}>
              <VectorInputComponent
                value={item}
                onChange={(newValue) => handleItemChange(index, newValue)}
                type={itemType}
                disabled={disabled}
              />
              <DeleteButton
                onClick={() => handleRemoveItem(index)}
                disabled={disabled}
                title="Remove item"
              >
                ×
              </DeleteButton>
            </ListItem>
          ))
        )}
        
        <AddButton
          onClick={handleAddItem}
          disabled={disabled}
          title={`Add ${typeLabel}`}
        >
          + Add {typeLabel}
        </AddButton>
      </ListContainer>
    </BaseControl>
  );
};

/**
 * List Float Control Component - Clean, theme-integrated float list
 */
export const ListFloatControl: React.FC<BaseControlProps> = (props) => (
  <BaseListControl {...props} itemType="float" />
);

/**
 * List Vec2 Control Component - Clean, theme-integrated vec2 list
 */
export const ListVec2Control: React.FC<BaseControlProps> = (props) => (
  <BaseListControl {...props} itemType="vec2" />
);

/**
 * List Vec3 Control Component - Clean, theme-integrated vec3 list
 */
export const ListVec3Control: React.FC<BaseControlProps> = (props) => (
  <BaseListControl {...props} itemType="vec3" />
);

/**
 * List Vec4 Control Component - Clean, theme-integrated vec4 list
 */
export const ListVec4Control: React.FC<BaseControlProps> = (props) => (
  <BaseListControl {...props} itemType="vec4" />
);