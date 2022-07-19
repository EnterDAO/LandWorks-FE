import { FC, useEffect, useState } from 'react';

import { Box, ControlledSelect } from 'design-system';
import { FiltersIcon } from 'design-system/icons';
import { Option } from 'modules/interface';
import { fetchMetaverses } from 'modules/land-works/api';

import { DecentralandFiltersModal, VoxelFiltersModal } from '../lands-explore-filters-modal';
import { PricePopover } from '../price-popover';
import { addIconToMetaverse, landsData, sortData, statusData } from './filters-data';
import { StyledButton, StyledRoot } from './styled';

import { sessionStorageHandler } from 'utils';

import { MoreFiltersType } from '../lands-explore-filters-modal/types';

interface Props {
  onChangeSortDirection: (value: number) => void;
  onChangeAvailable: (value: number) => void;
  onChangeCurrency: (value: number) => void;
  onChangeMetaverse: (value: string) => void;
  onChangePrice: (currencyIndex: number, minPrice: number | null, maxPrice: number | null) => void;
  handleMoreFilter: (value: Partial<MoreFiltersType>) => void;
  maxLandSize: number;
  maxHeight: number;
  maxArea: number;
}

const LandWorksFilters: FC<Props> = ({
  onChangeSortDirection,
  onChangeAvailable,
  onChangeCurrency,
  onChangeMetaverse,
  onChangePrice,
  maxLandSize,
  handleMoreFilter,
  maxHeight,
  maxArea,
}) => {
  const orderFilter = sessionStorageHandler('get', 'explore-filters', 'order');

  const [selectedMetaverse, setSelectedMetaverse] = useState(sessionStorageHandler('get', 'general', 'metaverse') || 1);
  const [openDecentralandFiltersModal, setOpenDecentralandFilterModal] = useState(false);
  const [openVoxelFiltersModal, setOpenVoxelFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [metaverses, setMetaverses] = useState<Option[]>(landsData);
  const voxelsSortData = sortData.slice(0, sortData.length - 1);

  const [selectedCurrency, setSelectedCurrency] = useState(
    sessionStorageHandler('get', 'explore-filters', 'currency') || 0
  );
  const [status, setStatus] = useState(sessionStorageHandler('get', 'explore-filters', 'available') || 1);

  const onChangePlaceHandler = (value: number) => {
    sessionStorageHandler('set', 'general', 'metaverse', String(value));
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

  const onChangeAvailableHandler = (value: number) => {
    setStatus(value);
    // setShowOnlyAvailable(!showOnlyAvailable);
    onChangeAvailable(value);
    sessionStorageHandler('set', 'explore-filters', 'available', value);
  };

  const onChangeCurrencyHandler = (currency: number, minPrice: number | null, maxPrice: number | null) => {
    setSelectedCurrency(currency);
    onChangeCurrency(currency);
    onChangePrice(currency, minPrice, maxPrice);
    sessionStorageHandler('set', 'explore-filters', 'currency', currency);
  };

  useEffect(() => {
    setTimeout(() => onChangeCurrency(selectedCurrency), 0);
  }, []);

  useEffect(() => {
    setSelectedOrder(orderFilter && orderFilter[`${selectedMetaverse}`] ? orderFilter[`${selectedMetaverse}`] : 1);
  }, [selectedMetaverse]);

  useEffect(() => {
    fetchMetaverses().then((res) => setMetaverses(addIconToMetaverse(res)));
  }, []);

  return (
    <StyledRoot>
      <Box className={'container'}>
        <Box className={'box'}>
          <Box className={'box'} style={{ marginRight: '20px' }}>
            <ControlledSelect
              width={'12rem'}
              value={Number(selectedMetaverse)}
              onChange={onChangePlaceHandler}
              options={metaverses}
            />
          </Box>
          <Box className={'box'} style={{ marginRight: '20px' }}>
            <PricePopover text="Price" onSubmit={onChangeCurrencyHandler} />
          </Box>
          <Box className={'box'}>
            <ControlledSelect
              width={'12rem'}
              value={status}
              onChange={onChangeAvailableHandler}
              withCheckbox
              staticPlaceholder="Status"
              options={statusData}
            />
          </Box>
        </Box>
        <Box className={'box'}>
          <ControlledSelect
            width={'12rem'}
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
    </StyledRoot>
  );
};

export default LandWorksFilters;
