import React, { ReactChild } from 'react';

import landNotFoundImageSrc from 'assets/land-not-found.svg';
import Typography from 'components/common/Typography';
import { Box, Stack } from 'design-system';

interface EmptyAssetsListProps {
  title: string;
  subtitle: ReactChild | string;
}

const EmptyAssetsList = ({ title, subtitle }: EmptyAssetsListProps) => {
  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center">
      <Box component="img" src={landNotFoundImageSrc} width={170} mb={5} />

      <Typography variant="h1" component="p" mb={2}>
        {title}
      </Typography>

      {typeof subtitle === 'string' ? <Typography variant="subtitle2">{subtitle}</Typography> : subtitle}
    </Stack>
  );
};

export default EmptyAssetsList;
