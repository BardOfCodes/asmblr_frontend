import React from 'react';

interface ModePickerProps {
  selected: string;
  options: string[];
  onChange: (name: string) => void;
}

export const ModePicker: React.FC<ModePickerProps> = ({ selected, options, onChange }) => (
  <div style={{ padding: '2rem' }}>
    <h2>Select Mode</h2>
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      {options.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  </div>
);