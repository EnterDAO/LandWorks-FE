/* eslint-disable @typescript-eslint/no-explicit-any */

import { Grid, Typography } from '@mui/material';

import './index.scss';

type Coordinate = {
  id: string;
  x: string;
  y: string;
};

interface IEstateLandOverlay {
  title: string;
  coordinates?: Coordinate[];
}

const EstateLandOverlay: React.FC<IEstateLandOverlay> = ({ title, coordinates }) => {
  return coordinates && coordinates?.length > 0 ? (
    <div className="estate-overlay-container">
      <Typography variant="h3" className="title">
        {title}
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
