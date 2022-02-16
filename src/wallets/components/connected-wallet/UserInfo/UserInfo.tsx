import Divider from '@mui/material/Divider';

import Identicon from 'components/custom/identicon';
import { Box, Icon, Typography } from 'design-system';
import { HiIcon } from 'design-system/icons';
import { ReactComponent as DropdownIcon } from 'resources/svg/dropdown-icon.svg';
import { useWallet } from 'wallets/wallet';

import { styles } from './userInfoStyles';

interface UserInfoProps {
  open: boolean;
  address?: string;
}
const UserInfo: React.FC<UserInfoProps> = (props) => {
  const { address, open, ...userInfoProps } = props;
  const wallet = useWallet();

  return (
    <Box sx={styles.userDetails} {...userInfoProps}>
      <Identicon address={wallet.account} width={36} height={36} className="mr-8" />
      <Box>
        <Typography variant="body1" component="span">
          gm
        </Typography>
        <Typography variant="body1" sx={styles.userName} component="span">
          {address}
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
