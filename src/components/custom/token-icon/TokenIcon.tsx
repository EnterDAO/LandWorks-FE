import React, { FC } from 'react';
import { Box, SxProps } from '@mui/material';

import Icon, { IconNames } from '../icon';

const iconsByTokenSymbol = {
  eth: 'png/eth',
  usdc: 'token-usdc',
};

interface TokenIconProps {
  name: string;
  size?: number;
  sx?: SxProps;
}

const TokenIcon: FC<TokenIconProps> = ({ size, name, sx }) => {
  const normalizedSymbol = name.toLowerCase();
  const iconName = iconsByTokenSymbol[normalizedSymbol as keyof typeof iconsByTokenSymbol] as IconNames;

  return (
    <Box component="span" flexShrink={0} display="inline-flex" sx={sx}>
      <Icon width={size} height={size} name={iconName} />
    </Box>
  );
};

export default TokenIcon;
