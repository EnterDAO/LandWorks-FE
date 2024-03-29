import { styled } from '@mui/material';

export const StyledRoot = styled('div')(() => ({
  padding: '0 var(--horizontal-padding) 0',
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

export const StyledButton = styled('button', { shouldForwardProp: (propName) => propName !== 'isActive' })<{
  isActive?: boolean;
}>(
  ({ isActive }) => `
  position: relative;
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
  border-color: ${isActive ? 'var(--theme-light-color)' : 'var(--theme-grey200-color)'};
  box-shadow: ${isActive ? '0 0 4px var(--theme-light-color)' : 'none'};

  p {
    margin-left: 10px;
  }

  &:hover {
    background: var(--theme-grey700-color);
  }

  & .Mui-disabled {
    cursor: not-allowed;
  }
  `
);
