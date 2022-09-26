import { FC, useEffect, useState } from 'react';

import { Box, ControlledSelect } from 'design-system';
import { FiltersIcon } from 'design-system/icons';
import { Option } from 'modules/interface';
import { fetchMetaverses } from 'modules/land-works/api';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import { DecentralandFiltersModal, VoxelFiltersModal } from '../lands-explore-filters-modal';
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
      <Box py={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={3}>
        <Box display="flex" flexWrap="wrap" gap={3}>
          <ControlledSelect
            width={'18.75rem'}
            value={Number(selectedMetaverse)}
            onChange={onChangePlaceHandler}
            options={metaverses}
          />

          <PricePopover text="Price" />

          <RentStatusSelect />
        </Box>
        <Box display="flex" flexWrap="wrap" gap={3}>
          <ControlledSelect
            width="12.5rem"
            value={selectedOrder}
            onChange={onChangeSortDirectionHandler}
            options={selectedMetaverse == 1 ? sortData : voxelsSortData}
          />

          <StyledButton
            onClick={() =>
              selectedMetaverse == 1 ? setOpenDecentralandFilterModal(true) : setOpenVoxelFilterModal(true)
            }
          >
            <FiltersIcon height={20} width={20} />
            <p>More Filters</p>
          </StyledButton>
        </Box>
      </Box>

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
  );
};

export default LandWorksFilters;
