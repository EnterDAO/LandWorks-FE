import React from 'react';
import { Box } from '@mui/material';
import useSWRImmutable from 'swr/immutable';

import Typography from 'components/common/Typography';
import { getENSName } from 'helpers/helpers';

import { DecentralandMapTile } from './DecentralandTileMap';

interface DecentralandMapTileInfoProps {
  tile: DecentralandMapTile;
}

const useEnsName = (walletAddress: string) => {
  return useSWRImmutable(walletAddress, getENSName);
};

const DecentralandMapTileInfo = ({ tile }: DecentralandMapTileInfoProps) => {
  const { data } = useEnsName(tile.owner || '');
  const owner = data || tile.owner || '';

  return (
    <Box
      position="absolute"
      bottom={20}
      left={20}
      borderRadius="8px"
      padding={2}
      boxShadow="1px 1px 20px rgba(22, 22, 34, 0.5)"
      bgcolor="var(--theme-card-color)"
      width={250}
    >
      <Typography>
        X: {tile.x} Y: {tile.y}
      </Typography>

      <Typography display="inline-flex" width={1} overflow="hidden">
        Owner:&nbsp;
        <Typography
          noWrap
          component="a"
          variant="link"
          href={`https://etherscan.io/address/${tile.owner}`}
          target="_blank"
          title={owner}
        >
          {owner}
        </Typography>
      </Typography>
    </Box>
  );
};

export default DecentralandMapTileInfo;
