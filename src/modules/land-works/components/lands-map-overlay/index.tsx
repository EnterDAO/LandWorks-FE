import { Box } from '@mui/material';

import { ChipStyled, RootStyled, TypographyStyled } from './styled';

type Coordinate = {
  id: string;
  x: string;
  y: string;
};

export type CryptoVoxelsPlace =
  | {
      island: string;
      suburb: string;
    }
  | undefined;

interface IEstateLandOverlay {
  title: string;
  coordinates?: Coordinate[];
  place: CryptoVoxelsPlace;
}

const LandsMapOverlay: React.FC<IEstateLandOverlay> = ({ title, coordinates, place }) => {
  return (
    <RootStyled>
      <TypographyStyled variant="h3">{title}</TypographyStyled>

      {coordinates && coordinates?.length >= 1 && (
        <div>
          {coordinates.map((estateCoord: Coordinate) => (
            <ChipStyled key={estateCoord.id} label={`X: ${estateCoord.x}, Y: ${estateCoord.y}`} variant="outlined" />
          ))}
        </div>
      )}
      <>
        {place && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ChipStyled key={place.island} label={place.island} variant="outlined" />
            <ChipStyled key={place.suburb} label={place.suburb} variant="outlined" />
          </Box>
        )}
      </>
    </RootStyled>
  );
};

export default LandsMapOverlay;
