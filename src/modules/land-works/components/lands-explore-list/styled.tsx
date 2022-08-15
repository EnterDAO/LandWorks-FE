import { GridProps } from '@mui/material';
import { styled } from '@mui/system';

import { Grid } from 'design-system';

export const LandsSearchBarWrapperStyled = styled('div')(() => ({
  marginBottom: '1rem',
}));

export const StyledButton = styled('button', { shouldForwardProp: (propName) => propName !== 'isActive' })<{
  isActive?: boolean;
}>(({ isActive }) => ({
  padding: '10px',
  background: 'var(--theme-grey200-color)',
  display: 'flex',
  borderRadius: '10px',
  margin: '0 5px',
  color: '#b9b9d3',
  cursor: 'pointer',
  border: isActive ? '1px solid white' : '1px solid transparent',
  boxShadow: isActive ? '0 0 3px white' : 'none',
  '&:hover': {
    border: '1px solid white',
    boxShadow: '0 0 3px white',
    color: 'white',
  },
  '&:disabled': {
    color: '#666672',
    cursor: 'default',
    '&:hover': {
      border: '1px solid transparent',
      boxShadow: 'none',
      color: '#666672',
    },
  },
}));

export const StyledRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '20px',
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
