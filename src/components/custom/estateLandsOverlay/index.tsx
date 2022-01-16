import React from 'react';
import { Popover, Tooltip } from 'antd';

import './index.scss';

interface IEstateLandOverlay {
  coordinates: any;
}
const EstateLandOverlay: React.FC<IEstateLandOverlay> = ({ coordinates }) => {
  const maxShown = 4;
  return coordinates && coordinates?.length ? (
    <div className="estate-overlay-container">
      {coordinates.length > maxShown ? (
        <>
          {(coordinates || []).slice(0, maxShown).map((estateCoord: any) => (
            <div className="estate-land">
              <span>
                {estateCoord.x}, {estateCoord.y}
              </span>
            </div>
          ))}
          <Popover
            content={coordinates.slice(maxShown, coordinates.length).map((coord: any) => (
              <div className="estate-land">
                <span>
                  {coord.x}, {coord.y}
                </span>
              </div>
            ))}
            className="estate-land"
          >
            <div style={{ width: 80 }}>+ {coordinates.length - maxShown} MORE...</div>
          </Popover>
        </>
      ) : (
        coordinates.map((estateLand: any) => (
          <div className="estate-land">
            <span>
              {estateLand.x}, {estateLand.y}
            </span>
          </div>
        ))
      )}
    </div>
  ) : (
    <></>
  );
};

export default EstateLandOverlay;
