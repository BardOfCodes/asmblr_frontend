import React from 'react';
import { Card, Button, Typography, Space } from 'antd';

const { Title, Text } = Typography;

interface EnhancedModePickerProps {
  selected: string;
  options: string[];
  onChange: (name: string) => void;
}

export const EnhancedModePicker: React.FC<EnhancedModePickerProps> = ({ 
  selected, 
  options, 
  onChange 
}) => (
  <div style={{ 
    padding: '2rem', 
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5'
  }}>
    <Card style={{ maxWidth: 600, width: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <div>
          <Title level={2}>Select ASMBLR Mode</Title>
          <Text type="secondary">
            Choose your preferred interface mode. Enhanced modes include the new modular 
            interface with customizable panels and improved architecture.
          </Text>
        </div>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {options.map((option) => (
            <Button
              key={option}
              type={selected === option ? 'primary' : 'default'}
              size="large"
              block
              onClick={() => onChange(option)}
              style={{
                height: 'auto',
                padding: '12px 24px',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {option}
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  {option.includes('Enhanced') 
                    ? 'New modular interface with customizable panels'
                    : 'Classic interface'
                  }
                </div>
              </div>
            </Button>
          ))}
        </Space>

        <Text type="secondary" style={{ fontSize: '12px' }}>
          You can change the mode anytime from the header menu
        </Text>
      </Space>
    </Card>
  </div>
);
