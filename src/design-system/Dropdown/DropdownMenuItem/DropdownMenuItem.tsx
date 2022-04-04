import { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';

import Icon from '../../icons/Icon';
import { styles } from './dropdownMenuItem-styles';

import { THEME_COLORS } from 'themes/theme-constants';

interface DropdownItemProps {
  heading: string;
  icon: ReactElement;
  onClick?: () => void;
}

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const { heading, icon, onClick } = props;
  return (
    <Box sx={styles.itemContainer} onClick={onClick}>
      <Icon iconElement={icon} iconSize="s" mr={2} ml={2} />
      <Typography variant="button" color={THEME_COLORS.grey03} component="p">
        {heading}
      </Typography>
    </Box>
  );
};

export default DropdownItem;
