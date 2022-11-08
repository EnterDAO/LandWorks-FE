import React, { FC, useCallback } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

import { ControlledSelect } from 'design-system';
import { sortData } from 'modules/land-works/components/lands-explore-filters/filters-data';

import { sessionStorageHandler } from 'utils';

const SORT_QUERY_PARAM_KEY = 's';

export const useSortQueryParam = (): readonly [number, (value: number) => void] => {
  const [sort, setSort] = useQueryParam(SORT_QUERY_PARAM_KEY, NumberParam);
  const storedSort = sessionStorageHandler('get', 'my-properties-filter', 'sort');
  const actualSort: number = sort || storedSort;
  const validSort = sortData.find(({ value }) => value === actualSort)?.value || sortData[0].value;

  const actualSetSort = useCallback(
    (value: number) => {
      sessionStorageHandler('set', 'my-properties-filter', 'sort', value);
      setSort(value);
    },
    [setSort]
  );

  return [validSort, actualSetSort] as const;
};

const SortSelect: FC = () => {
  const [sort, setSort] = useSortQueryParam();

  return <ControlledSelect width="200px" value={sort} onChange={setSort} options={sortData} />;
};

export default SortSelect;
