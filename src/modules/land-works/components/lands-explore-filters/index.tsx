import { FC, useEffect, useState } from 'react';

import { Box, ControlledSelect, StyledSwitch, Typography } from 'design-system';
import { Option } from 'modules/interface';
import { fetchMetaverses } from 'modules/land-works/api';
import { useWallet } from 'wallets/wallet';

import { PricePopover } from '../price-popover';
import { addIconToMetaverse, landsData, sortData, statusData } from './filters-data';

import { sessionStorageHandler } from 'utils';

import styles from './lands-explore-filters.module.scss';

interface Props {
  onChangeSortDirection: (value: number) => void;
  onChangeOwnerToggler: (value: boolean) => void;
  onChangeAvailable: (value: number) => void;
  onChangeCurrency: (value: number) => void;
  onChangeMetaverse: (value: string) => void;
  onChangePrice: (currencyIndex: number, minPrice: number | null, maxPrice: number | null) => void;
}

const LandWorksFilters: FC<Props> = ({
  onChangeSortDirection,
  onChangeOwnerToggler,
  onChangeAvailable,
  onChangeCurrency,
  onChangeMetaverse,
  onChangePrice,
}) => {
  const orderFilter = sessionStorageHandler('get', 'explore-filters', 'order');

  const wallet = useWallet();
  const [selectedMetaverse, setSelectedMetaverse] = useState(sessionStorageHandler('get', 'general', 'metaverse') || 1);
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
    <div className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.box}>
          <Box className={styles.box} style={{ marginRight: '20px' }}>
            <ControlledSelect
              width={'12rem'}
              value={Number(selectedMetaverse)}
              onChange={onChangePlaceHandler}
              options={metaverses}
            />
          </Box>
          {/* <Box className={styles.box} style={{ marginRight: '20px' }}>
            <ControlledSelect
              width={'12rem'}
              value={selectedCurrency}
              onChange={onChangeCurrencyHandler}
              options={currencyData}
            />
          </Box> */}
          <Box className={styles.box} style={{ marginRight: '20px' }}>
            <PricePopover text="Price" onSubmit={onChangeCurrencyHandler} />
          </Box>
          <Box className={styles.box}>
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
        <Box className={styles.box}>
          {!!wallet.account && (
            <Box className={styles.box} style={{ marginRight: '20px' }}>
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
        </Box>
      </Box>
    </div>
  );
};

export default LandWorksFilters;
