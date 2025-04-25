import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReglViewerHandle } from './NewReglViewer';

import { importEditor } from '../editor/import-export';
import {
  generateShaderCodeFromGraph,
  generateShaderCodeFromGraphSet,
  generateResolve2PolySet,
  generateConvert2Millable,
  generateConvert2Interlocking,
  generateConvert2STL,
  generateConvert2MCMesh,
  generateConvert2JWood
} from './api';

import fragShader from '../renderer/default.frag.glsl'; // Adjust the path as needed

// Styled div for each uniform card
const UniformCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align all content to the left */
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
  border-radius: 5px;
  padding: 1em;
  margin: 1em 0;
  background-color: #f9f9f9;
`;

// Styled div for individual slider and value
const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1em;
`;

// Styled label to ensure uniform alignment
const UniformLabel = styled.div`
  flex: 1; // Ensure the label takes up space but doesn't dominate
  font-weight: bold;
  text-align: left;
`;

const Button = styled.button<{ $primary?: boolean }>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  &:hover {
    background: #BF4F74;
    color: white;
  }

  ${(props) =>
    props.$primary &&
    css`
      background: #bf4f74;
      color: white;
      &:hover {
        background: transparent;
        color: #bf4f74;
      }
    `}
`;

const UniformContainer = styled.div`
  margin-top: 1em;
`;

const UniformHeader = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  font-weight: bold;
  padding: 0.5em;
  background-color: ${(props) => (props.isOpen ? "#ffcb9a" : "#e2e2e2")};
  border: 1px solid #bf4f74;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UniformContent = styled.div`
  margin-top: 0.5em;
  padding: 1em;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ToggleIcon = styled.span`
  font-size: 1.2em;
  line-height: 1;
  user-select: none;
`;


interface ControlPanelProps {
  reglViewerRef: React.RefObject<ReglViewerHandle>;
  editor: any;
}


export const ControlPanel: React.FC<ControlPanelProps> = ({
  reglViewerRef,
  editor,
}) => {
  const [uniforms, setUniforms] = useState<any>({});
  const [isUniformOpen, setIsUniformOpen] = useState(false);
  const [currentFragCode, setCurrentFragCode] = useState<string>(fragShader);

  const handleToggleUniforms = () => {
    setIsUniformOpen((prev) => !prev);
  };

  const sunUniforms = {
    sunAzimuth: {
      type: 'float' as const,
      init_value: Math.PI/4,
      min: [0],
      max: [ 2 * Math.PI],
    },
    sunElevation: {
      type: 'float' as const,
      init_value: 0.5,
      min: [-Math.PI/2],
      max: [ Math.PI/2],
    },
  };

  
  const handleLoadProgramFromGraph = async () => {
    try {
      editor.modules.sync();
      const data = JSON.stringify(editor.modules.getCurrent(), null, 2);
      const { shaderCode, uniforms: backendUniforms } = await generateShaderCodeFromGraph(data);
  
      // const initializedUniforms = Object.entries(backendUniforms).reduce((acc, [name, spec]: any) => {
      //   acc[name] = spec; // Save the full uniform spec
      //   return acc;
      // }, {});

      // ↑ replace with:
      const initializedUniforms = {
        // first, your sun controls…
        ...sunUniforms,
        // …then everything the backend gave you
        ...backendUniforms,
      };

      setUniforms(initializedUniforms); // Save full uniforms in state
      reglViewerRef.current?.setShaderCode(shaderCode);
      setCurrentFragCode(shaderCode);
      // Set uniforms in ReglViewer
      Object.entries(initializedUniforms).forEach(([name, spec]) => {
        reglViewerRef.current?.setUniform(name, spec.init_value); // Use spec.init_value
      });
      const uniformFunctionsMap: Record<string, any> = {};
      // for each entry in initializedUniforms create a function that sets the uniform
      Object.entries(initializedUniforms).forEach(([name, spec]) => {
        if (spec.type === 'float') {
          uniformFunctionsMap[name] = (value: any) => {
            handleUniformChange(name, parseFloat(value));
          };
        }
        else {
          uniformFunctionsMap[name] = (value: any) => {
            handleUniformChange(name, value);
          };
        }
      });
      await editor.modules.loadUniforms(uniformFunctionsMap);
      
    } catch (error) {
      console.error('Error loading shader program:', error);
    }
  };

  const handleLoadProgramFromGraphSet = async () => {
    try {
      editor.modules.sync();
      const data = JSON.stringify(editor.modules.list, null, 2);
      const { shaderCode, uniforms: backendUniforms } = await generateShaderCodeFromGraphSet(data);
  
      const initializedUniforms = Object.entries(backendUniforms).reduce((acc, [name, spec]: any) => {
        acc[name] = spec; // Save the full uniform spec
        return acc;
      }, {});
  
      setUniforms(initializedUniforms); // Save full uniforms in state
      reglViewerRef.current?.setShaderCode(shaderCode);
      setCurrentFragCode(shaderCode);
      // Set uniforms in ReglViewer
      Object.entries(initializedUniforms).forEach(([name, spec]) => {
        reglViewerRef.current?.setUniform(name, spec.init_value); // Use spec.init_value
      });
      const uniformFunctionsMap: Record<string, any> = {};
      // for each entry in initializedUniforms create a function that sets the uniform
      Object.entries(initializedUniforms).forEach(([name, spec]) => {
        if (spec.type === 'float') {
          uniformFunctionsMap[name] = (value: any) => {
            handleUniformChange(name, parseFloat(value));
          };
        }
        else {
          uniformFunctionsMap[name] = (value: any) => {
            handleUniformChange(name, value);
          };
        }
      });
      await editor.modules.loadUniforms(uniformFunctionsMap);

    } catch (error) {
      console.error('Error loading shader program:', error);
    }
  };

  const arrangeNodes = async () => {
    try {
      editor.modules.sync();
      editor.editor.layout();
    } catch (error) {
      console.error('Error while arranging:', error);
    }
  };
  const resetShader = () => {
    setUniforms({});
    reglViewerRef.current?.setShaderCode(fragShader);
    setCurrentFragCode(fragShader);
  };

  const fetchUniforms = () => {
    const currentUniforms: Record<string, any> = {};
  
    Object.entries(uniforms).forEach(([name, uniform]) => {
      currentUniforms[name] = uniform.init_value; // Fetch current uniform values
    });
  
    return currentUniforms;
  };

  const handleResolve2PolySet = async () => {
    try {
      // Step 1: Sync the current editor state
      editor.modules.sync();
  
      // Step 2: Export the current module data
      const orig_data_str = JSON.stringify(editor.modules.list, null, 2);
      const orig_data = JSON.parse(orig_data_str);
      const current_name = editor.modules.getCurrentName();
      const current_data = JSON.stringify(editor.modules.getCurrent(), null, 2);
      const new_name = current_name + '_resolved';
      // Step 3: Generate the updated data from the backend

      const currentUniforms = fetchUniforms();

      // Step 4: Generate the updated data from the backend
      const newData = await generateResolve2PolySet({
        moduleData: current_data,
        uniforms: currentUniforms
      });
      orig_data[new_name] = newData;
      // Step 4: Clear the current editor
      await editor.modules.clear();
      
      // Import the new data into the modules
      await editor.modules.importModules(orig_data);
      
      console.log('Successfully resolved to polyset and loaded the new data.');
    } catch (error) {
      console.error('Error resolving to polyset:', error);
    }
  };


  const handleConvert2Millable = async () => {
    try {
      // Step 1: Sync the current editor state
      editor.modules.sync();
  
      // Step 2: Export the current module data
      const orig_data_str = JSON.stringify(editor.modules.list, null, 2);
      const orig_data = JSON.parse(orig_data_str);
      const current_name = editor.modules.getCurrentName();
      const current_data = JSON.stringify(editor.modules.getCurrent(), null, 2);
      const new_name = current_name + '_millable';
      // Step 3: Generate the updated data from the backend


      // Step 4: Generate the updated data from the backend
      const newData = await generateConvert2Millable({moduleData: current_data});

      orig_data[new_name] = newData;
      // Step 4: Clear the current editor
      await editor.modules.clear();
      
      // Import the new data into the modules
      await editor.modules.importModules(orig_data);
      
      console.log('Successfully resolved to polyset and loaded the new data.');
    } catch (error) {
      console.error('Error resolving to polyset:', error);
    }
  };


  const handleConvert2Interlocking = async () => {
    try {
      // Step 1: Sync the current editor state
      editor.modules.sync();
  
      // Step 2: Export the current module data
      const orig_data_str = JSON.stringify(editor.modules.list, null, 2);
      const orig_data = JSON.parse(orig_data_str);
      const current_name = editor.modules.getCurrentName();
      const current_data = JSON.stringify(editor.modules.getCurrent(), null, 2);
      const new_name = current_name + '_interlocking';
      // Step 3: Generate the updated data from the backend

      const currentUniforms = fetchUniforms();

      // Step 4: Generate the updated data from the backend
      const newData = await generateConvert2Interlocking({moduleData: current_data, uniforms: currentUniforms});

      orig_data[new_name] = newData;
      // Step 4: Clear the current editor
      await editor.modules.clear();
      
      // Import the new data into the modules
      await editor.modules.importModules(orig_data);
      
      console.log('Successfully resolved to polyset and loaded the new data.');
    } catch (error) {
      console.error('Error resolving to polyset:', error);
    }
  };

  const handleConvert2STL = async () => {
    try {
      // Step 1: Sync the current editor state
      editor.modules.sync();
  
      // Step 2: Export the current module data
      const current_data = JSON.stringify(editor.modules.getCurrent(), null, 2);
  
      // Step 3: Fetch STL files from the backend
      const stlFiles = await generateConvert2STL({ moduleData: current_data });
  
      // Step 4: Trigger downloads for each STL file
      stlFiles.forEach(({ blob, filename }) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  
      console.log('Successfully downloaded STL files.');
    } catch (error) {
      console.error('Error generating STL files:', error);
    }
  };

  const handleConvert2MCMesh = async () => {
    try {
      // Step 1: Sync the current editor state
      editor.modules.sync();
  
      // Step 2: Export the current module data
      const current_data = JSON.stringify(editor.modules.getCurrent(), null, 2);
  
      // Step 3: Fetch STL files from the backend
      const stlFiles = await generateConvert2MCMesh({ moduleData: current_data });
  
      // Step 4: Trigger downloads for each STL file
      stlFiles.forEach(({ blob, filename }) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  
      console.log('Successfully downloaded STL files.');
    } catch (error) {
      console.error('Error generating STL files:', error);
    }
  };

  const handleConvert2JWood = async () => {
    try {
      // Step 1: Sync the current editor state
      editor.modules.sync();
  
      // Step 2: Export the current module data
      const current_data = JSON.stringify(editor.modules.getCurrent(), null, 2);
  
      const currentUniforms = fetchUniforms();

      // Step 3: Fetch STL files from the backend
      const jwood_str = await generateConvert2JWood({ moduleData: current_data, uniforms: currentUniforms });
  
      // Step 4: Trigger downloads for each STL file
      const blob = new Blob([jwood_str], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'module_jwood.json';  // Or any filename you prefer
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      console.log('Successfully downloaded STL files.');
    } catch (error) {
      console.error('Error generating STL files:', error);
    }
  };
  

  const handleUniformChange = (name: string, value: any) => {
    setUniforms((prev) => {
      const updatedUniforms = { ...prev, [name]: { ...prev[name], init_value: value } };
      reglViewerRef.current?.setUniform(name, value); // Send updated uniform to the shader
      return updatedUniforms; // Return the updated state
    });
  };
  const handleSaveShaderCode = () => {
    const blob = new Blob([currentFragCode], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'shader.frag';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const renderUniformInput = (name: string, uniform: any) => {
    const { type, init_value, min, max } = uniform;
  
    if (type === 'float') {
      return (
        <UniformCard key={name}>
          <label>{name} (float):</label>
          <SliderWrapper>
            <input
              type="range"
              min={min[0]}
              max={max[0]}
              step={0.01}
              value={init_value}
              onChange={(e) => handleUniformChange(name, parseFloat(e.target.value))}
            />
            <span>Value: {init_value.toFixed(4)}</span>
          </SliderWrapper>
        </UniformCard>
      );
    } else if (type === 'vec2') {
      return (
        <UniformCard key={name}>
          <label>{name} (vec2):</label>
          {init_value.map((val: number, i: number) => (
            <SliderWrapper key={`${name}_${i}`}>
              <input
                type="range"
                min={min[i]}
                max={max[i]}
                step={0.01}
                value={val}
                onChange={(e) => {
                  const newValue = [...init_value];
                  newValue[i] = parseFloat(e.target.value);
                  handleUniformChange(name, newValue);
                }}
              />
              <span>Value {i + 1}: {val.toFixed(4)}</span>
            </SliderWrapper>
          ))}
        </UniformCard>
      );
    } else if (type === 'vec3') {
      return (
        <UniformCard key={name}>
          <label>{name} (vec3):</label>
          {init_value.map((val: number, i: number) => (
            <SliderWrapper key={`${name}_${i}`}>
              <input
                type="range"
                min={min[i]}
                max={max[i]}
                step={0.01}
                value={val}
                onChange={(e) => {
                  const newValue = [...init_value];
                  newValue[i] = parseFloat(e.target.value);
                  handleUniformChange(name, newValue);
                }}
              />
              <span>Value {i + 1}: {val.toFixed(4)}</span>
            </SliderWrapper>
          ))}
        </UniformCard>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ padding: '1em' }}>
      <Button onClick={handleLoadProgramFromGraph}>Load Geometry</Button>
      <Button onClick={handleLoadProgramFromGraphSet}>Load All</Button>
      <Button onClick={arrangeNodes}>Arrange Nodes</Button>
      <br />
      <Button onClick={handleResolve2PolySet}>Resolve2PolySet</Button>
      <Button onClick={handleConvert2Millable}>Convert2Millable</Button>
      <Button onClick={handleConvert2Interlocking}>Convert2Interlocking</Button>
      <Button onClick={handleConvert2STL}>Convert2STL</Button>
      <Button onClick={handleConvert2MCMesh}>Convert2MCMesh</Button>
      <Button onClick={handleConvert2JWood}>Convert2JWood</Button>
      <br />
      <Button onClick={resetShader}>Reset Shader</Button>
      <Button onClick={handleSaveShaderCode}>Save ShaderCode</Button>
      {/* Collapsible Uniforms Section */}
      <UniformContainer>
        
        <UniformHeader isOpen={isUniformOpen} onClick={handleToggleUniforms}>
          Uniforms
          <ToggleIcon>{isUniformOpen ? "-" : "+"}</ToggleIcon>
        </UniformHeader>
        {isUniformOpen && (
          <UniformContent>
            {Object.entries(uniforms).map(([name, uniform]) => renderUniformInput(name, uniform))}
          </UniformContent>
        )}
      </UniformContainer>
    </div>
  );
};

export default ControlPanel;