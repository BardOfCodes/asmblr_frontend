import { useEffect, useState } from "react";
import styled from "styled-components";
import { StringSelectionControl } from "./list-control";

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

const Dropdown = styled.select`
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #2C3532;
  font-size: 110%;
  box-sizing: border-box;
  color: black;
`;

export function StringSelectionControlUI({ data }: { data: StringSelectionControl }) {
  const [value, setValue] = useState(data.value);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    data.setValue(newValue); // Update the control's value
  };

  return (
    <Container>
      {data.label && <Header>{data.label}</Header>}
      <Dropdown value={value} onChange={handleChange}>
        {data.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Dropdown>
    </Container>
  );
}