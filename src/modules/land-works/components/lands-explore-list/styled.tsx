import { GridProps } from '@mui/material';
import { styled } from '@mui/system';

import { Grid } from 'design-system';

export const LandsSearchBarWrapperStyled = styled('div')(() => ({
  marginBottom: '1rem',
}));

export const StyledButton = styled('button', { shouldForwardProp: (propName) => propName !== 'isActive' })<{
  isActive?: boolean;
}>(({ isActive }) => ({
  background: 'var(--theme-grey200-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 52,
  width: 52,
  borderRadius: '10px',
  color: isActive ? 'var(--theme-light-color)' : '#b9b9d3',
  cursor: 'pointer',
  border: '2px solid transparent',
  borderColor: isActive ? 'var(--theme-light-color)' : 'transparent',
  boxShadow: isActive ? '0 0 4px white' : 'none',
  '&:hover': {
    borderColor: 'var(--theme-light-color)',
    boxShadow: '0 0 4px var(--theme-light-color)',
    color: 'var(--theme-light-color)',
  },
  '&:disabled': {
    color: '#666672',
    cursor: 'default',
    '&:hover': {
      borderColor: 'transparent',
      boxShadow: 'none',
      color: '#666672',
    },
  },
}));

export const StyledRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const StyledText = styled('span')(() => ({
  color: 'white',
}));

export const StyledGridContainer = styled(Grid)(() => ({
  ['@media (min-width: 2660px)']: {
    maxWidth: '2540px',
    margin: '0 auto',
  },
}));

interface StyledGridItemProps extends GridProps {
  size?: 'normal' | 'compact';
  isMapVisible?: boolean;
}
export const StyledGridItem = styled(({ size = 'normal', isMapVisible, ...otherProps }: StyledGridItemProps) => {
  const breakpoints =
    size === 'compact'
      ? {
          // md: isMapVisible ? 6 : 4,
          lg: isMapVisible ? 2 : 3,
          '2xl': isMapVisible ? 3 : 2,
        }
      : isMapVisible
      ? {
          xs: 12,
          md: 6,
          xl: 6,
        }
      : {
          xs: 12,
          md: 6,
          lg: 4,
          xl: 3,
        };

  return <Grid item xs={12} {...breakpoints} {...otherProps} />;
})({});
