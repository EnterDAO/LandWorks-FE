import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { Grid, Icon } from 'design-system';
import { Calendar02, Currency } from 'design-system/icons';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';

import s from './s.module.scss';

interface Props {
  handleOpen: () => void;
  variant: 'currency' | 'calendar';
}

const DropdownSection: FC<Props> = ({ handleOpen, variant }) => {
  const [rotateChevron, setRotateChevron] = useState(false);

  const handleClick = () => {
    setRotateChevron(!rotateChevron);
    handleOpen();
  };

  return (
    <Grid display="flex" flexDirection="column" xs={12} mt={8} className={s.wrapper} onClick={handleClick}>
      <Box display="flex" flexDirection="row" className={s.content}>
        <Icon
          iconElement={variant === 'currency' ? <Currency /> : <Calendar02 />}
          iconSize="s"
          className={s.icon}
          onClick={handleOpen}
        />
        {variant === 'currency' && <p>Rent Price</p>}
        {variant === 'calendar' && <p>Rent Period</p>}
        <Icon iconElement={<DropdownIcon />} iconSize="s" className={rotateChevron ? s.rotate : s.chevron} />
      </Box>
      <Divider orientation="horizontal" flexItem className={s.divider} />
    </Grid>
  );
};

export default DropdownSection;
