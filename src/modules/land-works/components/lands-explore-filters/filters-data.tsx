import Icon from 'components/custom/icon';

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
];

export const landsData = [
  {
    label: 'Decentraland',
    value: 1,
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
