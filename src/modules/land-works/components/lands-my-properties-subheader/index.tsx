import { FC, useState } from 'react';

import { ControlledSelect, Grid } from 'design-system';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import { currencyData, landsData } from '../lands-explore-filters/filters-data';
import LandsSearchBar from '../lands-search';
import { BottomBoxStyled, RootStyled } from './styled';

import { sessionStorageHandler } from 'utils';

interface Props {
  propertiesCount?: number;
  onChangeCurrencyCallback?: (value: number) => void;
}

const LandsMyPropertiesSubheader: FC<Props> = ({ propertiesCount = 0, onChangeCurrencyCallback }) => {
  const { searchQuery, setSearchQuery } = useLandsSearchQuery();
  const [selectedMetaverse] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState(
    sessionStorageHandler('get', 'my-properties-filters', 'currency') || 0
  );

  const onChangeCurrencyHandler = (value: number) => {
    setSelectedCurrency(value);
    sessionStorageHandler('set', 'my-properties-filters', 'currency', value);
    onChangeCurrencyCallback && onChangeCurrencyCallback(value);
  };

  return (
    <RootStyled>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <LandsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search for land..." />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Grid item xs={6} lg={5}>
              <ControlledSelect disabled value={selectedMetaverse} onChange={() => null} options={landsData} />
            </Grid>
            <Grid item xs={6} md={6} lg={3}>
              <ControlledSelect value={selectedCurrency} onChange={onChangeCurrencyHandler} options={currencyData} />
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
