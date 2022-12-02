import React from 'react';
import { Box, Divider } from '@mui/material';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Typography } from 'design-system';
import { getTokenIconName } from 'helpers/helpers';
import { AssetEntity } from 'modules/land-works/api';

import LandCardAvailability from '../land-works-card-availability';

import { formatBigNumber, formatUsd } from 'utils';

interface LandTooltipContentProps {
  land: AssetEntity;
}

const LandTooltipContent = ({ land }: LandTooltipContentProps) => {
  const usdPrice = (land.pricePerMagnitude.usdPrice || ZERO_BIG_NUMBER).toFixed();
  const formattedUsdPrice = formatUsd(usdPrice);
  const price = land.pricePerMagnitude.price.toFixed();
  const formattedPrice = formatBigNumber(land.pricePerMagnitude.price);

  return (
    <>
      <Typography mb={2} noWrap variant="body2" color="var(--theme-light-color)">
        {land.name}
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
          <Icon width={15} height={15} name={getTokenIconName(land.paymentToken.symbol)} />
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
          /{land.pricePerMagnitude.magnitude}
        </Typography>
      </Typography>

      <Divider sx={{ borderColor: 'var(--theme-separator-color)', my: 2 }} />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography textTransform="uppercase" variant="body2" color="var(--theme-subtle-color)">
            Rent period
          </Typography>
          <Typography textTransform="uppercase" variant="body2" color="var(--theme-light-color)">
            {land.minPeriodTimedType}-{land.maxPeriodTimedType}
          </Typography>
        </Box>

        <Box mx={1}>
          <LandCardAvailability layout="compact" land={land} />
        </Box>
      </Box>
    </>
  );
};

export default LandTooltipContent;
