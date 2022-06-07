import Icon from 'components/custom/icon';
import { Option } from 'modules/interface';

export const sortData = [
  {
    label: 'Hottest first',
    value: 1,
  },
  {
    label: 'Price: low first',
    value: 2,
  },
  {
    label: 'Price: high first',
    value: 3,
  },
  {
    label: 'Period: shortest first',
    value: 4,
  },
  {
    label: 'Period: longest first',
    value: 5,
  },
  {
    label: 'Recently: listed',
    value: 6,
  },
  {
    label: 'Recently: rented',
    value: 7,
  },
  {
    label: 'Size: biggest',
    value: 8,
  },
];

export const landsData = [
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

export const currencyData = [
  {
    label: 'All Currencies',
    value: 0,
  },
  {
    label: 'ETH',
    value: 1,
    icon: <Icon name="png/eth" width="20" height="20" />,
  },
  {
    label: 'USDC',
    value: 2,
    icon: <Icon name="token-usdc" width="20" height="20" />,
  },
];

export const addIconToMetaverse = (metaverses: Option[]): Option[] => {
  metaverses.forEach((meta) => {
    meta.label === 'Decentraland'
      ? (meta.icon = <Icon name="png/Decentraland" width="20" height="20" />)
      : (meta.icon = <Icon name="png/Voxel" width="20" height="20" />);
  });
  return metaverses;
};
