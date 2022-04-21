import { FC, useEffect, useState } from 'react';

import { ControlledSelect, Grid } from 'design-system';
import { fetchMetaverses } from 'modules/land-works/api';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import { currencyData, landsData } from '../lands-explore-filters/filters-data';
import LandsSearchBar from '../lands-search';
import { BottomBoxStyled, RootStyled } from './styled';

import { sessionStorageHandler } from 'utils';

interface Props {
  propertiesCount?: number;
  onChangeCurrencyCallback?: (value: number) => void;
  onChangeMetaverse?: (value: number) => void;
}

const LandsMyPropertiesSubheader: FC<Props> = ({
  propertiesCount = 0,
  onChangeCurrencyCallback,
  onChangeMetaverse,
}) => {
  const { searchQuery, setSearchQuery } = useLandsSearchQuery();
  const [selectedMetaverse, setSelectedMetaverse] = useState(
    sessionStorageHandler('get', 'my-properties-filters', 'metaverse') || 1
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    sessionStorageHandler('get', 'my-properties-filters', 'currency') || 0
  );
  const [metaverses, setMetaverses] = useState(landsData);

  const onChangeCurrencyHandler = (value: number) => {
    setSelectedCurrency(value);
    sessionStorageHandler('set', 'my-properties-filters', 'currency', value);
    onChangeCurrencyCallback && onChangeCurrencyCallback(value);
  };

  const onChangeMetaverseHandler = (value: number) => {
    onChangeMetaverse && onChangeMetaverse(value);
    sessionStorageHandler('set', 'my-properties-filters', 'metaverse', value);
    sessionStorageHandler('set', 'explore-filters', 'metaverse', value);
    setSelectedMetaverse(value);
  };

  useEffect(() => {
    fetchMetaverses().then(setMetaverses);
  }, []);

  return (
    <RootStyled>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <LandsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search for land..." />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Grid item xs={6} lg={4}>
              <ControlledSelect
                value={selectedMetaverse}
                onChange={onChangeMetaverseHandler}
                width={'12rem'}
                options={metaverses}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={4}>
              <ControlledSelect
                value={selectedCurrency}
                onChange={onChangeCurrencyHandler}
                width={'12rem'}
                options={currencyData}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomBoxStyled>
        Listed <strong>{propertiesCount} properties</strong>
      </BottomBoxStyled>
    </RootStyled>
  );
};

export default LandsMyPropertiesSubheader;
