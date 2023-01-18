import React, { MouseEvent, ReactNode } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import Image from 'components/custom/image';
import { CryptoVoxelNFT, DecentralandNFT } from 'modules/interface';

interface ListCardProps {
  image: string;
  title: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const ListCard = ({ image, title, subtitle, footer, isActive, onClick }: ListCardProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest('a') && onClick) {
      onClick();
    }
  };

  return (
    <Box
      minHeight={{
        xs: 188,
        xxl: 210,
      }}
      bgcolor="var(--theme-grey200-color)"
      borderRadius="10px"
      p={2}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.15s',
        boxShadow: isActive ? '0px 5px 18px rgba(255, 255, 255, 0.3)' : '',
        border: `2px solid ${isActive ? 'var(--theme-primary-color)' : 'transparent'}`,
        ':hover': {
          borderColor: 'var(--theme-primary-color)',
        },
      }}
      onClick={handleClick}
      textAlign="left"
    >
      <Image
        src={image}
        sx={{ width: 1, height: 110, objectFit: 'cover', borderRadius: '10px', mb: '12px', display: 'block' }}
      />

      <Typography color="var(--theme-light-color)" fontWeight={700} variant="body1" noWrap>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" component="p" mt="4px" noWrap>
          {subtitle}
        </Typography>
      )}

      {footer && <Box mt="auto">{footer}</Box>}
    </Box>
  );
};

type Asset = CryptoVoxelNFT | DecentralandNFT;

interface AssetListCardProps extends Pick<ListCardProps, 'isActive' | 'onClick'> {
  asset: Asset;
}

const getSubtitle = (asset: Asset) => {
  if (asset.metaverseName === 'Voxels') {
    return `Location ${asset.place}`;
  } else if (asset.metaverseName === 'Decentraland') {
    if (!asset.isLAND) {
      return `Lands ${asset.size}`;
    } else {
      const { 0: x, 1: y } = asset.coords;

      return `Location X:${x} Y:${y}`;
    }
  }

  return 'No co-ordinates available';
};

const AssetListCard = ({ asset, ...otherProps }: AssetListCardProps) => {
  const subtitle = getSubtitle(asset);

  return <ListCard image={asset.image} title={asset.name} subtitle={subtitle} {...otherProps} />;
};

interface LandListProps {
  assets: Asset[];
  selectedAssetId?: string;
  onSelectAsset?: (asset: Asset) => void;
}

const AssetList = ({ assets, selectedAssetId: activeAssetId, onSelectAsset }: LandListProps) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={4}>
      {assets.map((asset) => {
        return (
          <Grid key={asset.id} item xs={4} xxl={3}>
            <AssetListCard
              isActive={asset.id === activeAssetId}
              asset={asset}
              onClick={() => onSelectAsset && onSelectAsset(asset)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AssetList;
