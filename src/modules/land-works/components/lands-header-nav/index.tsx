import React, { useState } from 'react';
import { Menu } from 'antd';

import './index.scss';

export const LandsNav: React.FC = () => {
  const [current, setCurrent] = useState<string>('1');
  const handleClick = (e: any) => {
    setCurrent(e.key);
    // TODO:: use Router here
  };
  return (
    <Menu className="lands-nav-container" selectedKeys={[current]} onClick={handleClick} mode="horizontal">
      <Menu.Item key={1}>All</Menu.Item>
      <Menu.Item key={2}>Renting</Menu.Item>
      <Menu.Item key={3}>Lending</Menu.Item>
    </Menu>
  );
};
