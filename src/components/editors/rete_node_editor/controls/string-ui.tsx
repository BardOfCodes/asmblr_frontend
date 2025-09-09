import { useEffect, useRef, useState } from "react";
import { Drag } from "rete-react-render-plugin";
import styled from "styled-components";
import { StringControl } from "./string-control";

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

const InputField = styled.input`
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #2C3532;
  font-size: 110%;
  box-sizing: border-box;
  color: black;
`;

export function StringControlUI({ data }: { data: StringControl }) {
  const [value, setValue] = useState<string>(data.value);
  const ref = useRef(null);

  Drag.useNoDrag(ref);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    data.setValue(newValue); // Update the control's internal value
  };

  return (
    <Container ref={ref}>
      {/* Render Header only if the label is not an empty string */}
      {data.label && <Header>{data.label}</Header>}
      <InputField
        type="text"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
        placeholder="Enter text"
      />
    </Container>
  );
}