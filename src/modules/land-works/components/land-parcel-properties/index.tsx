import { Grid } from 'design-system';
import { AssetAttributes } from 'modules/land-works/api';

import { GridStyled, GridStyledInnerContainer, TypographyStyled } from './styled';

interface Props {
  attributes: AssetAttributes;
  metaverseAssetId: string;
}

const SingleViewParcelProprties: React.FC<Props> = ({ attributes, metaverseAssetId }) => {
  const atr = attributes;

  const locationDetails = [
    { title: '', value: atr.suburb },
    { title: '', value: metaverseAssetId },
    { title: '', value: atr.suburb },
  ];

  const parcelSize = [
    { title: '', value: atr?.area },
    { title: '', value: '10m x 10m' },
    { title: '', value: atr?.height },
    { title: '', value: atr?.elevation },
  ];

  const additions = [
    { title: '', value: atr.has_basement },
    { title: '', value: atr.waterfront },
    { title: '', value: 10 },
  ];

  console.log({ atr });

  return (
    <GridStyled minHeight={288} container>
      <GridStyledInnerContainer item xs={5} flexDirection="column" alignItems={'left'}>
        <TypographyStyled variant="h1">Location Details</TypographyStyled>
        <Grid display="flex" flexDirection="row">
          <Grid item xs={4.5} mr={5}>
            <TypographyStyled variant="h2">Address</TypographyStyled>
            <TypographyStyled variant="h2">Token</TypographyStyled>
            <TypographyStyled variant="h2">Neighborhood</TypographyStyled>
          </Grid>
          <Grid item xs={7}>
            <TypographyStyled variant="h3">
              {atr?.island}, {atr?.suburb}
            </TypographyStyled>
            <TypographyStyled variant="h3">{metaverseAssetId}</TypographyStyled>
            <TypographyStyled variant="h3">{atr?.suburb}</TypographyStyled>
          </Grid>
        </Grid>
      </GridStyledInnerContainer>
      <GridStyledInnerContainer item xs={3.2} flexDirection="column">
        <TypographyStyled variant="h1">Parcel Size</TypographyStyled>
        <Grid display="flex" flexDirection="row">
          <Grid item xs={4.5} mr={5}>
            <TypographyStyled variant="h2">Area</TypographyStyled>
            <TypographyStyled variant="h2">Size</TypographyStyled>
            <TypographyStyled variant="h2">Build height</TypographyStyled>
            <TypographyStyled variant="h2">Elevation</TypographyStyled>
          </Grid>
          <Grid item xs={7}>
            <TypographyStyled variant="h3">{atr?.area}m^2</TypographyStyled>
            <TypographyStyled variant="h3">Unknown?</TypographyStyled>
            <TypographyStyled variant="h3">{atr?.height} metres</TypographyStyled>
            <TypographyStyled variant="h3">{atr?.elevation}</TypographyStyled>
          </Grid>
        </Grid>
      </GridStyledInnerContainer>
      <GridStyledInnerContainer item xs={3.2} flexDirection="column">
        <TypographyStyled variant="h1">Additions</TypographyStyled>
        <Grid display="flex" flexDirection="row">
          <Grid item xs={4.5} mr={5}>
            <TypographyStyled variant="h2">Has Basement</TypographyStyled>
            <TypographyStyled variant="h2">Is Waterfront</TypographyStyled>
            <TypographyStyled variant="h2">Volume</TypographyStyled>
          </Grid>
          <Grid item xs={7}>
            <TypographyStyled variant="h3">{atr?.has_basement ? 'Yes' : 'No'}</TypographyStyled>
            <TypographyStyled variant="h3">{atr?.waterfront ? 'Yes' : 'No'}</TypographyStyled>
            <TypographyStyled variant="h3">Neighborhood</TypographyStyled>
          </Grid>
        </Grid>
      </GridStyledInnerContainer>
    </GridStyled>
  );
};

export default SingleViewParcelProprties;
