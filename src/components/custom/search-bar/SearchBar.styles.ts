import { styled } from '@mui/material';

export const StyledButton = styled('button')(
  () => `
  width: 12.5rem;
  font-size: 0.875rem;
  box-sizing: border-box;
  height: 3.125rem;
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
