import { FC, useState } from 'react';
import { Zoom } from '@mui/material';

import { ReactComponent as RoundPlusIcon } from 'assets/icons/round-plus.svg';
import SearchBar from 'components/custom/search-bar';
import { Box, ControlledSelect, Divider, Typography } from 'design-system';
import { FiltersIcon } from 'design-system/icons';
import { METAVERSES } from 'modules/land-works/data/metaverses';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import { DecentralandFiltersModal, VoxelFiltersModal } from '../lands-explore-filters-modal';
import MetaverseSelect from '../MetaverseSelect';
import { useMetaverseQueryParam } from '../MetaverseSelect/MetaverseSelect';
import { PricePopover } from '../price-popover';
import { sortData } from './filters-data';
import RentStatusSelect from './rent-status-select';
import { StyledButton } from './styled';

import { MoreFiltersType } from '../lands-explore-filters-modal/types';

interface Props {
  onChangeSortDirection: (value: number) => void;
  handleMoreFilter: (value: Partial<MoreFiltersType>) => void;
  maxLandSize: number;
  maxHeight: number;
  maxArea: number;
}

// TODO: refactor
const LandWorksFilters: FC<Props> = ({ onChangeSortDirection, maxLandSize, handleMoreFilter, maxHeight, maxArea }) => {
  const stickyOffset = useStickyOffset();
  const [metaverse] = useMetaverseQueryParam();
  const [isMetaverseFiltersActive, setIsMetaverseFiltersActive] = useState(false);

  const [openDecentralandFiltersModal, setOpenDecentralandFilterModal] = useState(false);
  const [openVoxelFiltersModal, setOpenVoxelFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(1);

  const onChangeSortDirectionHandler = (value: number) => {
    setSelectedOrder(value);
    onChangeSortDirection(value);
  };

  const handleFiltersButtonClick = () => {
    const setOpenFilterModal = {
      [METAVERSES.Decentraland]: setOpenDecentralandFilterModal,
      [METAVERSES.Voxels]: setOpenVoxelFilterModal,
    }[metaverse];

    if (setOpenFilterModal) {
      setOpenFilterModal(true);
    }
  };

  return (
    <Box
      position="sticky"
      zIndex={2}
      top={stickyOffset.offsets.header}
      bgcolor="var(--theme-body-color)"
      px="var(--horizontal-padding)"
      ref={stickyOffset.register('filter')}
    >
      <Box py="18px" width={1} boxShadow="inset 0 -2px var(--theme-modal-color)">
        <Box position="relative" gap="12px" display="flex" flexWrap="wrap">
          <Typography variant="h2" component="h1" mr="auto">
            Explore
          </Typography>
          <Box
            display="flex"
            gap="12px"
            flexWrap="wrap"
            sx={{
              width: 1,
              order: 1,
              '& > *': {
                flex: '1 1 200px',
                minWidth: 200,
              },
              '@media (min-width: 1260px)': {
                width: 'auto',
                order: 0,
              },
            }}
          >
            <MetaverseSelect />

            <PricePopover text="Price" />

            <RentStatusSelect />

            <ControlledSelect
              width="12.5rem"
              value={selectedOrder}
              onChange={onChangeSortDirectionHandler}
              options={sortData}
            />
          </Box>

          <Box display="flex" flexWrap="wrap" gap="12px">
            <StyledButton
              isActive={isMetaverseFiltersActive}
              sx={{
                width: 52,
              }}
              onClick={handleFiltersButtonClick}
            >
              <FiltersIcon height={24} width={24} />
              <Zoom in={isMetaverseFiltersActive}>
                <Box position="absolute" top={-5} right={-5}>
                  <RoundPlusIcon width={16} height={16} />
                </Box>
              </Zoom>
            </StyledButton>

            <Divider sx={{ borderColor: '#27273A' }} orientation="vertical" />

            <SearchBar />

            <DecentralandFiltersModal
              maxLandSize={maxLandSize}
              onCancel={() => {
                setOpenDecentralandFilterModal(false);
              }}
              handleSubmit={(e) => {
                setOpenDecentralandFilterModal(false);
                const values = Object.values(e);

                setIsMetaverseFiltersActive(values.length > 1 || !values.includes('All'));
                handleMoreFilter(e);
              }}
              open={openDecentralandFiltersModal}
            />
            <VoxelFiltersModal
              maxHeight={maxHeight}
              maxArea={maxArea}
              onCancel={() => {
                setOpenVoxelFilterModal(false);
              }}
              handleSubmit={(e) => {
                setOpenVoxelFilterModal(false);
                handleMoreFilter(e);
              }}
              open={openVoxelFiltersModal}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandWorksFilters;
