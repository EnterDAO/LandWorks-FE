import { Typography as MuiTypography, TypographyProps, styled } from '@mui/material';

const Typography = styled((props: TypographyProps) => {
  return <MuiTypography {...props} color={props.color === 'gradient' ? undefined : props.color} />;
})(({ color }) => {
  const gradient =
    color === 'gradient'
      ? {
          background: 'var(--theme-primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 0.5em rgba(221, 61, 203, 0.6)',
        }
      : undefined;

  return {
    ...gradient,
  };
}) as typeof MuiTypography;

export default Typography;
