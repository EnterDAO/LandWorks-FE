/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import { Box } from '@mui/material';

import { ChipStyled, PlotContainer, RootStyled, StyledDiv, TypographyStyled } from './styled';

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
  const [expand, setExpand] = useState(false);
  const coordsLength = coordinates?.length;
  const hasMoreThanSix = coordsLength! > 6;
  const hasLessThanSix = coordsLength! > 0 && coordsLength! <= 6;

  const maxWidth = expand ? '410px' : '280px';
  const coords = hasMoreThanSix && expand ? coordinates : coordinates?.slice(0, 5);

  return (
    <RootStyled style={{ maxWidth: maxWidth }} onMouseLeave={() => setExpand(false)}>
      <TypographyStyled variant="h3">{title}</TypographyStyled>

      {coordinates && hasLessThanSix && (
        <StyledDiv>
          {coordinates.map((estateCoord: Coordinate) => (
            <ChipStyled key={estateCoord.id} label={`X: ${estateCoord.x}, Y: ${estateCoord.y}`} variant="outlined" />
          ))}
        </StyledDiv>
      )}

      {coordinates && hasMoreThanSix && (
        <StyledDiv>
          {coords?.map((estateCoord: Coordinate) => (
            <ChipStyled key={estateCoord.id} label={`X: ${estateCoord.x}, Y: ${estateCoord.y}`} variant="outlined" />
          ))}
          {!expand && (
            <div onMouseEnter={() => setExpand(true)}>
              <ChipStyled label="More..." variant="outlined" />
            </div>
          )}
        </StyledDiv>
      )}

      <>
        {place && place.length && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <PlotContainer>
              <p>Island:</p> <ChipStyled style={{ textAlign: 'left' }} label={place[0]} variant="outlined" />
            </PlotContainer>
            <PlotContainer>
              <p>Suburb:</p> <ChipStyled style={{ textAlign: 'left' }} label={place[1]} variant="outlined" />
            </PlotContainer>
          </Box>
        )}
      </>
    </RootStyled>
  );
};

export default LandsMapOverlay;
