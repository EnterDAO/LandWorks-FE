import React, { useState } from 'react';
import { Col, Menu, Row } from 'antd';

import './index.scss';

export const LandsNav: React.FC = () => {
  return (
    <Menu className="lands-nav-container" onClick={е => console.log('nav change')} mode="horizontal">
      <Menu.Item>All</Menu.Item>
      <Menu.Item>Renting</Menu.Item>
      <Menu.Item>Lending</Menu.Item>
    </Menu>
  );
};
