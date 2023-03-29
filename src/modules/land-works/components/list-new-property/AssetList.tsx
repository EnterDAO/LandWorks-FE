import React, { MouseEvent, ReactNode } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BigNumber } from 'bignumber.js';
import { formatUSD } from 'web3/utils';

import ExternalLink from 'components/custom/external-link';
import Image from 'components/custom/image';
import config from 'config';
import { Button } from 'design-system';
import useGetAssetsForBuyingQuery, { MarketplaceAsset } from 'hooks/useGetAssetsForBuyingQuery';
import useGetTokenPriceInUsdQuery from 'hooks/useGetTokenPriceInUsdQuery';
import { CryptoVoxelNFT, DecentralandNFT } from 'modules/interface';
import { useWallet } from 'wallets/wallet';

import EmptyAssetsList from './EmptyAssetsList';
import LoadingAssetList from './LoadingAssetList';

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

interface BuyAssetListCardProps extends Pick<ListCardProps, 'isActive' | 'onClick'> {
  asset: MarketplaceAsset;
}

const BuyAssetListCard = ({ asset, ...otherProps }: BuyAssetListCardProps) => {
  const { networkName } = useWallet();
  const subtitle = asset.metadata.coords
    ? `X: ${asset.metadata.coords.x}    Y: ${asset.metadata.coords.y}`
    : `Lands: ${asset.metadata.size}`;
  const { data: assetTokenPriceInUsd, isLoading: isAssetTokenPriceInUsdLoading } = useGetTokenPriceInUsdQuery(
    asset.market.floorAsk.price.currency.symbol
  );

  let network = networkName?.toLowerCase() || 'ethereum';

  if (network === 'mainnet') {
    network = 'ethereum';
  }

  const marketplaceUrl = `https://${config.isDev ? 'testnets.' : ''}opensea.io/assets/${network}/${
    asset.token.contract
  }/${asset.token.tokenId}`;

  return (
    <ListCard
      image={asset.image}
      title={asset.name}
      subtitle={subtitle}
      footer={
        <Box display="flex" alignItems="center" overflow="hidden" gap={2}>
          <Typography variant="body2" minWidth={0} display="flex" flex="1 1 auto" gap="4px">
            <Typography
              display="flex"
              overflow="hidden"
              variant="inherit"
              component="span"
              maxWidth="70%"
              color="var(--theme-light-color)"
              title={`${asset.market.floorAsk.price.amount.decimal} ${asset.market.floorAsk.price.currency.symbol}`}
            >
              <Typography variant="inherit" component="span" noWrap>
                {asset.market.floorAsk.price.amount.decimal}
              </Typography>
              &nbsp;
              <Typography variant="inherit" component="span">
                {asset.market.floorAsk.price.currency.symbol}
              </Typography>
            </Typography>
            <Typography variant="inherit" component="span" noWrap color="var(--theme-subtle-color)">
              {!isAssetTokenPriceInUsdLoading && assetTokenPriceInUsd
                ? formatUSD(
                    new BigNumber(asset.market.floorAsk.price.amount.decimal).multipliedBy(assetTokenPriceInUsd)
                  )
                : '-'}
            </Typography>
          </Typography>

          <ExternalLink
            sx={{
              ml: 'auto',
              display: 'block',
              textDecoration: 'none',
              flexShrink: 0,
            }}
            href={marketplaceUrl}
          >
            <Image
              alt={asset.market.floorAsk.source.name}
              title={asset.market.floorAsk.source.name}
              src={asset.market.floorAsk.source.icon}
              sx={{ width: 15, height: 15, display: 'block' }}
            />
          </ExternalLink>
        </Box>
      }
      {...otherProps}
    />
  );
};

interface BuyAssetListProps extends Omit<ReturnType<typeof useGetAssetsForBuyingQuery>, 'data'> {
  assets?: MarketplaceAsset[];
  selectedAssetId?: string;
  onSelectAsset?: (assetId: string) => void;
  allAssets: MarketplaceAsset[];
}

export const BuyAssetList = ({
  selectedAssetId: activeAssetId,
  loadMore,
  isLoadingInitialData,
  isLoadingMore,
  isReachedEnd,
  isEmpty,
  onSelectAsset,
  assets,
}: BuyAssetListProps) => {
  if (isLoadingInitialData) {
    return <LoadingAssetList />;
  }

  if (isEmpty) {
    return <EmptyAssetsList title="Lands not found." subtitle="It seems that there are no lands for buying." />;
  }

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={4}>
        {assets?.map((asset) => {
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <Grid key={asset.id} item xs={4} xxl={3}>
              <BuyAssetListCard
                isActive={asset.id === activeAssetId}
                asset={asset}
                onClick={onSelectAsset?.bind(null, asset.id)}
              />
            </Grid>
          );
        })}
      </Grid>

      {!isReachedEnd && (
        <Box mt={6}>
          <Button onClick={loadMore} variant="gradient" btnSize="medium" disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </>
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
