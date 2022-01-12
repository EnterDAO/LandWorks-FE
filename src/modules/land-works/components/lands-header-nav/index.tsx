import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';

import './index.scss';

export const LandsNav: React.FC = () => {
  const history = useHistory();

  const allPathname = '/all';
  const rentingPathname = '/renting';
  const lendingPathname = '/lending';

  const getNavKey = () => {
    // eslint-disable-next-line no-restricted-globals
    const path = location.pathname;
    switch (path) {
      case allPathname:
        return '1';
      case rentingPathname:
        return '2';
      case lendingPathname:
        return '3';
      default:
        return '0';
    }
  };

  const [current, setCurrent] = useState<string>(getNavKey());

  const handleClick = (e: any) => {
    setCurrent(e.key);
    switch (e.key) {
      case '1':
        history.push(allPathname);
        break;
      case '2':
        history.push(rentingPathname);
        break;
      case '3':
        history.push(lendingPathname);
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
