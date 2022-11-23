import { useMemo } from 'react';

import Icon from 'components/custom/icon';
import { landsData } from 'modules/land-works/components/lands-explore-filters/filters-data';

import useMetaversesQuery from './useMetaversesQuery';

const defaultOptions = [
  {
    label: 'Decentraland',
    value: 1,
    icon: <Icon name="png/Decentraland" width="20" height="20" />,
  },
  {
    label: 'Voxels',
    value: 2,
    icon: <Icon name="png/Voxel" width="20" height="20" />,
  },
];

const useMetaverseSelectOptions = () => {
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

  return options || defaultOptions;
};

export default useMetaverseSelectOptions;
