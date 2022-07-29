import { styled } from '@mui/system';

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

export const SectionTitle = styled('h1')({
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
