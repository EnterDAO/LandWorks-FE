/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chip, Stack, Typography } from '@mui/material';

import styles from './lands-map-overlay.module.scss';

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
  return coordinates && coordinates?.length >= 1 ? (
    <div className={styles.root}>
      <Typography variant="h3" className="title">
        {title}
      </Typography>

      <Stack direction="row" spacing={1}>
        {(coordinates || []).map((estateCoord: Coordinate) => (
          <Chip
            key={estateCoord.id}
            label={`X: ${estateCoord.x}, Y: ${estateCoord.y}`}
            variant="outlined"
            className={styles.chip}
          />
        ))}
      </Stack>
    </div>
  ) : (
    <></>
  );
};

export default EstateLandOverlay;
