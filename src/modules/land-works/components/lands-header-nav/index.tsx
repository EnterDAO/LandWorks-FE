import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { ReactComponent as Rocket } from '../../../../resources/svg/rocket-02.svg';

import './index.scss';

const LandsNav: React.FC = () => {
  return (
    <div className="lands-nav-container">
      <div className="divider"></div>
      <NavLink className="tab" exact activeClassName="selected" to="/explore">
        <div className="nav-content">
          <Rocket className="icon" />
          Explore
        </div>
        <div className="active-tab"></div>
      </NavLink>

      <NavLink className="tab" activeClassName="selected" to="/my-properties">
        <div className="nav-content">My Properties</div>
        <div className="active-tab"></div>
      </NavLink>

      <NavLink className="tab" activeClassName="selected" to="/scene-expert">
        <div className="nav-content">Scene Expert</div>
        <div className="active-tab"></div>
      </NavLink>
    </div>
  );
};

export default withRouter(LandsNav);
