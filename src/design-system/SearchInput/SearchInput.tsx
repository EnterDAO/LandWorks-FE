import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { InputUnstyledProps } from '@mui/base/InputUnstyled';
import { Box, Collapse } from '@mui/material';

import IconButton from '../IconButton/IconButton';
import { SearchIcon } from '../icons';
import Input from '../Input/Input';
import { searchInputStyles } from './search-input-styles';

interface SearchInputProps {
  inputProps?: InputUnstyledProps;
}

const SearchInput = forwardRef((props: SearchInputProps, ref) => {
  const { inputProps } = props;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useImperativeHandle(ref, () => ({
    closeSearchBox: () => {
      setExpanded(false);
    },
  }));

  return (
    <Box
      ref={ref}
      sx={{
        ...searchInputStyles.searchBox,
        ...{ ...(expanded && searchInputStyles.searchBoxExpanded) },
      }}
    >
      <IconButton
        variant="rectangular"
        btnSize="large"
        icon={<SearchIcon />}
        colorVariant="transparent"
        type="button"
        onClick={handleExpandClick}
      />
      <Collapse in={expanded} orientation="horizontal" sx={searchInputStyles.collapseEl}>
        <Input placeholder="Search for games, events..." {...(inputProps as any)} type="text" />
      </Collapse>
    </Box>
  );
});

export default SearchInput;
