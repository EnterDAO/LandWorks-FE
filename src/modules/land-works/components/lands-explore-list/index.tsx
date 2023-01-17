import { FC, MouseEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';

import CardsGrid from 'components/custom/cards-grid';
import Divider from 'components/custom/divider';
import { useSearchBar } from 'components/custom/search-bar/SearchBar';
import { Box, Icon, Stack, Typography } from 'design-system';
import { GridBigIcon, GridIcon } from 'design-system/icons';
import useGetIsMounted from 'hooks/useGetIsMounted';
import useIsMetamaskConnected from 'hooks/useIsMetamaskConnected';
import LoadMoreButton from 'layout/components/load-more-button';
import useLoadMoreButton from 'layout/components/load-more-button/useLoadMoreButton';
import SplitBeeListButton from 'layout/metric/SplitBeeListButton';
import { LocationState } from 'modules/interface';
import { AssetEntity } from 'modules/land-works/api';
import LandWorkCard from 'modules/land-works/components/land-works-card-explore-view';
import { useListingModal } from 'providers/listing-modal-provider';
import { useStickyOffset } from 'providers/sticky-offset-provider';
import { getPropertyPath } from 'router/routes';

import PropertyCardSkeleton from '../land-works-card-explore-view/PropertyCardSkeleton';
import { StyledButton } from './styled';

import { filterLandsByAvailability, filterLandsByQuery } from 'modules/land-works/utils';
import { sessionStorageHandler } from 'utils';

import { THEME_COLORS } from 'themes/theme-constants';

interface Props {
  lastRentEnd: string;
  loading: boolean;
  lands: AssetEntity[];
  selectedAssetId?: string;
  onSelectAsset: (assetId: string) => void;
  isMapVisible: boolean;
}

const NUMBER_OF_CARDS_PER_LOAD = 18;

const LandsExploreList: FC<Props> = ({ loading, lands, selectedAssetId, onSelectAsset, lastRentEnd, isMapVisible }) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const stickyOffset = useStickyOffset();
  const [searchQuery] = useSearchBar();
  const getIsMounted = useGetIsMounted();
  const timeoutIdRef = useRef<number>();
  const listingModal = useListingModal();
  const isMetamaskConnected = useIsMetamaskConnected();
  const activeLandRef = useRef<HTMLAnchorElement | null>(null);

  const [cardsSize, setCardsSize] = useState<'compact' | 'normal'>('normal');

  const initialNumberOfCards = Math.max(
    sessionStorageHandler('get', 'explore-page', 'listed') || 0,
    isMapVisible ? (cardsSize === 'compact' ? 10 : 6) : 18
  );

  const totalOffsetsRef = useRef(stickyOffset.offsets.exploreHeader);

  useEffect(() => {
    totalOffsetsRef.current = stickyOffset.offsets.exploreHeader;
  }, [stickyOffset.offsets]);

  useLayoutEffect(() => {
    if (!activeLandRef.current) {
      return;
    }

    window.scrollTo(0, activeLandRef.current.offsetTop - totalOffsetsRef.current);
  }, [cardsSize]);

  const handleCardMouseOver = (e: MouseEvent<HTMLAnchorElement>, asset: AssetEntity) => {
    window.clearTimeout(timeoutIdRef.current);

    if (selectedAssetId) {
      timeoutIdRef.current = window.setTimeout(() => {
        if (getIsMounted() && selectedAssetId) {
          onSelectAsset(asset.id);
        }
      }, 500);
    } else {
      onSelectAsset(asset.id);
    }
  };

  const handleCardMouseOut = () => {
    window.clearTimeout(timeoutIdRef.current);
  };

  const getCardClickHandler = (land: AssetEntity) => {
    return () => {
      history.push({
        pathname: getPropertyPath(land.id),
        state: { from: window.location.pathname, title: 'Explore', tab: location.state?.tab },
      });
    };
  };

  let filteredLands = filterLandsByQuery(lands, searchQuery);

  if (lastRentEnd !== '0') {
    filteredLands = filterLandsByAvailability(filteredLands);
  }

  const [filteredAndListedLands, loadMoreButtonProps] = useLoadMoreButton(filteredLands, {
    initialListed: initialNumberOfCards,
    itemsPerLoad: NUMBER_OF_CARDS_PER_LOAD,
  });

  useEffect(() => {
    sessionStorageHandler('set', 'explore-page', 'listed', loadMoreButtonProps.listed);
  }, [loadMoreButtonProps.listed]);
  const saveScrollPosition = useDebounce(() => {
    if (filteredLands) sessionStorage.setItem('scroll-position', String(window.scrollY));
  }, 500);

  useEffect(() => {
    const scroll = () => {
      saveScrollPosition();
    };

    const scrollPosition = sessionStorage.getItem('scroll-position');

    if (!loading && scrollPosition && filteredLands.length) {
      window.scrollTo({ top: +scrollPosition, behavior: 'smooth' });
    }

    document.addEventListener('scroll', scroll);

    return () => {
      document.removeEventListener('scroll', scroll);
    };
  }, [loading]);

  return (
    <div>
      <Box
        position="sticky"
        top={stickyOffset.offsets.filter + stickyOffset.offsets.header}
        ref={stickyOffset.register('exploreHeader')}
        zIndex={2}
        px={4}
        mx={-4}
        py={4}
        bgcolor="var(--theme-body-color)"
      >
        <CardsGrid sx={{ alignItems: 'center' }}>
          <Typography sx={{ order: 1, '@media (min-width: 668px)': { order: 0 } }} variant="body2" color="#B9B9D3">
            Listed{' '}
            <Typography component="span" variant="inherit" color={THEME_COLORS.light}>
              {filteredLands.length} properties
            </Typography>
          </Typography>
          <Stack gridColumn={-2} justifyContent="flex-end" direction="row" gap="12px">
            {isMetamaskConnected && (
              <>
                <SplitBeeListButton
                  sx={{ flexGrow: 1, minWidth: '0 !important' }}
                  onClick={() => listingModal.open()}
                  btnSize="medium"
                  variant="gradient"
                >
                  List Now
                </SplitBeeListButton>
                <Divider sx={{ height: 52, borderColor: '#27273A' }} orientation="vertical" />
              </>
            )}
            <StyledButton
              sx={{ flexShrink: 0 }}
              isActive={cardsSize === 'normal'}
              onClick={() => setCardsSize('normal')}
            >
              <Icon iconElement={<GridIcon />} iconSize="m" />
            </StyledButton>

            <StyledButton
              sx={{ flexShrink: 0 }}
              isActive={cardsSize === 'compact'}
              onClick={() => setCardsSize('compact')}
            >
              <Icon iconElement={<GridBigIcon />} iconSize="m" />
            </StyledButton>
          </Stack>
        </CardsGrid>
      </Box>
      <CardsGrid minWidth={cardsSize === 'compact' ? '190px' : undefined}>
        {loading &&
          Array.from({ length: initialNumberOfCards }, (_, i) => {
            return <PropertyCardSkeleton key={i} layout={cardsSize} />;
          })}

        {!loading &&
          filteredLands.length > 0 &&
          filteredAndListedLands.map((land) => (
            <LandWorkCard
              key={land.id}
              ref={selectedAssetId === land.id ? activeLandRef : undefined}
              isActive={selectedAssetId === land.id}
              layout={cardsSize}
              onMouseOver={handleCardMouseOver}
              onMouseOut={handleCardMouseOut}
              onClick={getCardClickHandler(land)}
              land={land}
            />
          ))}
      </CardsGrid>
      {!loading && filteredLands.length === 0 && <p>No properties are currently listed</p>}

      <LoadMoreButton sx={{ my: 10 }} {...loadMoreButtonProps} />
    </div>
  );
};

export default LandsExploreList;
