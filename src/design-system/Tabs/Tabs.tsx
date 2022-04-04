import * as React from 'react';
import { FC } from 'react';
import { TabsUnstyledProps } from '@mui/base/TabsUnstyled';

import { StyledTabs } from './tabs-styles';

const Tabs: FC<TabsUnstyledProps> = (props) => {
  const { children } = props;
  return <StyledTabs {...props}>{children}</StyledTabs>;
};
export default Tabs;
