import React, { useCallback, useMemo } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import { ControlledSelect } from 'design-system';
import { useMetaverses } from 'modules/land-works';

import MetaverseIcon from '../MetaverseIcon';

import { sessionStorageHandler } from 'utils';

const METAVERSE_QUERY_PARAM_KEY = 'm';

export const useMetaverseQueryParam = () => {
  const [metaverseQueryParam, setMetaverseQueryParam] = useQueryParam(METAVERSE_QUERY_PARAM_KEY, StringParam);
  const storedMetaverse = sessionStorageHandler('get', 'general', 'metaverse');
  const metaverses = useMetaverses();
  const activeMetaverse = metaverseQueryParam || storedMetaverse;
  const metaverse = (metaverses.find(({ id }) => id === activeMetaverse) || metaverses[0]).id;

  const setMetaverse = useCallback(
    (value: string) => {
      sessionStorageHandler('set', 'general', 'metaverse', value);
      setMetaverseQueryParam(value);
    },
    [setMetaverseQueryParam]
  );

  return [metaverse, setMetaverse] as const;
};

interface MetaverseSelectProps {
  width?: string;
}

const MetaverseSelect = ({ width = '200px' }: MetaverseSelectProps) => {
  const [metaverse, setMetaverse] = useMetaverseQueryParam();
  const metaverses = useMetaverses();

  const options = useMemo(() => {
    return metaverses.map((metaverse) => {
      return {
        value: metaverse.id,
        label: metaverse.name,
        icon: <MetaverseIcon size={20} metaverseId={metaverse.id} />,
      };
    });
  }, [metaverses]);

  return <ControlledSelect width={width} value={metaverse} onChange={setMetaverse} options={options} />;
};

export default MetaverseSelect;
