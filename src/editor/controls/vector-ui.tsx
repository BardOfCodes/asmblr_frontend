import { useEffect, useRef, useState } from "react";
import { Drag } from "rete-react-render-plugin";
import styled from "styled-components";
import { VectorControl } from "./vector-control";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 8px;
  margin: 4px;
  background-color: #e2cfff;
  border: 1px solid #2C3532;
  border-radius: 8px;
`;

const Header = styled.div`
  font-weight: bold;
  text-align: left;
  margin-bottom: 2px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const InputField = styled.input.attrs({
  step: 0.1, // Set the step increment to 0.1
})`
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #2C3532;
  font-size: 110%;
  box-sizing: border-box;
  color: black;
`;
export function VectorUI({ data }: { data: VectorControl }) {
  const [value, setValue] = useState<number[]>(data.value);
  const ref = useRef(null);

  Drag.useNoDrag(ref);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  const updateValue = (index: number, newValue: number) => {
    const updated = [...value];
    updated[index] = newValue;
    setValue(updated);
    data.updateDimension(index, newValue);
  };


  return (
    <Container ref={ref}>
      {/* Render Header only if the label is not an empty string */}
      {data.label && <Header>{data.label}</Header>}
      {value.map((val, index) => (
        <InputRow key={index}>
          <InputField
            type="number"
            value={val}
            onChange={(e) => updateValue(index, parseFloat(e.target.value) || 0)}
          />
        </InputRow>
      ))}
    </Container>
  );
}