import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button } from 'design-system';
import { ReactComponent as EmptyStateAsset } from 'resources/svg/empty-state.svg';

import { CrossIconStyled, RootStyled, TypographyStyled } from './styled';

const LandsWorksGridEmptyState: FC = () => {
  const history = useHistory();

  return (
    <RootStyled>
      <EmptyStateAsset />
      <TypographyStyled variant="h3">Looks like your list is empty</TypographyStyled>
      <TypographyStyled variant="h6">Explore what you can rent or list yours for lending</TypographyStyled>
      <Box sx={{ paddingTop: '60px' }}>
        <Button
          variant="secondary"
          btnSize="medium"
          sx={{ marginRight: '20px' }}
          onClick={() => history.push('/explore')}
        >
          Explore
        </Button>
        <Button variant="gradient" btnSize="medium" onClick={() => history.push('/list')}>
          <CrossIconStyled />
          List New Property
        </Button>
      </Box>
    </RootStyled>
  );
};

export default LandsWorksGridEmptyState;
