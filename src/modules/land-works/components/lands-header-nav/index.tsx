import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from 'antd';

import './index.scss';

const LandsNav: React.FC = () => {
  const allPathname = '/all';
  const rentingPathname = '/renting';
  const lendingPathname = '/lending';

  const getMenuKey = () => {
    if (
      location.pathname === allPathname ||
      location.pathname === rentingPathname ||
      location.pathname === lendingPathname
    ) {
      return location.pathname;
    }
    return '';
  };

  useEffect(() => {
    setSelectedKey(getMenuKey());
  }, [location.pathname]);

  const [selectedKey, setSelectedKey] = useState(getMenuKey());

  return (
    <Menu className="lands-nav-container" selectedKeys={[selectedKey]} mode="horizontal">
      <Menu.Item key={allPathname}>
        <NavLink to={allPathname}>All</NavLink>
      </Menu.Item>
      <Menu.Item key={rentingPathname}>
        <NavLink to={rentingPathname}>Renting</NavLink>
      </Menu.Item>
      <Menu.Item key={lendingPathname}>
        <NavLink to={lendingPathname}>Lending</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(LandsNav);
