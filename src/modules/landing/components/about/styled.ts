import { Link } from 'react-router-dom';
import { Grid, styled } from '@mui/material';

export const StyledText = styled('p')(() => ({
  maxWidth: 200,
  textDecoration: 'none',
  fontSize: 12,
  fontWeight: 'bold',
  color: 'var(--theme-accent-color)',
}));

export const StyledSubtitle = styled('p')(() => ({
  color: 'var(--theme-subtle-color)',
  margin: 0,
  fontWeight: 'normal',
  fontSize: 16,

  '@media all and (max-width: 1024px)': {
    paddingBottom: 45,
  },
}));

export const StyledGrid = styled(Grid)(() => ({
  position: 'relative',
  display: 'flex',
  padding: '60px 0 0 40px',
  height: 295,
  '& svg': {
    position: 'absolute',
    zIndex: 0,
    left: 0,
    top: 0,
    border: '3px solid #27273A',
    borderRadius: 25,
  },
  '& div': {
    maxWidth: 589,
  },
  '& p': {
    maxWidth: 346,
  },
}));

export const LandOwner = styled('span')(() => ({
  fontSize: 'inherit',
  color: 'var(--theme-accent-color)',
}));

export const Rent = styled('span')(() => ({
  fontSize: 'inherit',
  background: 'linear-gradient(83.81deg, #AC2CCB -19.8%, #DD3DCB 22%, #EF9C92 100%)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  backgroundClip: 'text',
}));

export const StyledLink = styled(Link)(() => ({
  fontSize: 14,
  color: 'var(--theme-grey900-color)',
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    position: 'relative',
    marginLeft: 5,
    border: 'none',
    borderRadius: 25,
    transform: 'rotate(180deg)',
  },
  '&:hover': {
    color: 'var(--theme-grey900-color)',
  },
}));
