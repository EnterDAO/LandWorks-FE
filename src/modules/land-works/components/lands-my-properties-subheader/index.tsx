import { FC, useEffect, useState } from 'react';

import { ControlledSelect, Grid } from 'design-system';
import { Option } from 'modules/interface';
import { fetchMetaverses } from 'modules/land-works/api';
import { useLandsSearchQuery } from 'modules/land-works/providers/lands-search-query';

import { addIconToMetaverse, landsData, sortData } from '../lands-explore-filters/filters-data';
import LandsSearchBar from '../lands-search';
import { BottomBoxStyled, RootStyled } from './styled';

import { sessionStorageHandler } from 'utils';

interface Props {
  propertiesCount?: number;
  onChangeSortDirection: (value: number) => void;
  onChangeMetaverse?: (value: number) => void;
}

const LandsMyPropertiesSubheader: FC<Props> = ({ propertiesCount = 0, onChangeSortDirection, onChangeMetaverse }) => {
  const orderFilter = sessionStorageHandler('get', 'my-properties-filters', 'order');

  const voxelsSortData = sortData.slice(0, sortData.length - 1);
  const [selectedOrder, setSelectedOrder] = useState(1);

  const { searchQuery, setSearchQuery } = useLandsSearchQuery();
  const [selectedMetaverse, setSelectedMetaverse] = useState(sessionStorageHandler('get', 'general', 'metaverse') || 1);
  const [metaverses, setMetaverses] = useState<Option[]>(landsData);

  const onChangeMetaverseHandler = (value: number) => {
    onChangeMetaverse && onChangeMetaverse(value);
    sessionStorageHandler('set', 'general', 'metaverse', value);
    setSelectedMetaverse(value);
  };

  const onChangeSortDirectionHandler = (value: number) => {
    setSelectedOrder(value);
    onChangeSortDirection(value);
    sessionStorageHandler('set', 'my-properties-filters', 'order', {
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
    <RootStyled>
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={2} sx={{ justifyContent: 'flex-start' }}>
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
                value={selectedOrder}
                onChange={onChangeSortDirectionHandler}
                width={'12rem'}
                options={selectedMetaverse == 1 ? sortData : voxelsSortData}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <LandsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search for land..." />
        </Grid>
      </Grid>
      <BottomBoxStyled>
        Listed <strong>{propertiesCount} properties</strong>
      </BottomBoxStyled>
    </RootStyled>
  );
};

export default LandsMyPropertiesSubheader;
