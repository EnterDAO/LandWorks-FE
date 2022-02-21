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
    label: 'ETH',
    value: 0,
  },
  {
    label: 'USDC',
    value: 1,
  },
];
