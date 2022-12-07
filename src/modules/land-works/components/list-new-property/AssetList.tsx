import React, { MouseEvent, ReactNode } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import decentralandLandMapSrc from 'assets/img/decentraland-land-map.png';
import openseaLogoMarkSrc from 'assets/img/opensea-logomark.png';
import Image from 'components/custom/image';

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
      minHeight={210}
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

interface Asset {
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

interface AssetListCardProps extends Pick<ListCardProps, 'isActive' | 'onClick'> {
  asset: Asset;
}

const AssetListCard = ({ asset, ...otherProps }: AssetListCardProps) => {
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

interface LandListProps {
  assets?: Asset[];
  activeAssetId?: string;
  onAssetClick?: (assetId: string) => void;
}

const mockAsset: Asset = {
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

const AssetList = ({ assets = mockAssets, activeAssetId, onAssetClick }: LandListProps) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={4}>
      {assets.map((asset) => {
        return (
          <Grid key={asset.id} item xs={3}>
            <AssetListCard
              isActive={asset.id === activeAssetId}
              asset={asset}
              onClick={() => onAssetClick && onAssetClick(asset.id)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AssetList;
