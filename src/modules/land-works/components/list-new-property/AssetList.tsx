import React, { MouseEvent, ReactNode } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import decentralandLandMapSrc from 'assets/img/decentraland-land-map.png';
import openseaLogoMarkSrc from 'assets/img/opensea-logomark.png';
import Image from 'components/custom/image';
import { BaseNFT, CryptoVoxelNFT, DecentralandNFT } from 'modules/interface';

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

interface MarketplaceAsset {
  id: string;
  image: string;
  name: string;
  metaverse: number;
  coords: [number, number];
  size?: number;
  url: string;
  marketplace: {
    id: string;
    name: string;
  };
}
// paymentToken: PaymentToken & { usdPrice: string };
type Asset = CryptoVoxelNFT | DecentralandNFT;

interface BuyAssetListCardProps extends Pick<ListCardProps, 'isActive' | 'onClick'> {
  asset: MarketplaceAsset;
}

const BuyAssetListCard = ({ asset, ...otherProps }: BuyAssetListCardProps) => {
  const subtitle = (asset?.size || 0) > 0 ? `Lands: ${asset.size}` : `X: ${asset.coords[0]}    Y: ${asset.coords[0]}`;

  return (
    <ListCard
      image={asset.image}
      title={asset.name}
      subtitle={subtitle}
      footer={
        <Box display="flex" alignItems="center" overflow="hidden" gap={2}>
          <Typography variant="body2" minWidth={0} display="flex" flex="1 1 auto" gap="4px">
            <Typography variant="inherit" component="span" maxWidth="50%" color="var(--theme-light-color)" noWrap>
              <Typography variant="inherit" component="span" noWrap>
                1.5
              </Typography>{' '}
              ETH
            </Typography>
            <Typography variant="inherit" component="span" noWrap color="var(--theme-subtle-color)">
              $1234.56
            </Typography>
          </Typography>

          <Box component="a" ml="auto" target="_blank" flexShrink={0} href={asset.url}>
            {/* TODO: make dynamic */}
            <Image
              alt="OpenSea"
              title="OpenSea"
              src={openseaLogoMarkSrc}
              sx={{ width: 15, height: 15, display: 'block' }}
            />
          </Box>
        </Box>
      }
      {...otherProps}
    />
  );
};

interface BuyAssetListProps {
  assets?: MarketplaceAsset[];
  selectedAssetId?: string;
  onSelectAsset?: (asset: BaseNFT) => void;
}

const mockAsset: MarketplaceAsset = {
  id: '1',
  coords: [22, -23],
  name: 'Land (12,-23)',
  url: '',
  metaverse: 1,
  image: decentralandLandMapSrc,
  marketplace: {
    id: '1',
    name: 'OpenSea',
  },
};

const mockAssets = Array.from({ length: 32 }, (_, i) => {
  return {
    ...mockAsset,
    id: i.toString(),
  };
});

const assetToBaseNft = (asset: MarketplaceAsset): BaseNFT => {
  return {
    id: asset.id,
    image: asset.image,
    name: asset.name,
    contractAddress: '',
    metaverseName: asset.metaverse === 1 ? 'Decentraland' : 'Voxels',
    place: '',
  };
};

export const BuyAssetList = ({
  assets = mockAssets,
  selectedAssetId: activeAssetId,
  onSelectAsset,
}: BuyAssetListProps) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={4}>
      {assets.map((asset) => {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <Grid key={asset.id} item xs={4} xxl={3}>
            <BuyAssetListCard
              isActive={asset.id === activeAssetId}
              asset={asset}
              onClick={() => onSelectAsset && onSelectAsset(assetToBaseNft(asset))}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
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

interface AssetListCardProps extends Pick<ListCardProps, 'isActive' | 'onClick'> {
  asset: Asset;
}

const AssetListCard = ({ asset, ...otherProps }: AssetListCardProps) => {
  const subtitle = getSubtitle(asset);

  return <ListCard image={asset.image} title={asset.name} subtitle={subtitle} {...otherProps} />;
};

interface AssetListProps {
  assets: Asset[];
  selectedAssetId?: string;
  onSelectAsset?: (asset: Asset) => void;
}

const AssetList = ({ assets, selectedAssetId: activeAssetId, onSelectAsset }: AssetListProps) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={4}>
      {assets.map((asset) => {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
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
