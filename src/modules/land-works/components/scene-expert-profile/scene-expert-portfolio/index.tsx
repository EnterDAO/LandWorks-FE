import { FC } from 'react';

import { Box, Grid } from 'design-system';

import { CardContainer, TypographyStyled } from '../styled';

import { NotionResultForPortfolio } from '../../scene-expert-card/types';

interface ISceneExpertPortfolio {
  portfolio: NotionResultForPortfolio[];
}

const SceneExpertPortfolio: FC<ISceneExpertPortfolio> = ({ portfolio }) => {
  const p = Array.from(portfolio);

  const pf = [p[0].portfolio1, p[0].portfolio2, p[0].portfolio3, p[0].portfolio4];

  return (
    <Grid container xs={8} spacing={2} rowSpacing={4} columnSpacing={2}>
      <TypographyStyled variant="h3" style={{ padding: '32px 0 28px 15px' }}>
        My Projects
      </TypographyStyled>
      {pf.map((p) => (
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <CardContainer style={{ height: '300px' }}>
            <Grid
              overflow="hidden"
              style={{
                width: '100%',
                overflow: 'hidden',
                height: '100%',
                padding: '8px 6px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                sx={{
                  minWidth: '300px',
                  height: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
                alt="Scene builder portfolio."
                src={p}
              />
            </Grid>
          </CardContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default SceneExpertPortfolio;
