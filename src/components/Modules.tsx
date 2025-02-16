import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ModuleItem } from './ModuleItem';
import { exportEditor, importEditor } from '../editor/import-export';
import { DiContainer } from '../editor';
import { Button } from 'antd';

const Styles = styled.div`
  position: absolute;
  left: 12px;
  top: 12px;
  font-family: Gill Sans, sans-serif;
  display: grid;
  gap: 1em;
`;

const initialData = () => ({ nodes: [], connections: [] });

export function useModules({ opened, other_editor }: { opened: () => void; other_editor: any }) {
  const [list, setList] = useState<Record<string, any>>({});
  const listRef = useRef<Record<string, any>>({});
  const diRef = useRef<DiContainer>();
  const current = useRef<null | string>(null);
  const sorted = Object.keys(list).sort((a, b) => (a < b ? -1 : 1));

  function getEditor() {
    if (!diRef.current?.editor) throw new Error('editor');
    return diRef.current?.editor;
  }

  function sync() {
    if (!current.current) return;
    listRef.current[current.current] = exportEditor(getEditor(), other_editor);
  }

  function rename(from: string, to: string) {
    const item = listRef.current[from];
    delete listRef.current[from];
    listRef.current[to] = item;

    if (current.current === from) current.current = to;
    setList({ ...listRef.current });
  }

  async function openModule(name: string, uniformFunctionMap?: any) {
    sync();
    current.current = name;

    if (!diRef.current) throw new Error('diRef.current');

    await diRef.current.editor.clear();
    await importEditor(diRef.current, listRef.current[name], other_editor, uniformFunctionMap);
    opened();
  }

  async function loadUniforms(uniformFunctionMap?: any) {
    sync();
    if (!current.current) return;
    if (!diRef.current) throw new Error('diRef.current');

    await diRef.current.editor.clear();
    await importEditor(diRef.current, listRef.current[current.current], other_editor, uniformFunctionMap);
    opened();
  }


  function addModule(name?: string, data?: any) {
    name = name || 'module' + Object.keys(listRef.current).length;
    data = data || initialData();

    listRef.current[name] = data;
    setList({ ...listRef.current });
  }

  function deleteModule(name: string) {
    delete listRef.current[name];
    setList({ ...listRef.current });

    // If the deleted module was the current one, clear the editor
    if (current.current === name) {
      current.current = null;
      diRef.current?.editor.clear();
    }
  }

  function getCurrent() {
    if (!current.current) return null;
    return listRef.current[current.current];
  }

  function getCurrentName() {
    return current.current;
  }

  async function clear() {
    Object.keys(listRef.current).forEach((name) => delete listRef.current[name]);
    current.current = null;
    await getEditor().clear();
    setList(listRef.current);
  }

  return {
    get list() {
      return listRef.current;
    },
    setDI(di: DiContainer) {
      diRef.current = di;
    },
    addModule,
    deleteModule, // Expose deleteModule function
    rename,
    openModule,
    sync,
    getCurrent,
    getCurrentName,
    clear,
    async importModules(target: Record<string, any>) {
      await clear();

      Object.entries(target).forEach(([name, data]) => {
        addModule(name, data);
      });

      await openModule(Object.keys(target)[0], );
    },
    loadUniforms,
    view: (
      <Styles>
        {sorted.map((name) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ModuleItem
              name={name}
              rename={(args) => rename(args.from, args.to)}
              select={() => openModule(name)}
            >
              {name}
            </ModuleItem>
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => deleteModule(name)}
            >
              -
            </Button>
          </div>
        ))}
        <Button onClick={() => addModule()} size="small">
          +
        </Button>
      </Styles>
    ),
  };
}