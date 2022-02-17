import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import { Box, DropdownMenu, Typography } from 'design-system';

import s from './s.module.scss';

interface Props {
  // onSortDirectionChange:  (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  // data: OptionsOrGroups<any, GroupBase<any>> | undefined;
  onPlaceChange: (event: SelectChangeEvent) => void;
}

const placeData = [
  {
    label: 'Decentaland',
    value: 1,
  },
];

const currencyData = [
  {
    label: 'Eth',
    value: 1,
  },
];

const sortData = [
  {
    label: 'Hottest First',
    value: 1,
  },
];

export const LandsFilter: React.FC<Props> = ({
  // onSortDirectionChange,
  onPlaceChange,
}) => {
  return (
    <div className={s.filterWrapper}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <DropdownMenu id="login-dropdown" toggleElement={<button className={s.filterButton}>Decentraland</button>}>
          <Box className={s.dropDownItems}>
            {placeData.map((o) => (
              <button
                className={s.dropdownButton}
                // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
              >
                {o.label}
              </button>
            ))}
          </Box>
        </DropdownMenu>
        <DropdownMenu id="login-dropdown" toggleElement={<button className={s.filterButtonShort}>ETH</button>}>
          <Box className={s.dropDownItems}>
            {currencyData.map((o) => (
              <button
                className={s.dropdownButton}
                // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
              >
                {o.label}
              </button>
            ))}
          </Box>
        </DropdownMenu>
      </Box>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Mine Only</Typography>
          <Switch defaultChecked />
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Avalaible Only</Typography>
          <Switch />
        </Box>
        <DropdownMenu id="login-dropdown" toggleElement={<button className={s.filterButton}>Hottest First</button>}>
          <Box className={s.dropDownItems}>
            {sortData.map((o) => (
              <button
                className={s.dropdownButton}
                // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
              >
                {o.label}
              </button>
            ))}
          </Box>
        </DropdownMenu>
      </Box>
    </div>
  );
};
