import { FC, useEffect, useState } from 'react';

import { Box, ControlledSelect, StyledSwitch, Typography } from 'design-system';
import { FiltersIcon } from 'design-system/icons';
import { Option } from 'modules/interface';
import { fetchMetaverses } from 'modules/land-works/api';
import { useWallet } from 'wallets/wallet';

import { ExploreFiltersModal } from '../lands-explore-filters-modal';
import { PricePopover } from '../price-popover';
import { addIconToMetaverse, landsData, sortData, statusData } from './filters-data';
import { StyledButton, StyledRoot } from './styled';

import { sessionStorageHandler } from 'utils';

import { MoreFiltersType } from '../lands-explore-filters-modal/types';

interface Props {
  onChangeSortDirection: (value: number) => void;
  onChangeOwnerToggler: (value: boolean) => void;
  onChangeAvailable: (value: number) => void;
  onChangeCurrency: (value: number) => void;
  onChangeMetaverse: (value: string) => void;
  onChangePrice: (currencyIndex: number, minPrice: number | null, maxPrice: number | null) => void;
  handleMoreFilter: (value: Partial<MoreFiltersType>) => void;
  maxLandSize: number;
}

const LandWorksFilters: FC<Props> = ({
  onChangeSortDirection,
  onChangeOwnerToggler,
  onChangeAvailable,
  onChangeCurrency,
  onChangeMetaverse,
  onChangePrice,
  maxLandSize,
  handleMoreFilter,
}) => {
  const orderFilter = sessionStorageHandler('get', 'explore-filters', 'order');

  const wallet = useWallet();
  const [selectedMetaverse, setSelectedMetaverse] = useState(sessionStorageHandler('get', 'general', 'metaverse') || 1);
  const [openFiltersModal, setOpenFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [metaverses, setMetaverses] = useState<Option[]>(landsData);
  const voxelsSortData = sortData.slice(0, sortData.length - 1);

  const [selectedCurrency, setSelectedCurrency] = useState(
    sessionStorageHandler('get', 'explore-filters', 'currency') || 0
  );
  const [showOnlyOwner, setShowOnlyOwner] = useState(sessionStorageHandler('get', 'explore-filters', 'owner') || false);
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

  const onChangeOwnerTogglerHandler = () => {
    const showOnlyOwnerLast = !showOnlyOwner;

    sessionStorageHandler('set', 'explore-filters', 'owner', showOnlyOwnerLast);
    setShowOnlyOwner(showOnlyOwnerLast);
    onChangeOwnerToggler(showOnlyOwnerLast);
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
          {!!wallet.account && (
            <Box className={'box'} style={{ marginRight: '20px' }}>
              <Typography>Mine Only</Typography>
              <Box sx={{ marginLeft: '10px' }}>
                <StyledSwitch checked={showOnlyOwner} onChange={onChangeOwnerTogglerHandler} />
              </Box>
            </Box>
          )}

          <ControlledSelect
            width={'12rem'}
            value={selectedOrder}
            onChange={onChangeSortDirectionHandler}
            options={selectedMetaverse == 1 ? sortData : voxelsSortData}
          />
          {selectedMetaverse == 1 && (
            <StyledButton onClick={() => setOpenFilterModal(true)}>
              <FiltersIcon height={20} width={20} />
              <p>More Filters</p>
            </StyledButton>
          )}
        </Box>
      </Box>
      <ExploreFiltersModal
        maxLandSize={maxLandSize}
        onCancel={() => {
          setOpenFilterModal(false);
        }}
        handleSubmit={handleMoreFilter}
        open={openFiltersModal}
        children={<></>}
      />
    </StyledRoot>
  );
};

export default LandWorksFilters;
