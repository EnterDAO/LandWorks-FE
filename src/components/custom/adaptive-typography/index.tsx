import { TypographyTypeMap, typographyClasses } from '@mui/material';
import { styled } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { Typography } from 'design-system';

const AdaptiveTypography = styled(Typography)(({ theme }) => {
  return {
    [theme.breakpoints.down('lg')]: {
      [`&.${typographyClasses.h1}`]: {
        fontSize: theme.typography.h3.fontSize,
      },
      [`&.${typographyClasses.h2}, &.${typographyClasses.h3}`]: {
        fontSize: '20px',
      },
    },
  };
}) as OverridableComponent<TypographyTypeMap<Record<string, unknown>, 'span'>>;

export default AdaptiveTypography;
