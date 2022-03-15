import { FC, useState } from 'react';
import { metaverseOptions, tokenOptions } from 'constants/modules';

import { Box, ControlledSelect, StyledSwitch, Typography } from 'design-system';
import { useWallet } from 'wallets/wallet';

import { currencyData, landsData, sortData } from './filters-data';

import { sessionStorageHandler } from 'utils';

import styles from './lands-explore-filters.module.scss';

interface Props {
  onChangeSortDirection: (value: number) => void;
  onChangeOwnerToggler: (value: boolean) => void;
  onChangeAvailable: (value: boolean) => void;
  onChangeCurrency: (value: number) => void;
}

const LandWorksFilters: FC<Props> = ({
  onChangeSortDirection,
  onChangeOwnerToggler,
  onChangeAvailable,
  onChangeCurrency,
}) => {
  const wallet = useWallet();
  const [selectedOrder, setSelectedOrder] = useState(sessionStorageHandler('getItem', 'order') || 1);
  const [selectedMetaverse, setSelectedMetaverse] = useState(sessionStorageHandler('getItem', 'metaverse') || 1);
  const [selectedCurrency, setSelectedCurrency] = useState(sessionStorageHandler('getItem', 'currency') || 1);
  const [showOnlyOwner, setShowOnlyOwner] = useState(sessionStorageHandler('getItem', 'owner') || false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(sessionStorageHandler('getItem', 'available') || false);
  const [, setCurrency] = useState(tokenOptions[0]);
  const [metaverse, setMetaverse] = useState(metaverseOptions[0]);

  const onChangePlaceHandler = (value: number) => {
    sessionStorageHandler('setItem', 'metaverse', value);
    setMetaverse(metaverse);
    setSelectedMetaverse(value);
    // TODO:: some filtering here
  };

  const onChangeSortDirectionHandler = (value: number) => {
    setSelectedOrder(value);
    onChangeSortDirection(value);
    sessionStorageHandler('setItem', 'order', value);
  };

  const onChangeOwnerTogglerHandler = () => {
    const showOnlyOwnerLast = !showOnlyOwner;

    setShowOnlyOwner(showOnlyOwnerLast);
    onChangeOwnerToggler(showOnlyOwnerLast);

    setShowOnlyAvailable(false);
    sessionStorageHandler('setItem', 'owner', showOnlyOwnerLast);
  };

  const onChangeAvailableHandler = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
    onChangeAvailable(!showOnlyAvailable);
    sessionStorageHandler('setItem', 'available', !showOnlyAvailable);
  };

  const onChangeCurrencyHandler = (value: number) => {
    const sortIndex = Number(value) - 1;
    setSelectedCurrency(value);
    setCurrency(tokenOptions[sortIndex]);
    onChangeCurrency(value);
    sessionStorageHandler('setItem', 'currency', value);
  };

  return (
    <div className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.box}>
          <Box className={styles.box} style={{ marginRight: '20px' }}>
            <ControlledSelect
              width={'12rem'}
              value={selectedMetaverse}
              onChange={onChangePlaceHandler}
              options={landsData}
            />
          </Box>
          <Box className={styles.box}>
            <ControlledSelect
              width={'6rem'}
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
