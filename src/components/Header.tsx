import React from 'react';
import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useProjectPicker } from './project-picker';
import { useProjectSaver } from './project-saver';
import { AvailableModes, saveModeToDisk } from '../modes';

interface HeaderProps {
  editor: any;
  modeName: string;
  setMode: (name: string) => void;
}
export const Header: React.FC<HeaderProps> = ({ editor, modeName, setMode}) => {
  const [open, file] = useProjectPicker()
  const [save] = useProjectSaver('project.json')

  const handleSave = () => {
    editor.modules.sync(); // Ensure the editor's state is synced

    const moduleList = editor.modules.list; // Get the current module list
    save({ moduleList }); // Save both modules and positions
    // save(editor.modules.list); // Save the current state
  };


  const handleLoad = () => {
    open(); // Trigger the open file picker
    editor.modules.sync(); // Sync the editor after loading
  };

  useEffect(() => {
    if (file) {
      // Load the modules
      if (file.moduleList) {
        editor.modules.importModules(file.moduleList);
      }

    }
  }, [file]);

  const modeItems = Object.entries(AvailableModes).map(([key, mode]) => ({
    key,
    label: mode.label,
    onClick: () => {
      saveModeToDisk(key);
      setMode(key);
      window.location.reload(); // clean reload with new mode
    },
  }));
  
  const items: MenuProps['items'] = [
    {
      label: modeName,
      key: 'mode-name',
      children: [],
    },
    {
      label: 'New',
      key: 'new',
      onClick() {
        editor.modules.clear();
      },
    },
    {
      label: 'Open',
      key: 'open',
      onClick: handleLoad,
    },
    {
      label: 'Save',
      key: 'save',
      onClick: handleSave,
    },
    {
      label: 'ASMBLR Mode',
      key: 'mode',
      children: modeItems,
    },
  ];


  return (
    <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>
      <Menu mode="horizontal" items={items} theme="dark" />
    </Layout.Header>
  );
};