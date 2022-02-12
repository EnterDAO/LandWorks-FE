import { FC } from 'react';
import { TabsListUnstyledProps } from '@mui/base';

import { StyledTabsList } from './tabs-list-styles';

const TabsList: FC<TabsListUnstyledProps> = (props) => {
  const { children } = props;
  return <StyledTabsList {...props}>{children}</StyledTabsList>;
};
export default TabsList;
