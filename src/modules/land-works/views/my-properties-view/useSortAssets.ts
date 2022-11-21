import { useMemo } from 'react';

import { AssetEntity } from 'modules/land-works/api';

import { useSortQueryParam } from './SortSelect';

import { landsOrder } from 'modules/land-works/utils';

import { sortColumns, sortDirections } from 'modules/land-works/constants';

const useSortAssets = (assets: AssetEntity[]): AssetEntity[] => {
  const [sort] = useSortQueryParam();

  return useMemo(() => {
    return landsOrder(assets, sortColumns[sort - 1], sortDirections[sort - 1]);
  }, [assets, sort]);
};

export default useSortAssets;
