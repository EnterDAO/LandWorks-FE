import { InputBase, inputBaseClasses, styled } from '@mui/material';
import { selectClasses } from '@mui/material/Select';

import { THEME_COLORS } from 'themes/theme-constants';

export interface DropdownInputProps {
  small?: boolean;
}

export const DropdownInput = styled(InputBase)<DropdownInputProps>`
  min-width: ${(props) => (props.small ? 200 : 285)}px;

  & .${inputBaseClasses.input} {
    color: ${THEME_COLORS.light};
    padding: 15px 20px;
    position: relative;
    background: ${THEME_COLORS.grey01};
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    transition: all 0.1s ease;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      border-radius: 10px;
      pointer-events: none;
      background: ${THEME_COLORS.light};
    }

    &:hover:after,
    &:focus:after {
      opacity: 0.1;
    }

    &:active:after {
      opacity: 0.1;
    }

    &:focus {
      // override default border-radius
      border-radius: 10px;
    }
  }
`;

export const DropdownIcon = styled('span')`
  &.${selectClasses.icon} {
    display: flex;
    position: absolute;
    right: 20px;
    top: unset;
    margin: auto;
    color: ${THEME_COLORS.light};
    transform-origin: center;
    transition: all 0.2s ease;
  }

  &.${selectClasses.iconOpen} {
    transform: rotate(180deg);
  }
`;
