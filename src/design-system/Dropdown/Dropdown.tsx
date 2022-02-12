/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FC } from 'react';
import Select, { SelectProps } from '@mui/material/Select';

import { ArrowDownIcon } from 'design-system/icons';

import Icon from '../icons/Icon';
import { DropdownIcon, DropdownInput, DropdownInputProps } from './dropdown-styles';

interface Props {
  className: string;
}

const DropdownIndicator: FC<Props> = ({ className }) => {
  return (
    <DropdownIcon className={className}>
      <Icon iconElement={<ArrowDownIcon />} />
    </DropdownIcon>
  );
};

type DropdownProps<T> = SelectProps<T> & DropdownInputProps;

const Dropdown = <T,>({ small, ...selectProps }: DropdownProps<T>) => {
  return <Select IconComponent={DropdownIndicator} input={<DropdownInput small={small} />} {...selectProps} />;
};

export default Dropdown;
