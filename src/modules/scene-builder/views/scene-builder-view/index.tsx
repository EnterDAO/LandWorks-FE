import { FC, useMemo, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import useSWR from 'swr';

import { useNotion } from 'api/notion/client';
import CardsGrid from 'components/custom/cards-grid';
import Container from 'components/custom/container';
import { Tab, Tabs } from 'components/styled/tab';
import SceneBuilderHeading from 'modules/scene-builder/components/land-works-scene-builders-heading';
import SceneBuilderCard from 'modules/scene-builder/components/scene-builder-card';
import SceneBuilderCardSkeleton from 'modules/scene-builder/components/scene-builder-card/SceneBuilderCardSkeleton';

import {
  SCENE_BUILDER_TAB_STATE_ALL,
  SCENE_BUILDER_TAB_STATE_INDIVIDUAL,
  SCENE_BUILDER_TAB_STATE_STUDIO,
} from 'modules/scene-builder/constants';

import { NotionResultForProfile } from 'modules/scene-builder/components/scene-builder-card/types';

const tabs = [SCENE_BUILDER_TAB_STATE_ALL, SCENE_BUILDER_TAB_STATE_INDIVIDUAL, SCENE_BUILDER_TAB_STATE_STUDIO] as const;

type TabType = (typeof tabs)[number];

export const useSceneBuilders = () => {
  const { getSceneProviders } = useNotion();

  return useSWR<NotionResultForProfile[]>('scene-builders', getSceneProviders);
};

const SceneBuilderView: FC = () => {
  const { data } = useSceneBuilders();
  const sceneBuilderContainerElRef = useRef<HTMLElement | null>(null);
  const [activeTab, setTab] = useState<TabType>(SCENE_BUILDER_TAB_STATE_ALL);
  const loading = !data;

  const handleTabChange = (e: any, tab: string) => {
    setTab(tab as TabType);
  };

  const handleExploreButtonClick = () => {
    if (sceneBuilderContainerElRef.current) {
      sceneBuilderContainerElRef.current.scrollIntoView();
    }
  };

  const sceneBuilders = useMemo(() => {
    const tabData = data || [];

    if (activeTab === SCENE_BUILDER_TAB_STATE_ALL) {
      return tabData;
    }

    return tabData.filter((sceneBuilder) => sceneBuilder.builderType === activeTab);
  }, [activeTab, data]);

  return (
    <Container>
      <SceneBuilderHeading onExploreButtonClick={handleExploreButtonClick} />

      <Box ref={sceneBuilderContainerElRef} pt={20} pb={12}>
        <Typography variant="h2" textAlign="center" mb={6}>
          Scene Builders
        </Typography>

        <Box display="flex" justifyContent="center" mb={10}>
          <Tabs value={activeTab} onChange={handleTabChange}>
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
            : sceneBuilders.map((sceneBuilder) => {
                return <SceneBuilderCard key={sceneBuilder.id} builder={sceneBuilder} />;
              })}
        </CardsGrid>
      </Box>
    </Container>
  );
};

export default SceneBuilderView;
