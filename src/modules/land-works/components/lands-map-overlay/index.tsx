/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
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
  const [expand, setExpand] = useState(false);
  const coordsLength = coordinates?.length;
  const hasMoreThanSix = coordsLength! > 6;
  const hasLessThanSix = coordsLength! > 0 && coordsLength! <= 6;

  const maxWidth = expand ? '22rem' : '15rem';
  const coords = hasMoreThanSix && expand ? coordinates : coordinates?.slice(0, 5);

  return (
    <RootStyled style={{ maxWidth: maxWidth }} onMouseLeave={() => setExpand(false)}>
      <TypographyStyled variant="h3">{title}</TypographyStyled>

      {coordinates && hasLessThanSix && (
        <div>
          {coordinates.map((estateCoord: Coordinate) => (
            <ChipStyled key={estateCoord.id} label={`X: ${estateCoord.x}, Y: ${estateCoord.y}`} variant="outlined" />
          ))}
        </div>
      )}

      {coordinates && hasMoreThanSix && (
        <>
          {coords?.map((estateCoord: Coordinate) => (
            <ChipStyled key={estateCoord.id} label={`X: ${estateCoord.x}, Y: ${estateCoord.y}`} variant="outlined" />
          ))}
          <div onMouseEnter={() => setExpand(true)}>{!expand && <ChipStyled label="More..." variant="outlined" />}</div>
        </>
      )}

      <>
        {place && place.length && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ChipStyled label={'Island: ' + place[0]} variant="outlined" />
            <ChipStyled label={'Suburb: ' + place[1]} variant="outlined" />
          </Box>
        )}
      </>
    </RootStyled>
  );
};

export default LandsMapOverlay;
