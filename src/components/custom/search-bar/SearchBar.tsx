import React, { useEffect, useRef, useState } from 'react';
import { Box, Slide } from '@mui/material';

import { ReactComponent as RoundClose } from 'assets/icons/round-close.svg';
import { SearchIcon } from 'design-system/icons';
import LandsSearchBar from 'modules/land-works/components/lands-search';

import { StyledButton } from './SearchBar.styles';

interface SearchBarProps {
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const SearchBar = ({ onChange, value, placeholder }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const timeoutId = window.setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, [open]);

  const toggleOpen = () => {
    setOpen((prevOpen) => {
      const nextOpen = !prevOpen;

      if (onChange) {
        onChange('');
      }

      return nextOpen;
    });
  };

  return (
    <>
      <Box
        position="absolute"
        width={1}
        top={-5}
        right={0}
        py={1}
        overflow="hidden"
        borderRadius="10px"
        sx={{ pointerEvents: open ? 'all' : 'none' }}
      >
        <Slide in={open} direction="left" timeout={300}>
          <Box
            borderRadius="10px"
            bgcolor="var(--theme-modal-color)"
            // hides glowing effect of the elements that placed under search bar when it's opened
            boxShadow="0 -5px var(--theme-body-color), 0 5px var(--theme-body-color)"
            pr="52px"
          >
            <LandsSearchBar
              inputRef={inputRef}
              searchQuery={value}
              setSearchQuery={onChange}
              placeholder={placeholder}
            />
          </Box>
        </Slide>
      </Box>
      <StyledButton
        onClick={toggleOpen}
        sx={{
          position: 'relative',
          width: 52,
        }}
      >
        <Box display="inline-flex" sx={{ transition: 'opacity 0.2s', opacity: +!open }}>
          <SearchIcon height={24} width={24} />
        </Box>
        <Box position="absolute" display="inline-flex" sx={{ transition: 'opacity 0.2s', opacity: +open }}>
          <RoundClose height={24} width={24} />
        </Box>
      </StyledButton>
    </>
  );
};

export default SearchBar;
