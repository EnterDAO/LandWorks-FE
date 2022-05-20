import { styled } from '@mui/material/styles';

import { THEME_COLORS } from 'themes/theme-constants';

const Icon = styled('span')(() => ({
  borderRadius: 3,
  width: 17,
  height: 17,
  border: `2px solid ${THEME_COLORS.light}`,
  'input:hover ~ &': {
    backgroundColor: THEME_COLORS.grey02,
  },
}));

const CheckedIcon = styled(Icon)({
  backgroundColor: THEME_COLORS.accentBlue,
  border: 'none',
  '&:before': {
    display: 'block',
    width: 17,
    height: 17,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: THEME_COLORS.accentBlue,
  },
});

const checkboxStyle = {
  marginRight: '10px',
  padding: '0',
} as const;

export { Icon, CheckedIcon, checkboxStyle };
