import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Tab, Tabs } from 'components/styled/tab';
import { Box, Divider, Typography } from 'design-system';
import { SearchIcon } from 'design-system/icons';
import { StyledButton } from 'modules/land-works/components/lands-explore-filters/styled';
import { MyPropertiesRouteTabsValue, getMyPropertiesPath, useMyPropertiesRouteTab } from 'router/routes';

import MetaverseSelect from './MetaverseSelect';
import SortSelect from './SortSelect';

interface MyPropertiesViewHeaderProps {
  tabs: { id: string; label: string | number; labelEnd?: string | number }[];
}

const MyPropertiesViewHeader: FC<MyPropertiesViewHeaderProps> = ({ tabs }) => {
  const activeTabId = useMyPropertiesRouteTab();
  const history = useHistory();

  const handleTabChange = (event: unknown, tabId: string) => {
    history.replace({
      pathname: getMyPropertiesPath(tabId as MyPropertiesRouteTabsValue),
      search: history.location.search,
    });
  };

  return (
    <Box py={4} width={1} boxShadow="inset 0 -2px var(--theme-modal-color)">
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
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          sx={{
            width: 1,
            order: 1,
            '@media (min-width: 1290px)': {
              order: 0,
              width: 'auto',
              flexGrow: 1,
            },
          }}
        >
          <Tabs
            sx={{
              width: 1,
              order: 1,
              display: 'inline-flex',
              '& button': {
                maxWidth: 'none',
                flex: '1 1 auto',
              },
              '& .MuiTabs-flexContainer': {
                flexWrap: 'wrap',
              },
              '@media (min-width: 990px)': {
                order: 0,
                width: 'auto',
                '& button': {
                  flex: '0 0 auto',
                },
                '& .MuiTabs-flexContainer': {
                  flexWrap: 'nowrap',
                },
              },
            }}
            value={activeTabId}
            onChange={handleTabChange}
          >
            {tabs.map((tab) => {
              return (
                <Tab
                  key={tab.id}
                  label={
                    <>
                      {tab.label}
                      <Typography ml={1} component="span" variant="inherit" color="var(--theme-grey700-color)">
                        {tab.labelEnd}
                      </Typography>
                    </>
                  }
                  value={tab.id}
                />
              );
            })}
          </Tabs>

          <Box
            display="flex"
            gap="12px"
            flexWrap="wrap"
            ml="auto"
            sx={{
              width: 1,
              '& > *': {
                flex: '1 1 200px',
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
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          gap="12px"
          sx={{
            ml: 'auto',
            '@media (min-width: 1290px)': {
              ml: 0,
            },
          }}
        >
          <Divider
            sx={{
              borderColor: '#27273A',
              display: 'none',
              '@media (min-width: 1290px)': {
                display: 'block',
              },
            }}
            orientation="vertical"
          />

          <StyledButton
            sx={{
              width: 52,
            }}
          >
            <SearchIcon height={24} width={24} />
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MyPropertiesViewHeader;
