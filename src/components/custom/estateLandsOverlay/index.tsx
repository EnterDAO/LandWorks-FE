/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Popover } from 'antd';

import './index.scss';

type Coordinate = {
  id: string;
  x: string;
  y: string;
};

interface IEstateLandOverlay {
  coordinates?: Coordinate[];
}

const EstateLandOverlay: React.FC<IEstateLandOverlay> = ({ coordinates }) => {
  const maxShown = 4;
  return coordinates && coordinates?.length ? (
    <div className="estate-overlay-container">
      {coordinates.length > maxShown ? (
        <>
          {(coordinates || []).slice(0, maxShown).map((estateCoord: Coordinate) => (
            <div key={estateCoord.id} className="estate-land">
              <span>
                {estateCoord.x}, {estateCoord.y}
              </span>
            </div>
          ))}
          <Popover
            content={coordinates.slice(maxShown, coordinates.length).map((coord: any) => (
              <div key={coord.id} className="estate-land">
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
          <div key={estateLand.id} className="estate-land">
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
