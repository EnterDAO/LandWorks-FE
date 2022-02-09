import TabsUnstyled, { tabsUnstyledClasses } from '@mui/base/TabsUnstyled';
import { styled } from '@mui/system';

const StyledTabs = styled(TabsUnstyled)({
  [`&.${tabsUnstyledClasses.vertical}`]: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export { StyledTabs };
