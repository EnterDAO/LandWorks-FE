import { Box } from '@mui/material';

import { ChipStyled, RootStyled, TypographyStyled } from './styled';

type Coordinate = {
  id: string;
  x: string;
  y: string;
};

interface IEstateLandOverlay {
  title: string;
  coordinates?: Coordinate[];
  place?: string[] | null | undefined;
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
        {place && place.length && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {place.map((title, index) => (
              <ChipStyled key={index} label={title} variant="outlined" />
            ))}
          </Box>
        )}
      </>
    </RootStyled>
  );
};

export default LandsMapOverlay;
