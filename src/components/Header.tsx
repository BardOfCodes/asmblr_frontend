import React from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

export const Header: React.FC = () => {
  const items: MenuProps['items'] = [
    { label: 'Home', key: 'home' },
    { label: 'New Project', key: 'new-project' },
  ];

  return (
    <Layout.Header style={{ backgroundColor: '#001529', color: '#fff' }}>
      <Menu mode="horizontal" items={items} theme="dark" />
    </Layout.Header>
  );
};
