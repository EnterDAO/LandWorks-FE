import { FC } from 'react';
import TabPanelUnstyled, { TabPanelUnstyledProps } from '@mui/base/TabPanelUnstyled';

const TabPanel: FC<TabPanelUnstyledProps> = (props) => {
  const { children } = props;

  return <TabPanelUnstyled {...props}>{children}</TabPanelUnstyled>;
};

export default TabPanel;
