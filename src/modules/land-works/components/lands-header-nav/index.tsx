import React from 'react';
import { NavLink, useLocation, withRouter } from 'react-router-dom';

import { LocationState } from 'modules/interface';

import { ReactComponent as Rocket } from '../../../../resources/svg/rocket-02.svg';

import './index.scss';

const LandsNav: React.FC = () => {
  const location = useLocation<LocationState>();
  return (
    <div className="lands-nav-container">
      <div className="divider"></div>
      <NavLink
        className="tab"
        exact
        activeClassName="selected"
        to={{ pathname: '/explore', state: { tab: location.state?.tab } }}
      >
        <div className="nav-content">
          <Rocket className="icon" />
          Explore
        </div>
        <div className="active-tab"></div>
      </NavLink>

      <NavLink
        className="tab"
        activeClassName="selected"
        to={{ pathname: '/my-properties', state: { tab: location.state?.tab } }}
      >
        <div className="nav-content">My Properties</div>
        <div className="active-tab"></div>
      </NavLink>

      <NavLink
        className="tab"
        activeClassName="selected"
        to={{ pathname: '/scene-builder', state: { tab: location.state?.tab } }}
      >
        <div className="nav-content">Scene Builders</div>
        <div className="active-tab"></div>
      </NavLink>
    </div>
  );
};

export default withRouter(LandsNav);
