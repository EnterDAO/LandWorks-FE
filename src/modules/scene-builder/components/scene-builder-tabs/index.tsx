import { Dispatch, FC, SetStateAction } from 'react';

import { Box } from 'design-system';

import { RootStyled, TabListStyled, TabStyled, TypographyStyled } from './styled';

import {
  SCENE_BUILDER_TAB_STATE_ALL,
  SCENE_BUILDER_TAB_STATE_INDIVIDUAL,
  SCENE_BUILDER_TAB_STATE_STUDIO,
  SceneBuilderTab,
} from 'modules/scene-builder/constants';

interface Props {
  tabs: string[];
  onChange: (tab: string) => void;
}

const SceneBuilderTabs: FC<Props> = ({ tabs, onChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <>
      <TypographyStyled>Scene Builders</TypographyStyled>
      <RootStyled style={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <TabListStyled onChange={handleChange} aria-label="Lands tabs filter">
            {tabs.map((tab) => {
              return <TabStyled label={tab} value={tab} />;
            })}
            {/* <TabStyled
              label={
                <>
                  <strong>All</strong>
                </>
              }
              value={SCENE_BUILDER_TAB_STATE_ALL}
            />
            <TabStyled
              label={
                <>
                  <strong>Individual</strong>
                </>
              }
              value={SCENE_BUILDER_TAB_STATE_INDIVIDUAL}
            />
            <TabStyled
              label={
                <>
                  <strong>Studio</strong>
                </>
              }
              value={SCENE_BUILDER_TAB_STATE_STUDIO}
            /> */}
          </TabListStyled>
        </Box>
      </RootStyled>
    </>
  );
};

export default SceneBuilderTabs;
