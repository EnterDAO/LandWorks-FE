import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Tab, Tabs } from 'components/styled/tab';
import { Typography } from 'design-system';
import { MyPropertiesRouteTabsValue, getMyPropertiesPath } from 'router/routes';

interface MyPropertiesViewTabsProps {
  tabs: { id: string; label: string | number; total: string | number }[];
  activeTabId: string;
}

const MyPropertiesViewTabs: FC<MyPropertiesViewTabsProps> = ({ activeTabId, tabs }) => {
  const history = useHistory();

  const handleTabChange = (event: unknown, tabId: string) => {
    history.replace({
      pathname: getMyPropertiesPath(tabId as MyPropertiesRouteTabsValue),
      search: history.location.search,
    });
  };

  return (
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
        '@media (min-width: 700px)': {
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
                  {tab.total}
                </Typography>
              </>
            }
            value={tab.id}
          />
        );
      })}
    </Tabs>
  );
};

export default MyPropertiesViewTabs;
