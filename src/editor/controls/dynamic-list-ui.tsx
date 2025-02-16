import { useState, useEffect } from "react";
import styled from "styled-components";
import { ListControl } from "./dynamic-list";
import { Drag } from 'rete-react-render-plugin'

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
  margin-bottom: 4px;
`;

const VectorRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const VectorInput = styled.input.attrs({
  step: 0.1, // Set the step increment to 0.1
})`
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  margin: 2px 0px;
  border: 1px solid #2C3532;
  font-size: 110%;
  box-sizing: border-box;
  color: black;
`;

const AddButton = styled.button`
  background-color: #D8B08C;
  width: 100%;
  color: #2C3532;
  border: 1px solid #2C3532;
  border-radius: 30px;
  padding: 4px 8px;
  margin-top: 2px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const RemoveButton = styled.button`
  background-color: #D8B08C;
  color: #2C3532;
  border: 1px solid #2C3532;
  border-radius: 30px;
  padding: 2px 6px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export function ListControlUI({ data }: { data: ListControl }) {
  const [value, setValue] = useState(data.value);

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  const handleAdd = () => {
    data.addItem();
    setValue([...data.value]);
  };

  const handleRemove = (index: number) => {
    data.removeItem(index);
    setValue([...data.value]);
  };

  const handleChange = (index: number, newValue: number[] | number, dimIndex?: number) => {
    if (Array.isArray(newValue)) {
      const updated = [...(value as number[][])];
      updated[index] = newValue;
      setValue(updated);
      data.updateItem(index, newValue);
    } else {
      const updated = [...(value as number[])];
      updated[index] = newValue;
      setValue(updated);
      data.updateItem(index, newValue);
    }
  };

  return (
    
    <Container>
    <Drag.NoDrag>
      {data.label && <Header>{data.label}</Header>}
      {value.map((item, index) => (
        <VectorRow key={index}>
          {Array.isArray(item) ? (
            item.map((dim, dimIndex) => (
              <VectorInput
                key={dimIndex}
                type="number"
                value={dim}
                onChange={(e) =>
                  handleChange(
                    index,
                    item.map((d, i) =>
                      i === dimIndex ? parseFloat(e.target.value) || 0 : d
                    )
                  )
                }
              />
            ))
          ) : (
            <VectorInput
              type="number"
              value={item}
              onChange={(e) => handleChange(index, parseFloat(e.target.value) || 0)}
            />
          )}
          <RemoveButton onClick={() => handleRemove(index)}>–</RemoveButton>
        </VectorRow>
      ))}
      <AddButton onClick={handleAdd}>Add {data.vectorType}</AddButton>
      </Drag.NoDrag>
    </Container>
  );
}