import { styled } from '@mui/system';

import { Pagination } from 'design-system';

const PaginationStyled = styled(Pagination)(() => ({
  margin: '64px 0',
  '& .MuiPaginationItem-root': {
    color: '#fff',
  },
}));

export default PaginationStyled;
