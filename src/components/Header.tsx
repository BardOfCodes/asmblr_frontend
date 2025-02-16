import React from 'react';
import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useProjectPicker } from './project-picker';
import { useProjectSaver } from './project-saver';

interface HeaderProps {
  editor: any; // Replace `any` with the correct type if available
}

export const Header: React.FC<HeaderProps> = ({ editor, }) => {
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

  const items: MenuProps['items'] = [
    {
      label: 'Tsugite',
      key: 'Tsugite',
    },
    {
      label: 'New',
      key: 'new',
      onClick() {
        editor.modules.clear()
      }
    },
    {
      label: 'Open',
      key: 'open',
      onClick: handleLoad
    },
    {
      label: 'Save',
      key: 'save',
      onClick: handleSave
    },

  ]


  return (
    <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>
      <Menu mode="horizontal" items={items} theme="dark" />
    </Layout.Header>
  );
};