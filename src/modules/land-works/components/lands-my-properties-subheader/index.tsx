import { FC, useState } from 'react';
import { tokenOptions } from 'constants/modules';

import { ControlledSelect, Grid } from 'design-system';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import { currencyData, landsData } from '../lands-explore-filters/filters-data';
import LandsSearchBar from '../lands-search';
import { BottomBoxStyled, RootStyled } from './styled';

interface Props {
  propertiesCount?: number;
}

const LandsMyPropertiesSubheader: FC<Props> = ({ propertiesCount = 0 }) => {
  const { searchQuery, setSearchQuery } = useLandsSearchQuery();
  const [selectedMetaverse] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState(1);
  const [, setCurrency] = useState(tokenOptions[0]);

  const onChangeCurrencyHandler = (value: number) => {
    const sortIndex = value - 1;
    setSelectedCurrency(value);
    setCurrency(tokenOptions[sortIndex]);
  };

  return (
    <RootStyled>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <LandsSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search for land or owner..."
          />
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
