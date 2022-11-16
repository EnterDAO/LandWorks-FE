import { FC, useEffect, useMemo } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

import Icon from 'components/custom/icon';
import { ControlledSelect } from 'design-system';
import useMetaversesQuery from 'hooks/useMetaversesQuery';

interface MetaverseQueryParamSelectProps {
  value?: number;
  onChange: (value: number) => void;
}

// export const useMetaverseQueryParam = (name: string) => useQueryParam(name, NumberParam);
// const [metaverse, setMetaverse] = useMetaverseQueryParam(name);
// const value = metaverse || options[0]?.value || -1;

const MetaverseSelect: FC<MetaverseQueryParamSelectProps> = ({ value, onChange }) => {
  const { data } = useMetaversesQuery();

  const options = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.map((metaverse) => {
      const metaverseIconName = metaverse.name === 'Decentraland' ? 'png/Decentraland' : 'png/Voxel';

      return {
        label: metaverse.name,
        value: +metaverse.id,
        icon: <Icon name={metaverseIconName} width="20" height="20" />,
      };
    });
  }, [data]);

  useEffect(() => {
    if (!value && options.length > 0) {
      onChange(options[0].value);
    }
  }, [options]);

  return <ControlledSelect width="200px" value={value} onChange={onChange} options={options} />;
};

export default MetaverseSelect;
