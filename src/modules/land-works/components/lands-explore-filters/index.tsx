import React from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import { SelectChangeEvent } from '@mui/material/Select';

import Grid from 'components/custom/grid';
import { Box, Button, DropdownMenu, Typography } from 'design-system';
import { Option } from 'modules/interface';

import { ReactComponent as HottestIcon } from '../../../../resources/svg/order-hot.svg';
import { LandsPlaceSorter } from '../lands-place-sorter';
import { LandsPriceSorter } from '../lands-price-sorter';

import s from './s.module.scss';

interface Props {
  // onSortDirectionChange:  (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  // data: OptionsOrGroups<any, GroupBase<any>> | undefined;
  onPlaceChange: (event: SelectChangeEvent) => void;
}

const placeData = [
  {
    label: 'Hottest first',
    value: 1,
  },
];

const currencyData = [
  {
    label: 'Eth',
    value: 1,
  },
];

export const LandsFilter: React.FC<Props> = ({
  // onSortDirectionChange,
  onPlaceChange,
}) => {
  return (
    <div className={s.filterWrapper}>
      <DropdownMenu
        id="login-dropdown"
        toggleElement={
          <button className={s.filterButton}>
            Decentraland
          </button>
        }
      >
        <Box className={s.dropDownItems}>
          {placeData.map((o) => (
            <button
              // variant="secondary"
              // btnSize="large"
              className={s.dropdownButton}
              // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
            >
              {o.label}
            </button>
          ))}
        </Box>
      </DropdownMenu>
      <DropdownMenu
        id="login-dropdown"
        toggleElement={
          <button className={s.filterButton}>
            ETH
          </button>
        }
      >
        <Box className={s.dropDownItems}>
          {currencyData.map((o) => (
            <button
              // variant="secondary"
              // btnSize="large"
              className={s.dropdownButton}
              // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
            >
              {o.label}
            </button>
          ))}
        </Box>
      </DropdownMenu>
    </div>
  );
};
