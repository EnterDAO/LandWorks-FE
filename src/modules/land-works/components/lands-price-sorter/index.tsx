import React from 'react';

import sortImg from './assets/sorting.svg';
import { SortDirection } from './models/SortDirection';

import './index.scss';

interface ILandsSorterProps {
  onSortDirectionChange: (sortDir: SortDirection) => void;
  sortDir: SortDirection;
}
export const LandsPriceSorter: React.FC<ILandsSorterProps> = ({ onSortDirectionChange, sortDir }) => {
  const transformStyle = sortDir === SortDirection.DESC ? { transform: 'rotateX(180deg)' } : {};
  return (
    <div className="price-sort-wrapper" onClick={() => onSortDirectionChange(sortDir)}>
      <span className="label">Sort by price</span>
      <img style={transformStyle} className="sort-image" alt="asc" src={sortImg}></img>
    </div>
  );
};
