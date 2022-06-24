import { styled } from '@mui/material';

import { Grid, Typography } from 'design-system';

export const StyledTitle = styled(Typography)(() => ({
  marginTop: 70,
  fontSize: 60,
  fontWeight: 'bold',
  color: 'var(--theme-light-color)',
  textAlign: 'center',
  '& span': {
    color: 'var(--theme-primary-color)',
    background: 'linear-gradient(83.81deg, #AC2CCB -19.8%, #DD3DCB 22%, #EF9C92 100%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 5px #dd3dca42',
    lineHeight: '50px',
  },
}));

export const StyledSubtitle = styled(Typography)(() => ({
  marginTop: 25,
  color: 'var(--theme-subtle-color)',
  fontSize: 18,
  textAlign: 'center',
}));

export const QuestionList = styled(Grid)(() => ({
  width: 680,
  flexDirection: 'row',
  margin: '90px auto',
}));

export const StyledImage = styled('img')(() => ({
  height: 'auto',
  width: 680,
  transform: 'scale(1.3)',
  margin: '80px 0',
}));

export const StyledQuestion = styled('p')(() => ({
  fontSize: 18,
  color: 'var(--theme-light-color)',
  fontWeight: 'bold',
}));

export const AnswerPoint = styled('p')(() => ({
  fontSize: 16,
  marginTop: 60,
  marginBottom: 20,
  color: 'var(--theme-light-color)',
}));
