import { Dispatch, FC, SetStateAction } from 'react';

import { Box } from 'design-system';

import { RootStyled, TabListStyled, TabStyled, TypographyStyled } from './styled';

import {
  SCENE_BUILDER_TAB_STATE_ALL,
  SCENE_BUILDER_TAB_STATE_INDIVIDUAL,
  SCENE_BUILDER_TAB_STATE_STUDIO,
} from 'modules/scene-builder/constants';

interface Props {
  setTab: Dispatch<SetStateAction<string>>;
}

const SceneBuilderTabs: FC<Props> = ({ setTab }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <TypographyStyled>Scene Builders</TypographyStyled>
      <RootStyled style={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <TabListStyled onChange={handleChange} aria-label="Lands tabs filter">
            <TabStyled
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
            />
          </TabListStyled>
        </Box>
      </RootStyled>
    </>
  );
};

export default SceneBuilderTabs;
