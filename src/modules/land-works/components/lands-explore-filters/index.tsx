import { FC, useEffect, useState } from 'react';

import { Box, ControlledSelect, StyledSwitch, Typography } from 'design-system';
import { fetchMetaverses } from 'modules/land-works/api';
import { useWallet } from 'wallets/wallet';

import { currencyData, landsData, sortData } from './filters-data';

import { sessionStorageHandler } from 'utils';

import styles from './lands-explore-filters.module.scss';

interface Props {
  onChangeSortDirection: (value: number) => void;
  onChangeOwnerToggler: (value: boolean) => void;
  onChangeAvailable: (value: boolean) => void;
  onChangeCurrency: (value: number) => void;
  onChangeMetaverse: (value: string) => void;
}

const LandWorksFilters: FC<Props> = ({
  onChangeSortDirection,
  onChangeOwnerToggler,
  onChangeAvailable,
  onChangeCurrency,
  onChangeMetaverse,
}) => {
  const wallet = useWallet();
  const [selectedOrder, setSelectedOrder] = useState(sessionStorageHandler('get', 'explore-filters', 'order') || 1);
  const [selectedMetaverse, setSelectedMetaverse] = useState(
    sessionStorageHandler('get', 'explore-filters', 'metaverse') || 1
  );
  const [metaverses, setMetaverses] = useState(landsData);

  const [selectedCurrency, setSelectedCurrency] = useState(
    sessionStorageHandler('get', 'explore-filters', 'currency') || 0
  );
  const [showOnlyOwner, setShowOnlyOwner] = useState(sessionStorageHandler('get', 'explore-filters', 'owner') || false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(
    sessionStorageHandler('get', 'explore-filters', 'available') || false
  );

  const onChangePlaceHandler = (value: number) => {
    sessionStorageHandler('set', 'explore-filters', 'metaverse', value);
    onChangeMetaverse(`${value}`);
    setSelectedMetaverse(value);
    // TODO:: some filtering here
  };

  const onChangeSortDirectionHandler = (value: number) => {
    setSelectedOrder(value);
    onChangeSortDirection(value);
    sessionStorageHandler('set', 'explore-filters', 'order', value);
  };

  const onChangeOwnerTogglerHandler = () => {
    const showOnlyOwnerLast = !showOnlyOwner;

    sessionStorageHandler('set', 'explore-filters', 'owner', showOnlyOwnerLast);
    setShowOnlyOwner(showOnlyOwnerLast);
    onChangeOwnerToggler(showOnlyOwnerLast);
  };

  const onChangeAvailableHandler = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
    onChangeAvailable(!showOnlyAvailable);
    sessionStorageHandler('set', 'explore-filters', 'available', !showOnlyAvailable);
  };

  const onChangeCurrencyHandler = (value: number) => {
    setSelectedCurrency(value);
    onChangeCurrency(value);
    sessionStorageHandler('set', 'explore-filters', 'currency', value);
  };

  useEffect(() => {
    setTimeout(() => onChangeCurrency(selectedCurrency), 0);
  }, []);

  useEffect(() => {
    fetchMetaverses().then(setMetaverses);
  }, []);
  return (
    <div className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.box}>
          <Box className={styles.box} style={{ marginRight: '20px' }}>
            <ControlledSelect
              width={'12rem'}
              value={selectedMetaverse}
              onChange={onChangePlaceHandler}
              options={metaverses}
            />
          </Box>
          <Box className={styles.box}>
            <ControlledSelect
              width={'12rem'}
              value={selectedCurrency}
              onChange={onChangeCurrencyHandler}
              options={currencyData}
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
          <Box className={styles.box} style={{ margin: '0 20px' }}>
            <Typography>Available Only</Typography>
            <Box sx={{ marginLeft: '10px' }}>
              <StyledSwitch checked={showOnlyAvailable} onChange={onChangeAvailableHandler} />
            </Box>
          </Box>
          <ControlledSelect
            width={'12rem'}
            value={selectedOrder}
            onChange={onChangeSortDirectionHandler}
            options={sortData}
          />
        </Box>
      </Box>
    </div>
  );
};

export default LandWorksFilters;
