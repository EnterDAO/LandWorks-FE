/* eslint-disable @typescript-eslint/no-explicit-any */

import { Grid, Typography } from '@mui/material';

import './index.scss';

type Coordinate = {
  id: string;
  x: string;
  y: string;
};

interface IEstateLandOverlay {
  coordinates?: Coordinate[];
}

const EstateLandOverlay: React.FC<IEstateLandOverlay> = ({ coordinates }) => {
  return coordinates && coordinates?.length > 1 ? (
    <div className="estate-overlay-container">
      <Typography variant="h3" className="title">
        Estate
      </Typography>
      <Grid container>
        {(coordinates || []).map((estateCoord: Coordinate) => (
          <Grid item xs={6} key={estateCoord.id} className="estate-land">
            <span>
              X: {estateCoord.x}, Y: {estateCoord.y}
            </span>
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <></>
  );
};

export default EstateLandOverlay;
