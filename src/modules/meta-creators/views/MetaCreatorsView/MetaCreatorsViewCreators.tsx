import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import CardsGrid from 'components/custom/cards-grid';
import Container from 'components/custom/container';
import { Tab, Tabs } from 'components/styled/tab';
import SceneBuilderCard from 'modules/meta-creators/components/scene-builder-card';
import SceneBuilderCardSkeleton from 'modules/meta-creators/components/scene-builder-card/SceneBuilderCardSkeleton';
import useGetAllMetaCreatorsQuery from 'modules/meta-creators/hooks/useGetAllMetaCreatorsQuery';

import {
  SCENE_BUILDER_TAB_STATE_ALL,
  SCENE_BUILDER_TAB_STATE_INDIVIDUAL,
  SCENE_BUILDER_TAB_STATE_STUDIO,
} from 'modules/meta-creators/constants';

const tabs = [SCENE_BUILDER_TAB_STATE_ALL, SCENE_BUILDER_TAB_STATE_INDIVIDUAL, SCENE_BUILDER_TAB_STATE_STUDIO] as const;

type TabType = typeof tabs[number];

export const META_CREATORS_VIEW_CREATORS_SECTION_ID = 'meta-creators';

const MetaCreatorsViewCreators = () => {
  const { data } = useGetAllMetaCreatorsQuery();
  const [activeTab, setTab] = useState<TabType>(SCENE_BUILDER_TAB_STATE_ALL);
  const loading = !data;

  const handleTabChange = (e: any, tab: string) => {
    setTab(tab as TabType);
  };

  const currentMetaCreators = useMemo(() => {
    const tabData = data || [];

    if (activeTab === SCENE_BUILDER_TAB_STATE_ALL) {
      return tabData;
    }

    return tabData.filter((sceneBuilder) => sceneBuilder.builderType === activeTab);
  }, [activeTab, data]);

  return (
    <Container id={META_CREATORS_VIEW_CREATORS_SECTION_ID} component="section" pt={20} pb={12}>
      <Typography variant="h2" textAlign="center" mb={6}>
        MetaCreators
      </Typography>

      <Box display="flex" justifyContent="center" mb={10}>
        <Tabs
          sx={{
            '.MuiTabs-flexContainer': {
              flexWrap: 'wrap',
              justifyContent: 'center',
            },
          }}
          value={activeTab}
          onChange={handleTabChange}
        >
          {tabs.map((tab) => {
            return <Tab key={tab} label={tab} value={tab} />;
          })}
        </Tabs>
      </Box>

      <CardsGrid>
        {loading
          ? Array.from({ length: 10 }, (_, i) => {
              return <SceneBuilderCardSkeleton key={i} />;
            })
          : currentMetaCreators.map((sceneBuilder) => {
              return <SceneBuilderCard key={sceneBuilder.id} builder={sceneBuilder} />;
            })}
      </CardsGrid>
    </Container>
  );
};

export default MetaCreatorsViewCreators;
