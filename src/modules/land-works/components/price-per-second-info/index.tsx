import React from 'react';

import './index.scss';

interface IPricePerSecondInfoProps {
  pricePerSecond: string;
}

export const PricePerSecondInfo: React.FC<IPricePerSecondInfoProps> = ({ pricePerSecond }) => {
  return (
    <div id="rent-price-container">
      <span className="rent-price-info">
        The price for renting this property is <span style={{ fontWeight: 'bold' }}>{pricePerSecond}</span> per second
      </span>
    </div>
  );
};
