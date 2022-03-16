import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Modal } from 'design-system';
import ListNewProperty from 'modules/land-works/components/list-new-property';
import { ReactComponent as EmptyStateAsset } from 'resources/svg/empty-state.svg';

import { CrossIconStyled, RootStyled, TypographyStyled } from './styled';

const LandsWorksGridEmptyState: FC = () => {
  const history = useHistory();
  const [showListNewModal, setShowListNewModal] = useState(false);

  return (
    <>
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
          <Button variant="gradient" btnSize="medium" onClick={() => setShowListNewModal(true)}>
            <CrossIconStyled />
            List New Property
          </Button>
        </Box>
      </RootStyled>

      <Modal height={800} open={showListNewModal} handleClose={() => setShowListNewModal(false)}>
        <ListNewProperty />
      </Modal>
    </>
  );
};

export default LandsWorksGridEmptyState;
