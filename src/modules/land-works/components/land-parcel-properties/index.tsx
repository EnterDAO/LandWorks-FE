import { useEffect, useState } from 'react';

import { AdditionalDecantralandData, AssetAttributes } from 'modules/land-works/api';

import ParcelPropertiesLoader from '../land-parcel-properties-loader';
import { GridFlexed, GridItem, GridStyled, GridStyledInnerContainer, StyledLink, TypographyStyled } from './styled';

interface ViewProps {
  attributes: AssetAttributes | AdditionalDecantralandData;
  id: string;
}
interface VoxelProps {
  atr: AssetAttributes;
  id: string;
}
interface DecentralandProps {
  atr: AdditionalDecantralandData;
  id: string;
}

const SingleViewParcelProperties: React.FC<ViewProps> = ({ attributes, id }) => {
  const [loading, setLoading] = useState(true);
  const atr = attributes;

  useEffect(() => {
    if ('suburb' in atr || 'size' in atr) {
      setLoading(false);
    }
  }, [atr]);

  return (
    <GridStyled minHeight={288} container>
      <TypographyStyled variant="h1">Parcel Properties</TypographyStyled>
      {loading ? (
        <GridFlexed>
          <ParcelPropertiesLoader />
        </GridFlexed>
      ) : 'suburb' in atr ? (
        <VoxelParcel atr={atr} id={id} />
      ) : (
        <DecentralandParcel atr={atr} id={id} />
      )}
    </GridStyled>
  );
};

const VoxelParcel: React.FC<VoxelProps> = ({ atr, id }) => {
  const volume = (width: number, depth: number, height: number) => {
    return width * depth * height * 8;
  };

  const getNeighborhoodLink = (sub: string) => {
    const link = sub.replace(' ', '-').toLowerCase();
    return `https://www.cryptovoxels.com/neighborhoods/${link}`;
  };
  return (
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
          <StyledLink target="_blank" href={`https://www.cryptovoxels.com/parcels/${id}`}>
            #{id}
          </StyledLink>
        </GridItem>
        <GridItem item display="flex" flexDirection="row" xs={12}>
          <TypographyStyled variant="h3">Neighborhood</TypographyStyled>
          <StyledLink target="_blank" href={getNeighborhoodLink(atr.suburb)}>
            {atr.suburb}
          </StyledLink>
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
  );
};
const DecentralandParcel: React.FC<DecentralandProps> = ({ atr, id }) => {
  return (
    <GridFlexed>
      <GridStyledInnerContainer item xs={5.5} flexDirection="column" alignItems={'left'}>
        <TypographyStyled variant="h2">Property Details</TypographyStyled>
        <GridItem item display="flex" flexDirection="row" xs={12}>
          <TypographyStyled variant="h3">Size</TypographyStyled>
          <TypographyStyled variant="h4">{atr?.size}</TypographyStyled>
        </GridItem>
        <GridItem item display="flex" flexDirection="row" xs={12}>
          <TypographyStyled variant="h3">Token ID</TypographyStyled>
          <TypographyStyled variant="h4">#{id}</TypographyStyled>
        </GridItem>
        <GridItem item display="flex" flexDirection="row" xs={12}>
          <TypographyStyled variant="h3">External url</TypographyStyled>
          <StyledLink target="_blank" href={atr.externalUrl}>
            market.decentraland.org
          </StyledLink>
        </GridItem>
      </GridStyledInnerContainer>

      <GridStyledInnerContainer item xs={5.5} flexDirection="column" alignItems={'left'}>
        <TypographyStyled variant="h2">Location Details</TypographyStyled>
        <GridItem item display="flex" flexDirection="row" xs={12}>
          <TypographyStyled variant="h3">Distance to Plaza</TypographyStyled>
          <TypographyStyled variant="h4">
            {atr.attributes.plaza == 0
              ? 'Adjacent'
              : atr.attributes.plaza
              ? `${atr.attributes.plaza} Parsels Away`
              : '—'}
          </TypographyStyled>
        </GridItem>
        <GridItem item display="flex" flexDirection="row" xs={12}>
          <TypographyStyled variant="h3">Distance to Road</TypographyStyled>
          <TypographyStyled variant="h4">
            {atr.attributes.road == 0 ? 'Adjacent' : atr.attributes.road ? `${atr.attributes.road} Parsels Away` : '—'}
          </TypographyStyled>
        </GridItem>
        <GridItem item display="flex" flexDirection="row" xs={12}>
          <TypographyStyled variant="h3">Distance to District</TypographyStyled>
          <TypographyStyled variant="h4">
            {atr.attributes.district == 0
              ? 'Adjacent'
              : atr.attributes.district
              ? `${atr.attributes.district} Parsels Away`
              : '—'}
          </TypographyStyled>
        </GridItem>
      </GridStyledInnerContainer>
    </GridFlexed>
  );
};

export default SingleViewParcelProperties;
