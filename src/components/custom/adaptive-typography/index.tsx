import { TypographyTypeMap, typographyClasses } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { styled } from '@mui/system';

import { Typography } from 'design-system';
import typographyStyles from 'themes/typography-styles';

const AdaptiveTypography = styled(Typography)(({ theme }) => {
  return {
    [theme.breakpoints.down('xl')]: {
      [`&.${typographyClasses.h1}`]: {
        fontSize: typographyStyles.h3.fontSize,
        lineHeight: typographyStyles.h3.lineHeight,
      },
      [`&.${typographyClasses.h2}, &.${typographyClasses.h3}`]: {
        fontSize: '20px',
        lineHeight: '30px',
      },
    },
  };
}) as OverridableComponent<TypographyTypeMap<Record<string, unknown>, 'span'>>;

export default AdaptiveTypography;
