import { SystemStyleObject } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

export const loaderRootStyles: SystemStyleObject = {
  display: 'inline-flex',
  padding: '9px',
};

export const loaderElementStyles: SystemStyleObject = {
  position: 'relative',
  width: '88px',
  height: '88px',
  borderRadius: '50%',
  // TODO Improve rgba to use the THEME_COLOR.light
  borderTop: '10px solid rgba(248, 248, 255, 0.2)',
  borderRight: '10px solid rgba(248, 248, 255, 0.2)',
  borderBottom: '10px solid rgba(248, 248, 255, 0.2)',
  borderLeft: `10px solid ${THEME_COLORS.light}`,
  transform: 'translateZ(0)',
  animation: 'loader 1.1s infinite linear',
};

// TODO Fix class, id, animation and etc. cannot load from App.global.css
export const animationsCss = `
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;
