import { styled } from '@mui/material';

export const StyledRoot = styled('div')(() => ({
  height: 'var(--explore-filters)',
  padding: '10px var(--horizontal-padding) 0',
  position: 'relative',
  '& .container': {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    justifyContent: 'space-between',
  },
  '& .box': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const StyledButton = styled('button')(
  () => `
  width: 12rem;
  margin-left: 20px;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  background: var(--theme-grey200-color);
  border: 1px solid var(--theme-grey200-color);
  border-radius: 10px;
  padding: 10px 12px;
  text-align: left;
  line-height: 1.5;
  color: var(--theme-grey900-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  p {
    margin-left: 10px;
  }

  &:hover {
    background: var(--theme-grey700-color);
    border-color: var(--theme-grey700-color);
  }

  & .Mui-disabled {
    cursor: not-allowed;
  }

  `
);
