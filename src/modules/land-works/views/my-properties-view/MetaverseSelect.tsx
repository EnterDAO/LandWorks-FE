import React, { FC, useCallback } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

import { ControlledSelect } from 'design-system';
import { landsData } from 'modules/land-works/components/lands-explore-filters/filters-data';

import { sessionStorageHandler } from 'utils';

const METAVERSE_QUERY_PARAM_KEY = 'm';

export const useMetaverseQueryParam = (): readonly [number, (value: number) => void] => {
  const [metaverse, setMetaverse] = useQueryParam(METAVERSE_QUERY_PARAM_KEY, NumberParam);
  const storedMetaverse = sessionStorageHandler('get', 'general', 'metaverse');
  const actualMetaverse: number = metaverse || storedMetaverse;
  const validMetaverse = landsData.find(({ value }) => value === actualMetaverse)?.value || landsData[0].value;

  const actualSetMetaverse = useCallback(
    (value: number) => {
      sessionStorageHandler('set', 'general', 'metaverse', value);
      setMetaverse(value);
    },
    [setMetaverse]
  );

  return [validMetaverse, actualSetMetaverse];
};

const MetaverseSelect: FC = () => {
  const [metaverse, setMetaverse] = useMetaverseQueryParam();

  return <ControlledSelect width="200px" value={metaverse} onChange={setMetaverse} options={landsData} />;
};

export default MetaverseSelect;
