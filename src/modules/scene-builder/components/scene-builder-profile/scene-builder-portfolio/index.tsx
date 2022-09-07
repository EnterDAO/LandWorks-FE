import { FC, Fragment, useState } from 'react';

import { Box, Grid, Modal } from 'design-system';

import { StyledImageContainer, TypographyStyled } from '../styled';

interface ISceneBuilderPortfolio {
  portfolio: string[];
}

const SceneBuilderPortfolio: FC<ISceneBuilderPortfolio> = ({ portfolio }) => {
  const [imageModal, setImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  return (
    <>
      <TypographyStyled variant="h3" style={{ padding: '32px 0 28px 15px' }}>
        My Projects
      </TypographyStyled>
      <Grid container spacing={2} rowSpacing={4} columnSpacing={2}>
        {portfolio.map((url) => (
          <Fragment key={url}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
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
              <Modal open={true} sx={{ height: 1 }} handleClose={() => setImageModal(false)}>
                <Box
                  component="img"
                  sx={{
                    width: 'auto',
                    height: 1,
                    borderRadius: '20px',
                  }}
                  alt="Scene builder portfolio."
                  src={imageUrl}
                />
              </Modal>
            )}
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default SceneBuilderPortfolio;
