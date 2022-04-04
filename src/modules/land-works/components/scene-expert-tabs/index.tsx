import { Dispatch, FC, SetStateAction } from 'react';
import {
  SCENE_EXPERT_TAB_STATE_ALL,
  SCENE_EXPERT_TAB_STATE_INDIVIDUAL,
  SCENE_EXPERT_TAB_STATE_STUDIO,
} from 'constants/modules';

import { Box } from 'design-system';

import { RootStyled, TabListStyled, TabStyled, TypographyStyled } from './styled';

interface Props {
  setTab: Dispatch<SetStateAction<string>>;
}

const SceneExpertTabs: FC<Props> = ({ setTab }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <TypographyStyled>Scene Experts</TypographyStyled>
      <RootStyled style={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <TabListStyled onChange={handleChange} aria-label="Lands tabs filter">
            <TabStyled
              label={
                <>
                  <strong>All</strong>
                </>
              }
              value={SCENE_EXPERT_TAB_STATE_ALL}
            />
            <TabStyled
              label={
                <>
                  <strong>Individual</strong>
                </>
              }
              value={SCENE_EXPERT_TAB_STATE_INDIVIDUAL}
            />
            <TabStyled
              label={
                <>
                  <strong>Studio</strong>
                </>
              }
              value={SCENE_EXPERT_TAB_STATE_STUDIO}
            />
          </TabListStyled>
        </Box>
      </RootStyled>
    </>
  );
};

export default SceneExpertTabs;
