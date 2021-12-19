import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Menu } from 'antd';

import './index.scss';

export const LandsNav: React.FC = () => {
  const history = useHistory();

  const [current, setCurrent] = useState<string>('1');
  const handleClick = (e: any) => {
    setCurrent(e.key);
    // TODO:: use Router here
    switch (e.key) {
      case '1':
        history.push('/land-works');
        break;
      case '2':
        history.push('/land-works/renting');
        break;
      case '3':
        history.push('/land-works/lending');
        break;
      default:
        break;
    }
  };
  return (
    <Menu className="lands-nav-container" selectedKeys={[current]} onClick={handleClick} mode="horizontal">
      <Menu.Item key={1}>All</Menu.Item>
      <Menu.Item key={2}>Renting</Menu.Item>
      <Menu.Item key={3}>Lending</Menu.Item>
    </Menu>
  );
};
