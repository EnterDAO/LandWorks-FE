import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import { Box, Typography } from 'design-system';
import DropdownSelect from 'design-system/Select/DropdownSelect';
import { StyledSwitch } from 'design-system/Switch/Switch';

import s from './s.module.scss';

interface Props {
  // onSortDirectionChange:  (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  // data: OptionsOrGroups<any, GroupBase<any>> | undefined;
  onPlaceChange: (event: SelectChangeEvent) => void;

}

const placeData = [
  {
    label: 'Decentraland',
    value: 1,
  },
];

const currencyData = [
  {
    label: 'ETH',
    value: 1,
  },
  {
    label: 'BTC',
    value: 2,
  },
];

const sortData = [
  {
    label: 'Hottest First',
    value: 1,
  },
  {
    label: 'From The Highest',
    value: 2,
  },
  {
    label: 'From the Lowest',
    value: 3,
  },
];

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'blue',
  },
  menuItemRoot: {
    '&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover': {
      backgroundColor: 'red',
    },
  },
  menuItemSelected: {},
});

export const LandsFilter: React.FC<Props> = (
  {
    // onSortDirectionChange,
    //onPlaceChange,
  }
) => {
  const [place, setPlace] = useState('Decentraland');
  const [currency, setCurrency] = useState('ETH');
  const [sort, setSort] = useState('Hottest First');

  const onPlaceChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value);
  };

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <div className={s.filterWrapper}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        {/* <DropdownSelect disabled data={placeData} value={place} setValue={onPlaceChange} /> */}
        {/* <DropdownSelect data={currencyData} value={currency} setValue={setCurrencyValue} /> */}
      </Box>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Box style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <Typography>Mine Only</Typography>
          <Box style={{ marginLeft: '10px' }}>
            <StyledSwitch defaultChecked />
          </Box>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
          <Typography>Avalaible Only</Typography>
          <Box style={{ marginLeft: '10px' }}>
            <StyledSwitch />
          </Box>
        </Box>
        {/* <DropdownSelect data={sortData} value={sort} setValue={onSortDirectionChange} /> */}
      </Box>
    </div>
  );
};

// <Box style={{ display: 'flex', alignItems: 'center' }}>
//         <DropdownMenu
//           showDropdown={showDropdown}
//           setShowDropdown={setShowDropdown}
//           id="place-dropdown"
//           toggleElement={
//             <button className={s.filterButton}>
//               Decentraland <DropdownIcon className={showDropdown ? s.dropdownRotate : s.dropdown} />
//             </button>
//           }
//         >
//           <Box className={s.dropDownItems}>
//             {placeData.map((o) => (
//               <button
//                 className={s.dropdownButton}
//                 // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
//               >
//                 {o.label}
//               </button>
//             ))}
//           </Box>
//         </DropdownMenu>
//         <DropdownMenu
//           showDropdown={showDropdown}
//           setShowDropdown={setShowDropdown}
//           id="curreny-dropdown"
//           toggleElement={
//             <button className={s.filterButtonShort}>
//               ETH <DropdownIcon className={showDropdown ? s.dropdownRotate : s.dropdown} />
//             </button>
//           }
//         >
//           <Box className={s.dropDownItems}>
//             {currencyData.map((o) => (
//               <button
//                 className={s.dropdownButton}
//                 // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
//               >
//                 {o.label}
//               </button>
//             ))}
//           </Box>
//         </DropdownMenu>
//       </Box>
//       <Box style={{ display: 'flex', alignItems: 'center' }}>
//         <Box style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
//           <Typography>Mine Only</Typography>
//           <Box style={{ marginLeft: '10px' }}>
//             <StyledSwitch defaultChecked />
//           </Box>
//         </Box>
//         <Box style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
//           <Typography>Avalaible Only</Typography>
//           <Box style={{ marginLeft: '10px' }}>
//             <StyledSwitch />
//           </Box>
//         </Box>
//         <DropdownMenu
//           showDropdown={showDropdown}
//           setShowDropdown={setShowDropdown}
//           id="filter-dropdown"
//           toggleElement={
//             <button className={s.filterButton}>
//               Hottest First <DropdownIcon className={showDropdown ? s.dropdownRotate : s.dropdown} />
//             </button>
//           }
//         >
//           <Box className={s.dropDownItems}>
//             {sortData.map((o) => (
//               <button
//                 className={s.dropdownButton}
//                 // onClick={() => history.push(APP_ROUTES.createWalletMainPageUrl)}
//               >
//                 {o.label}
//               </button>
//             ))}
//           </Box>
//         </DropdownMenu>
//       </Box>
