import { FC, useEffect, useState } from 'react';
import { Collapse } from '@mui/material';

import SearchBar from 'components/custom/search-bar';
import { Box, ControlledSelect, Divider, Typography } from 'design-system';
import { FiltersIcon, SearchIcon } from 'design-system/icons';
import { Option } from 'modules/interface';
import { fetchMetaverses } from 'modules/land-works/api';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import { DecentralandFiltersModal, VoxelFiltersModal } from '../lands-explore-filters-modal';
import LandsSearchBar from '../lands-search';
import { PricePopover } from '../price-popover';
import { addIconToMetaverse, landsData, sortData } from './filters-data';
import RentStatusSelect from './rent-status-select';
import { StyledButton } from './styled';

import { sessionStorageHandler } from 'utils';

import { MoreFiltersType } from '../lands-explore-filters-modal/types';

interface Props {
  onChangeSortDirection: (value: number) => void;
  onChangeMetaverse: (value: string) => void;
  handleMoreFilter: (value: Partial<MoreFiltersType>) => void;
  maxLandSize: number;
  maxHeight: number;
  maxArea: number;
}

const LandWorksFilters: FC<Props> = ({
  onChangeSortDirection,
  onChangeMetaverse,
  maxLandSize,
  handleMoreFilter,
  maxHeight,
  maxArea,
}) => {
  const stickyOffset = useStickyOffset();
  const orderFilter = sessionStorageHandler('get', 'explore-filters', 'order');
  const { searchQuery, setSearchQuery } = useLandsSearchQuery();

  const [selectedMetaverse, setSelectedMetaverse] = useState(sessionStorageHandler('get', 'general', 'metaverse') || 1);
  const [openDecentralandFiltersModal, setOpenDecentralandFilterModal] = useState(false);
  const [openVoxelFiltersModal, setOpenVoxelFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [metaverses, setMetaverses] = useState<Option[]>(landsData);
  const voxelsSortData = sortData.slice(0, sortData.length - 1);

  const onChangePlaceHandler = (value: number) => {
    sessionStorageHandler('set', 'general', 'metaverse', value);
    onChangeMetaverse(`${value}`);
    setSelectedMetaverse(value);
    // TODO:: some filtering here
  };

  const onChangeSortDirectionHandler = (value: number) => {
    setSelectedOrder(value);
    onChangeSortDirection(value);
    sessionStorageHandler('set', 'explore-filters', 'order', {
      ...orderFilter,
      [`${selectedMetaverse}`]: value,
    });
  };

  useEffect(() => {
    setSelectedOrder(orderFilter && orderFilter[`${selectedMetaverse}`] ? orderFilter[`${selectedMetaverse}`] : 1);
  }, [selectedMetaverse]);

  useEffect(() => {
    fetchMetaverses().then((res) => setMetaverses(addIconToMetaverse(res)));
  }, []);

  return (
    <Box
      position="sticky"
      zIndex={2}
      top={stickyOffset.offsets.header}
      bgcolor="var(--theme-body-color)"
      px="var(--horizontal-padding)"
      ref={stickyOffset.register('filter')}
    >
      <Box py={4} width={1} boxShadow="inset 0 -2px var(--theme-modal-color)">
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
              },
              '@media (min-width: 1260px)': {
                width: 'auto',
                order: 0,
              },
            }}
          >
            <ControlledSelect value={Number(selectedMetaverse)} onChange={onChangePlaceHandler} options={metaverses} />

            <PricePopover text="Price" />

            <RentStatusSelect />

            <ControlledSelect
              width="12.5rem"
              value={selectedOrder}
              onChange={onChangeSortDirectionHandler}
              options={selectedMetaverse == 1 ? sortData : voxelsSortData}
            />
          </Box>

          <Box display="flex" flexWrap="wrap" gap="12px">
            <StyledButton
              sx={{
                width: 52,
              }}
              onClick={() =>
                selectedMetaverse == 1 ? setOpenDecentralandFilterModal(true) : setOpenVoxelFilterModal(true)
              }
            >
              <FiltersIcon height={24} width={24} />
            </StyledButton>

            <Divider sx={{ borderColor: '#27273A' }} orientation="vertical" />

            <SearchBar placeholder="Search for land or owner..." onChange={setSearchQuery} value={searchQuery} />

            <DecentralandFiltersModal
              maxLandSize={maxLandSize}
              onCancel={() => {
                setOpenDecentralandFilterModal(false);
              }}
              handleSubmit={(e) => {
                setOpenDecentralandFilterModal(false);
                handleMoreFilter(e);
              }}
              open={openDecentralandFiltersModal}
              children={<></>}
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
              children={<></>}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandWorksFilters;
