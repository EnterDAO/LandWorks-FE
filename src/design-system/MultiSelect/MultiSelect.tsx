import { MenuProps, SelectProps } from '@mui/material';

import FilterTag from '../FilterTag/FilterTag';
import { MultiSelectItem, menuListStyles, menuPaperStyles } from './multi-select-styles';
import { Dropdown } from '..';

const multiSelectMenuProps: MenuProps = {
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  PaperProps: {
    sx: menuPaperStyles,
  },
  MenuListProps: {
    // eslint-disable-next-line
    // @ts-ignore
    component: 'div',
    sx: menuListStyles,
  },
};

interface MultiSelectProps extends SelectProps<string[]> {
  tags: string[];
}

const MultiSelect = ({ value, children, tags, ...otherProps }: MultiSelectProps) => {
  return (
    <Dropdown {...otherProps} value={value} multiple MenuProps={multiSelectMenuProps}>
      {value &&
        tags.map((tag) => {
          return (
            <MultiSelectItem
              key={tag}
              value={tag}
              disableGutters
              disableTouchRipple
              disableRipple
              // eslint-disable-next-line
              // @ts-ignore
              component="span"
            >
              <FilterTag checked={value.includes(tag)} label={tag} />
            </MultiSelectItem>
          );
        })}
      {children}
    </Dropdown>
  );
};

export default MultiSelect;
