import SearchBar from 'components/custom/search-bar';
import { Box, Divider, Typography } from 'design-system';
import MetaverseSelect from 'modules/land-works/components/MetaverseSelect';

import SortSelect from './SortSelect';

const MyPropertiesViewHeader = () => {
  return (
    <Box py="18px" width={1} boxShadow="inset 0 -2px var(--theme-modal-color)">
      <Box position="relative" gap="12px" display="flex" flexWrap="wrap">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mr: 'auto',
            '@media (min-width: 1290px)': {
              mr: 4,
            },
          }}
        >
          My Properties
        </Typography>
        <Box
          display="flex"
          gap="12px"
          flexWrap="wrap"
          ml="auto"
          sx={{
            width: 1,
            order: 1,
            '& > *': {
              flex: '1 1 200px',
            },
            '@media (min-width: 900px)': {
              width: 'auto',
              order: 0,
            },
            '@media (min-width: 990px)': {
              width: 'auto',
              '& > *': {
                width: 200,
                flex: '0 0 auto',
              },
            },
          }}
        >
          <MetaverseSelect />

          <SortSelect />
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          gap="12px"
          sx={{
            ml: 'auto',
            '@media (min-width: 900px)': {
              ml: 0,
            },
          }}
        >
          <Divider
            sx={{
              borderColor: '#27273A',
              display: 'none',
              '@media (min-width: 900px)': {
                display: 'block',
              },
            }}
            orientation="vertical"
          />

          <SearchBar />
        </Box>
      </Box>
    </Box>
  );
};

export default MyPropertiesViewHeader;
