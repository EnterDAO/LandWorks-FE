import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { shortenAddr } from 'web3/utils';

import Identicon from 'components/custom/identicon';
import { Box, Dropdown, Icon, Typography } from 'design-system';
import { HiIcon } from 'design-system/icons';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';
import { useWallet } from 'wallets/wallet';

import { styles } from './userInfoStyles';

interface Props {
  open: boolean;
  address: any
}

const UserInfo = ({ open, address }: Props) => {
  const wallet = useWallet();

  return (
    <Box sx={styles.userDetails}>
      <Identicon address={wallet.account} width={36} height={36} className="mr-8" />
      <Box>
        <Typography variant="body1" component="span">
          gm
        </Typography>
        <Typography variant="body1" sx={styles.userName} component="span">
          {address}
          {/* {shortenAddr(wallet.account, 10, 3)} */}
        </Typography>
      </Box>
      <Icon iconElement={<HiIcon />} sx={styles.hiIcon} />
      <Divider sx={styles.divider} orientation="vertical" flexItem />
      <Box sx={open ? styles.dropdownRotate : styles.dropdown}>
        <DropdownIcon />
      </Box>
    </Box>
  );
};
export default UserInfo;
