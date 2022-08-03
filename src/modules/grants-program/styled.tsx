import { FC } from 'react';
import { TypographyProps } from '@mui/material';
import { styled } from '@mui/system';

import { Typography } from 'design-system';

export const StyledContent = styled('div')({
  marginTop: 160,
  display: 'flex',
  flexDirection: 'row',

  '@media (max-width: 400px)': {
    marginTop: 60,
  },
});

export const ContentWrapper = styled('div')({
  paddingLeft: 50,
  '@media (max-width: 400px)': {
    paddingLeft: 0,
    maxWidth: 370,
  },
});

export const SectionTitleOld = styled('h1')({
  fontSize: 40,
  color: 'var(--theme-grey900-color)',
  lineHeight: '60px',
  '@media (max-width: 400px)': {
    fontSize: 25,
  },
});

export const SubTitle = styled('h3')({
  fontSize: 18,
  color: 'var(--theme-grey900-color)',
  lineHeight: '27px',
  marginTop: 65,
  marginBottom: 15,
  '@media (max-width: 400px)': {
    marginTop: 40,
    width: 330,
  },
});

export interface SpecificSectionProps {
  id: string;
}

export const Section = styled('section')(({ theme }) => {
  return {
    scrollMarginTop: 130,
    [theme.breakpoints.up('md')]: {
      scrollMarginTop: 160,
    },
  };
});

export const SectionTitle: FC = ({ children }) => {
  return (
    <Typography component="h2" sx={{ mb: { xs: 8, md: 13 }, typography: { xs: 'h3', md: 'h1' } }}>
      {children}
    </Typography>
  );
};

export const SubSection = styled('div')(({ theme }) => {
  return {
    ':not(:last-child)': {
      marginBottom: 40,
    },
    [theme.breakpoints.up('md')]: {
      ':not(:last-child)': {
        marginBottom: 65,
      },
    },
  };
});

export const SubSectionTitle = styled((props: TypographyProps<'h3'>) => {
  return <Typography mb={3} component="h3" variant="h4" {...props} />;
})({});

export const WithGreyBorder = styled('div')({
  border: '3px solid #27273A',
  padding: 15,
  borderRadius: 20,
  minWidth: 80,
  minHeight: 80,
  maxWidth: 80,
  maxHeight: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
