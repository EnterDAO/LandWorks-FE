import { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { styled } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

export const ToggleButtonRoot = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${THEME_COLORS.grey02};
    border-radius: 30px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition: all 200ms ease;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 18px;
    height: 18px;
    transform: translate(6px, 6px);
    border-radius: 100%;
    background-color: ${THEME_COLORS.light};
    position: relative;
    transition: all 200ms ease;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 34px;
    top: -3px;
    left: -3px;
    border: 3px solid transparent;
    transition: all 0.1s ease;
    pointer-events: none;
  }

  &.${switchUnstyledClasses.focusVisible}:after {
    box-shadow: 0 0 0 3px ${THEME_COLORS.grey02};
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      transform: translate(36px, 6px);
      background-color: ${THEME_COLORS.light};
    }

    & .${switchUnstyledClasses.track} {
      background: ${THEME_COLORS.accentBlue};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
  }
`;
