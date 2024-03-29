import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button } from 'design-system';
import useIsMetamaskConnected from 'hooks/useIsMetamaskConnected';
import SplitBeeListButton from 'layout/metric/SplitBeeListButton';
import { useListingModal } from 'providers/listing-modal-provider';
import { ReactComponent as EmptyStateAsset } from 'resources/svg/empty-state.svg';
import { APP_ROUTES } from 'router/routes';

import { CrossIconStyled, RootStyled, TypographyStyled } from './styled';

const LandsWorksGridEmptyState: FC = () => {
  const history = useHistory();
  const listingModal = useListingModal();
  const isMetamaskConnected = useIsMetamaskConnected();

  return (
    <RootStyled>
      <EmptyStateAsset />
      <TypographyStyled variant="h3">Looks like your list is empty</TypographyStyled>
      <TypographyStyled variant="h6">Explore what you can rent or list yours for lending</TypographyStyled>
      <Box sx={{ paddingTop: '60px' }}>
        <Button variant="secondary" btnSize="medium" onClick={() => history.push(APP_ROUTES.explore)}>
          Explore
        </Button>

        {isMetamaskConnected && (
          <SplitBeeListButton sx={{ ml: 4 }} variant="gradient" btnSize="medium" onClick={() => listingModal.open()}>
            <CrossIconStyled />
            List New Property
          </SplitBeeListButton>
        )}
      </Box>
    </RootStyled>
  );
};

export default LandsWorksGridEmptyState;
