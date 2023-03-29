import React from 'react';

import { ControlledSelect } from 'design-system';

interface SortSelectProps {
  value?: number;
  onChange?: (value: SortType) => void;
}

export enum SortType {
  PriceLowFirst = 0,
  PriceHighFirst = 1,
}

const options = [
  {
    label: 'Price: low first',
    value: SortType.PriceLowFirst,
  },
  {
    label: 'Price: high first',
    value: SortType.PriceHighFirst,
  },
];

const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <ControlledSelect width="190px" value={value} onChange={onChange as (value: number) => void} options={options} />
  );
};

export default SortSelect;
