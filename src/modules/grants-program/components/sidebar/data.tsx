import { FAQIcon, FilledStar, FilledSuccess, HeartFilledIcon } from 'design-system/icons';

export const DEFAULT_TABS = [
  {
    id: 0,
    title: 'About',
    icon: <FilledStar />,
  },
  {
    id: 1,
    title: 'Process',
    icon: <FilledSuccess />,
  },
  {
    id: 2,
    title: 'Jury and Scoring',
    icon: <HeartFilledIcon width={20} height={20} style={{ color: '#5D8FF0' }} />,
  },
  {
    id: 3,
    title: 'FAQ',
    icon: <FAQIcon />,
  },
];
