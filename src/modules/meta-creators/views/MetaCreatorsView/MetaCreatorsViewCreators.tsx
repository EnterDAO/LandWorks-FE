import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import CardsGrid from 'components/custom/cards-grid';
import Container from 'components/custom/container';
import Skeleton from 'components/custom/skeleton';
import { Tab, Tabs } from 'components/styled/tab';
import SceneBuilderCard from 'modules/meta-creators/components/scene-builder-card';
import SceneBuilderCardSkeleton from 'modules/meta-creators/components/scene-builder-card/SceneBuilderCardSkeleton';
import useGetAllMetaCreatorsQuery from 'modules/meta-creators/hooks/useGetAllMetaCreatorsQuery';

import { SCENE_BUILDER_TAB_STATE_ALL } from 'modules/meta-creators/constants';

import { NotionResultForProfile } from 'modules/meta-creators/components/scene-builder-card/types';

export const META_CREATORS_VIEW_CREATORS_SECTION_ID = 'meta-creators';

const MetaCreatorsViewCreators = () => {
  const { data, error } = useGetAllMetaCreatorsQuery();
  const [activeTab, setTab] = useState<string>(SCENE_BUILDER_TAB_STATE_ALL);
  const isLoading = !data && !error;

  const handleTabChange = (e: any, tab: string) => {
    setTab(tab);
  };

  const metaCreatorsByType: Record<string, NotionResultForProfile[]> = useMemo(() => {
    if (!data) {
      return {};
    }

    return {
      ...data.reduce((acc, sceneBuilder) => {
        if (sceneBuilder.builderType) {
          if (!(sceneBuilder.builderType in acc)) {
            acc[sceneBuilder.builderType] = [];
          }

          acc[sceneBuilder.builderType].push(sceneBuilder);
        }

        return acc;
      }, {} as Record<string, NotionResultForProfile[]>),
      [SCENE_BUILDER_TAB_STATE_ALL]: data,
    };
  }, [data]);

  const tabs = Object.keys(metaCreatorsByType);

  const currentMetaCreators = metaCreatorsByType[activeTab];

  return (
    <Container id={META_CREATORS_VIEW_CREATORS_SECTION_ID} component="section" pt={20} pb={12}>
      <Typography variant="h2" textAlign="center" mb={6}>
        Meta Creators
      </Typography>

      <Box display="flex" justifyContent="center" mb={10}>
        {isLoading ? (
          <Box display="flex" flexWrap="wrap" gap={2}>
            {Array.from({ length: 3 }, (_, i) => {
              return <Skeleton key={i} variant="rectangular" width="145px" height="45px" />;
            })}
          </Box>
        ) : (
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
              return <Tab sx={{ minWidth: 145 }} key={tab} label={tab} value={tab} />;
            })}
          </Tabs>
        )}
      </Box>

      <CardsGrid>
        {isLoading
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
