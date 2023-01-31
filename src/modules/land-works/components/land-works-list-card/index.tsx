import React, { FC, useState } from 'react';

import { Box, Grid } from 'design-system';
import { getDecentralandLandImgUrlByCoords } from 'helpers/helpers';
import { BaseNFT, CryptoVoxelNFT, DecentralandNFT } from 'modules/interface';

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
  handleClick: (option: BaseNFT) => void;
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
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            alt="The property from the offer."
            src={getDecentralandLandImgUrlByCoords(land.coords[0], land.coords[1])}
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
              objectFit: 'cover',
              width: '100%',
              height: '100%',
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
            Lands : {coords.length}
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
              objectFit: 'cover',
              width: '100%',
              height: '100%',
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
            <span>{land.place}</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface ListingCardProps {
  property: DecentralandNFT | CryptoVoxelNFT;
  onClick: (land: BaseNFT) => void;
  selected?: boolean;
  estateLands: DecentralandNFT[];
}

export const ListingCard: FC<ListingCardProps> = ({ property, onClick, selected = false, estateLands }) => {
  if (property.metaverseName === 'Voxels') {
    return <VoxelListingCard land={property} handleClick={onClick} isSelectedProperty={selected} />;
  }

  const DecentralandCard = property.isLAND ? LandListingCard : EstateListingCard;

  return (
    <DecentralandCard land={property} handleClick={onClick} isSelectedProperty={selected} landsContent={estateLands} />
  );
};
