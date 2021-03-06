import { FC, useState } from 'react';

import { Box, Divider, Grid, Icon } from 'design-system';
import { Calendar02, Currency } from 'design-system/icons';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';

import s from './s.module.scss';

interface Props {
  defaultOpen?: boolean;
  handleOpen: () => void;
  variant: 'currency' | 'calendar';
}

const DropdownSection: FC<Props> = ({ handleOpen, variant, defaultOpen }) => {
  const [rotateChevron, setRotateChevron] = useState(false);

  const handleClick = () => {
    setRotateChevron(!rotateChevron);
    handleOpen();
  };

  return (
    <Grid item display="flex" flexDirection="column" xs={12} mt={8} className={s.wrapper} onClick={handleClick}>
      <Box display="flex" flexDirection="row" className={s.content}>
        <Icon
          iconElement={variant === 'currency' ? <Currency /> : <Calendar02 />}
          iconSize="s"
          className={s.icon}
          onClick={handleOpen}
        />
        {variant === 'currency' && <p>Rent Price</p>}
        {variant === 'calendar' && <p>Rent Period</p>}
        {defaultOpen ? (
          <Icon
            iconElement={<DropdownIcon />}
            iconSize="s"
            className={rotateChevron ? s.chevronReverseRotate : s.chevronReverse}
          />
        ) : (
          <Icon iconElement={<DropdownIcon />} iconSize="s" className={rotateChevron ? s.rotate : s.chevron} />
        )}
      </Box>
      <Divider orientation="horizontal" flexItem className={s.divider} />
    </Grid>
  );
};

export default DropdownSection;
