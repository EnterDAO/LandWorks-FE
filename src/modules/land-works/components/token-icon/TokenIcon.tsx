import React from 'react';
import { Box } from '@mui/material';

import Icon, { IconProps } from 'components/common/Icon';
import Image from 'components/custom/image';
import useGetCoinGeckoCoinBySymbol from 'hooks/useGetCoinGeckoCoinBySymbol';
import { ReactComponent as EthIcon } from 'resources/svg/eth.svg';

interface TokenIconProps extends Omit<IconProps, 'icon'> {
  symbol: string;
}

const customIcons = {
  eth: EthIcon,
};

// TODO: add loading, error and unknown states
const TokenIcon = ({ symbol, ...iconProps }: TokenIconProps) => {
  const lowercasedSymbol = symbol.toLowerCase();
  const { data } = useGetCoinGeckoCoinBySymbol(lowercasedSymbol);
  const CustomIcon = customIcons[lowercasedSymbol as keyof typeof customIcons];
  const icon = CustomIcon ? (
    <CustomIcon />
  ) : data ? (
    <Image src={data.image.small} />
  ) : (
    <Box bgcolor="var(--theme-grey400-color)" borderRadius="100%" />
  );

  return <Icon icon={icon} {...iconProps} />;
};

export default TokenIcon;
