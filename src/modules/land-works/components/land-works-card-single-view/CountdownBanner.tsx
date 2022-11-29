import React from 'react';
import Countdown, { CountdownProps, CountdownRendererFn } from 'react-countdown';
import { Stack, Typography } from '@mui/material';

const renderCountdown: CountdownRendererFn = ({ days, formatted }) => {
  const countdownParts = [formatted.hours, formatted.minutes, formatted.seconds];

  if (days > 0) {
    countdownParts.unshift(formatted.days);
  }

  return countdownParts.join(':');
};

interface CountdownBannerProps extends Pick<CountdownProps, 'date'> {
  label: string;
}

const CountdownBanner = ({ label, date }: CountdownBannerProps) => {
  return (
    <Stack p={3} alignItems="center" width={260} bgcolor="var(--theme-grey900-color)" borderRadius="0 0 20px 20px">
      <Typography fontFamily="monospace" variant="h2" component="p" color="var(--theme-accent-color)">
        <Countdown date={date} renderer={renderCountdown} />
      </Typography>
      <Typography mt="-4px" textTransform="uppercase" variant="button" color="var(--theme-subtle-color)">
        {label}
      </Typography>
    </Stack>
  );
};

export default CountdownBanner;
