import Icon from 'components/custom/icon';

import { ReactComponent as HighIcon } from '../../../../resources/svg/order-high-first.svg';
import { ReactComponent as HottestIcon } from '../../../../resources/svg/order-hot.svg';
import { ReactComponent as LowIcon } from '../../../../resources/svg/order-low-first.svg';

export const sortData = [
  {
    label: 'Hottest first',
    value: 1,
    icon: <HottestIcon />,
  },
  {
    label: 'Price: low first',
    value: 2,
    icon: <LowIcon />,
  },
  {
    label: 'Price: high first',
    value: 3,
    icon: <HighIcon />,
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
