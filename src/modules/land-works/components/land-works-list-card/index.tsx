import React, { useState } from 'react';

import { Box, Grid } from 'design-system';
import { getDecentralandNftImageUrl } from 'helpers/helpers';
import { CryptoVoxelNFT, DecentralandNFT } from 'modules/interface';

import s from './s.module.scss';

interface IEstateCardProps {
  land: DecentralandNFT;
  handleClick: (option: DecentralandNFT) => void;
  isSelectedProperty: boolean;
  landsContent: DecentralandNFT[];
}

interface ILandCardProps {
  land: DecentralandNFT;
  handleClick: (option: DecentralandNFT) => void;
  isSelectedProperty: boolean;
}

interface ICryptoVoxel {
  land: CryptoVoxelNFT;
  handleClick: (option: CryptoVoxelNFT) => void;
  isSelectedProperty: boolean;
}

export const LandListingCard: React.FC<ILandCardProps> = ({ land, handleClick, isSelectedProperty }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Grid className={s.wrapper} item>
      <Grid
        className={`${isSelectedProperty ? s.selected : s.card}`}
        onClick={() => {
          setSelected(!selected);
          handleClick(land);
        }}
      >
        <Grid className={s.imageListWrapper}>
          <Box
            component="img"
            sx={{
              minHeight: 100,
              width: '100%',
              maxHeight: { xs: 110, md: 90 },
              maxWidth: { xs: 350, md: 250 },
            }}
            className={s.image}
            alt="The property from the offer."
            src={getDecentralandNftImageUrl(land)}
          />
        </Grid>
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.name}>
            <span>{land.name.toLowerCase()}</span>
          </Grid>
          <Grid textAlign="left" className={s.details}>
            <span>
              X: {land.coords[0]} Y: {land.coords[1]}
            </span>
          </Grid>
          <Grid textAlign="left" className={s.details}>
            <span>
              Parcel {land.coords[0]}:{land.coords[1]}
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const EstateListingCard: React.FC<IEstateCardProps> = ({
  land,
  handleClick,
  isSelectedProperty,
  landsContent,
}) => {
  const [selected, setSelected] = useState(false);

  const coords = landsContent.map((i: DecentralandNFT) => i.coords);

  return (
    <Grid className={s.wrapper} item>
      <Grid
        className={`${isSelectedProperty ? s.selected : s.card}`}
        onClick={() => {
          setSelected(!selected);
          handleClick(land);
        }}
      >
        <Grid className={s.imageListWrapper}>
          <Box
            component="img"
            sx={{
              minHeight: 100,
              width: '100%',
              maxHeight: { xs: 110, md: 90 },
              maxWidth: { xs: 350, md: 250 },
            }}
            className={s.image}
            alt="The property from the offer."
            src={land.image}
          />
        </Grid>
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.name}>
            <span>{land.name.toLowerCase()}</span>
          </Grid>
          <Grid display="flex" flexWrap="wrap" flexDirection="row" className={s.details}>
            {coords.map((co) => {
              return (
                <span key={`${co[0]}-${co[1]}`} style={{ marginRight: '5px' }}>
                  X: {co[0]} Y: {co[1]}
                  {''}
                </span>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const VoxelListingCard: React.FC<ICryptoVoxel> = ({ land, handleClick, isSelectedProperty }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Grid className={s.wrapper} item>
      <Grid
        className={`${isSelectedProperty ? s.selected : s.card}`}
        onClick={() => {
          setSelected(!selected);
          handleClick(land);
        }}
      >
        <Grid className={s.imageListWrapper}>
          <Box
            component="img"
            sx={{
              minHeight: 100,
              width: '100%',
              maxHeight: { xs: 110, md: 90 },
              maxWidth: { xs: 350, md: 250 },
            }}
            className={s.image}
            alt="The property from the offer."
            src={land.image}
          />
        </Grid>
        <Grid flexDirection="column" alignContent="flex-start" textAlign="left">
          <Grid textAlign="left" className={s.name}>
            <span>{land.name.toLowerCase()}</span>
          </Grid>
          <Grid textAlign="left" className={s.details}>
            <span>{land.formattedCoords}</span>
          </Grid>
          <Grid textAlign="left" className={s.details}>
            <span>Parcel {land.formattedCoords}</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
