import { FC, MouseEvent } from 'react';
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
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}
const UserInfo: FC<UserInfoProps> = ({ open, address, onClick }) => {
  const wallet = useWallet();

  return (
    <Box
      position="relative"
      display="flex"
      height={1}
      alignItems="center"
      onClick={onClick}
      pr="12px"
      pl={{
        xs: '12px',
        xxl: 6,
      }}
      sx={{
        cursor: 'pointer',
        ':after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          pointerEvents: 'none',
          bgcolor: 'var(--theme-grey900-color)',
          opacity: 0,
          transition: 'opacity 0.15s',
        },
        ':hover:after': {
          opacity: 0.1,
        },
        ':active:after': {
          opacity: 0.2,
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Identicon address={wallet.account} width={36} height={36} />

        <Box
          gap={1}
          sx={{
            display: 'none',
            '@media (min-width: 1300px)': {
              display: 'flex',
            },
          }}
        >
          <Typography variant="body1" display={{ xs: 'none', xxl: 'inline-block' }} component="span">
            gm
          </Typography>
          <Typography
            variant="body1"
            fontWeight={700}
            sx={{
              fontSize: {
                xs: 14,
                xxl: 16,
              },
            }}
            color="var(--theme-grey900-color)"
            component="span"
          >
            {address}
          </Typography>
        </Box>

        <Icon iconElement={<HiIcon />} display={{ xs: 'none', xxl: 'inline-block' }} />
      </Box>

      <Divider sx={styles.divider} orientation="vertical" flexItem />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        width={40}
        height={40}
        bgcolor="var(--theme-grey200-color)"
        borderRadius="10px"
        sx={{
          '> *': {
            transition: 'all 0.15s !important',
            transformOrigin: 'center',
            transform: `rotate(${open ? 0 : -180}deg)`,
          },
        }}
      >
        <DropdownIcon />
      </Box>
    </Box>
  );
};
export default UserInfo;
