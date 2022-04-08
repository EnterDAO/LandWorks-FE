import { FC, useState } from 'react';

import { Box, Grid, Modal } from 'design-system';

import { StyledImageContainer, TypographyStyled } from '../styled';

interface ISceneExpertPortfolio {
  portfolio: string[];
}

const SceneExpertPortfolio: FC<ISceneExpertPortfolio> = ({ portfolio }) => {
  const [imageModal, setImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  return (
    <>
      <Grid container spacing={2} rowSpacing={4} columnSpacing={2}>
        <TypographyStyled variant="h3" style={{ padding: '32px 0 28px 15px' }}>
          My Projects
        </TypographyStyled>
        {portfolio.map((url) => (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              key={url}
              onClick={() => {
                setImageModal(true);
                setImageUrl(url);
              }}
            >
              <StyledImageContainer style={{ height: '300px' }}>
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
                    src={url}
                  />
                </Grid>
              </StyledImageContainer>
            </Grid>
            {imageModal && (
              <Modal height="90%" open={true} handleClose={() => setImageModal(false)}>
                <Box
                  component="img"
                  sx={{
                    width: '50vw',
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }}
                  alt="Scene builder portfolio."
                  src={imageUrl}
                />
              </Modal>
            )}
          </>
        ))}
      </Grid>
    </>
  );
};

export default SceneExpertPortfolio;
