import { useEffect, useState } from 'react';

import { AssetAttributes } from 'modules/land-works/api';

import ParcelPropertiesLoader from '../land-parcel-properties-loader';
import { GridFlexed, GridItem, GridStyled, GridStyledInnerContainer, StyledLink, TypographyStyled } from './styled';

interface Props {
  attributes: AssetAttributes;
  id: string;
}

const SingleViewParcelProperties: React.FC<Props> = ({ attributes, id }) => {
  const [loading, setLoading] = useState(true);
  const atr = attributes;

  useEffect(() => {
    if (atr?.suburb) {
      setLoading(false);
    }
  }, [atr]);

  const volume = (width: number, depth: number, height: number) => {
    return width * depth * height * 8;
  };

  return (
    <GridStyled minHeight={288} container>
      <TypographyStyled variant="h1">Parcel Properties</TypographyStyled>
      {loading ? (
        <GridFlexed>
          <ParcelPropertiesLoader />
        </GridFlexed>
      ) : (
        <>
          <GridFlexed>
            <GridStyledInnerContainer item xs={5} flexDirection="column" alignItems={'left'}>
              <TypographyStyled variant="h2">Location Details</TypographyStyled>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Address</TypographyStyled>
                <TypographyStyled variant="h4">
                  {atr?.island}, {atr?.suburb}
                </TypographyStyled>
              </GridItem>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Token</TypographyStyled>
                <StyledLink href={`https://www.cryptovoxels.com/parcels/${id}`}>#{id}</StyledLink>
              </GridItem>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Neighborhood</TypographyStyled>
                <StyledLink href={`https://www.cryptovoxels.com/map`}>Cryptovoxels</StyledLink>
              </GridItem>
            </GridStyledInnerContainer>

            <GridStyledInnerContainer item xs={3.4} flexDirection="column" alignItems={'left'}>
              <TypographyStyled variant="h2">Parcel Size</TypographyStyled>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Area</TypographyStyled>
                <TypographyStyled variant="h4">{atr?.area}m²</TypographyStyled>
              </GridItem>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Size</TypographyStyled>
                <TypographyStyled variant="h4">
                  {atr?.width} x {atr?.depth} metres
                </TypographyStyled>
              </GridItem>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Build height</TypographyStyled>
                <TypographyStyled variant="h4">{atr?.height} metres</TypographyStyled>
              </GridItem>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Elevation</TypographyStyled>
                <TypographyStyled variant="h4">{atr?.elevation} metres</TypographyStyled>
              </GridItem>
            </GridStyledInnerContainer>

            <GridStyledInnerContainer item xs={3.4} flexDirection="column" alignItems={'left'}>
              <TypographyStyled variant="h2">Additions</TypographyStyled>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Has Basement</TypographyStyled>
                <TypographyStyled variant="h4">{atr?.has_basement ? 'Yes' : 'No'}</TypographyStyled>
              </GridItem>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Is Waterfront</TypographyStyled>
                <TypographyStyled variant="h4">{atr?.waterfront ? 'Yes' : 'No'}</TypographyStyled>
              </GridItem>
              <GridItem item display="flex" flexDirection="row" xs={12}>
                <TypographyStyled variant="h3">Volume</TypographyStyled>
                <TypographyStyled variant="h4">{volume(atr?.width, atr?.depth, atr?.height)} voxels</TypographyStyled>
              </GridItem>
            </GridStyledInnerContainer>
          </GridFlexed>
        </>
      )}
    </GridStyled>
  );
};

export default SingleViewParcelProperties;
