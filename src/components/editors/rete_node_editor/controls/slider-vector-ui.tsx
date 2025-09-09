import { useEffect, useState } from "react";
import styled from "styled-components";
import { SliderVectorControl } from "./slider-vector-control";
import { Drag } from "rete-react-render-plugin";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 8px;
  margin: 4px;
  background-color: #FFCB9A;
  border: 2px solid #2C3532;
  border-radius: 8px;
`;

const Header = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
`;

const SliderRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  margin-bottom: 4px;
`;

const Slider = styled.input`
  width: 100%;
`;

const ValueDisplay = styled.div`
  text-align: center;
  font-size: 0.9em;
  color: #333;
`;

export function SliderVectorUI({ data }: { data: SliderVectorControl }) {
  const [value, setValue] = useState<number[]>(data.value);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  const updateValue = (index: number, newValue: number) => {
    const clampedValue = Math.max(data.range[index].min, Math.min(newValue, data.range[index].max));
    const updated = [...value];
    updated[index] = clampedValue;
    setValue(updated);
    data.updateDimension(index, clampedValue);
  };

  return (
    <Container>
      {data.label && <Header>{data.label}</Header>}
      {value.map((val, index) => (
        <SliderRow key={index}>
          <Drag.NoDrag>
            <Slider
              type="range"
              min={data.range[index].min}
              max={data.range[index].max}
              step={0.01}
              value={val}
              onChange={(e) => updateValue(index, parseFloat(e.target.value))}
            />
            <ValueDisplay>{val.toFixed(4)}</ValueDisplay> {/* Dynamically display the current slider value */}
          </Drag.NoDrag>
        </SliderRow>
      ))}
    </Container>
  );
}