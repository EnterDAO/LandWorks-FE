import React from 'react';
import { Box } from '@mui/material';

import Icon, { IconProps } from 'components/common/Icon';
import { ReactComponent as EthIcon } from 'resources/svg/eth.svg';
import { ReactComponent as UsdcIcon } from 'resources/svg/usdc.svg';

interface PaymentTokenIconProps extends Omit<IconProps, 'icon'> {
  symbol: string;
}

const paymentTokenSymbolToIcon = {
  eth: <EthIcon />,
  usdc: <UsdcIcon />,
} as const;

const PaymentTokenIcon = ({ symbol, ...iconProps }: PaymentTokenIconProps) => {
  const icon = paymentTokenSymbolToIcon[symbol as keyof typeof paymentTokenSymbolToIcon] || <Box borderRadius="100%" />;

  return <Icon icon={icon} {...iconProps} />;
};

export default PaymentTokenIcon;
