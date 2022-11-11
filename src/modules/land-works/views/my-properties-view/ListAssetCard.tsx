import React, { FC } from 'react';
import { Box, Divider, Stack } from '@mui/material';

import { Button, Typography } from 'design-system';
import { BaseNFT } from 'modules/interface';
import { useWallet } from 'wallets/wallet';

import { shortenString } from 'modules/land-works/utils';

interface ListAssetCardProps {
  asset: BaseNFT;
}

const ListAssetCard: FC<ListAssetCardProps> = ({ asset }) => {
  const wallet = useWallet();

  return (
    <Stack
      boxSizing="border-box"
      borderRadius="20px"
      width={300}
      bgcolor="var(--theme-card-color)"
      border="2px solid transparent"
      p={3}
      minHeight={363}
      gap={3}
      sx={{
        transition: 'all 0.2s ease-out',
        ':hover': {
          boxShadow: '0px 5px 18px rgba(255, 255, 255, 0.3)',
          borderColor: 'var(--theme-primary-color)',
        },
      }}
    >
      <Box
        component="img"
        height={160}
        src={asset.image}
        sx={{
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />

      <Stack>
        <Typography variant="h4" mb="2px">
          {asset.name}
        </Typography>

        <Typography variant="body2" color="var(--theme-subtle-color)">
          BY {shortenString(wallet.account || '')}
        </Typography>
      </Stack>

      <Divider sx={{ borderColor: 'var(--theme-separator-color)' }} />

      <Button sx={{ width: '100% !important', mt: 'auto' }} variant="accentblue" btnSize="xsmall">
        List now
      </Button>
    </Stack>
  );
};

export default ListAssetCard;
