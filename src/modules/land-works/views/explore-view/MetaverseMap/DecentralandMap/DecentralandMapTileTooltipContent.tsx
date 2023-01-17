import React from 'react';
import { Box, Divider } from '@mui/material';
import { ZERO_BIG_NUMBER, formatUSD } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Typography } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { AssetEntity } from 'modules/land-works/api';
import LandCardAvailability from 'modules/land-works/components/land-works-card-availability';

import { formatBigNumber } from 'utils';

interface DecentralandMapTileTooltipContentProps {
  asset: AssetEntity;
}

const DecentralandMapTileTooltipContent = ({ asset }: DecentralandMapTileTooltipContentProps) => {
  const usdPrice = (asset.pricePerMagnitude.usdPrice || ZERO_BIG_NUMBER).toFixed();
  const formattedUsdPrice = formatUSD(usdPrice);
  const price = asset.pricePerMagnitude.price.toFixed();
  const formattedPrice = formatBigNumber(asset.pricePerMagnitude.price);

  return (
    <>
      <Typography mb={2} noWrap variant="body2" color="var(--theme-light-color)">
        {asset.name}
      </Typography>

      <Typography variant="body2" display="flex" alignItems="center" noWrap gap={1}>
        <Typography
          variant="inherit"
          color="var(--theme-light-color)"
          display="inline-flex"
          alignItems="center"
          overflow="hidden"
          gap="2px"
          component="span"
        >
          <Icon width={15} height={15} name={getTokenIconName(asset.paymentToken.symbol)} />
          <Typography component="span" title={price} variant="inherit" noWrap display="block">
            {formattedPrice}
          </Typography>
        </Typography>
        <Typography
          title={usdPrice}
          color="var(--theme-subtle-color)"
          display="inline-flex"
          variant="inherit"
          component="span"
          overflow="hidden"
          minWidth={70}
        >
          <Typography component="span" variant="inherit" noWrap display="block">
            {formattedUsdPrice}
          </Typography>
          /{asset.pricePerMagnitude.magnitude}
        </Typography>
      </Typography>

      <Divider sx={{ borderColor: 'var(--theme-separator-color)', my: 2 }} />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography textTransform="uppercase" variant="body2" color="var(--theme-subtle-color)">
            Rent period
          </Typography>
          <Typography textTransform="uppercase" variant="body2" color="var(--theme-light-color)">
            {asset.minPeriodTimedType}-{asset.maxPeriodTimedType}
          </Typography>
        </Box>

        <Box mx={1}>
          <LandCardAvailability layout="compact" land={asset} />
        </Box>
      </Box>
    </>
  );
};

export default DecentralandMapTileTooltipContent;
