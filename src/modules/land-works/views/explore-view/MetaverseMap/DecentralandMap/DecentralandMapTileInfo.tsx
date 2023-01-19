import React from 'react';
import { Box } from '@mui/material';

import Typography from 'components/common/Typography';
import useDebouncedValue from 'hooks/useDebounce';
import useEnsName from 'hooks/useEnsName';

import { DecentralandMapTile } from './DecentralandTileMap';

interface DecentralandMapTileInfoProps {
  tile: DecentralandMapTile;
}

const DecentralandMapTileInfo = ({ tile }: DecentralandMapTileInfoProps) => {
  const tileOwner = tile.owner || '';
  const debouncedTileOwner = useDebouncedValue(tileOwner, 600);
  const { data: ownerEnsName, isValidating } = useEnsName(debouncedTileOwner || '');
  const displayedOwner = !!ownerEnsName && !isValidating && debouncedTileOwner === tileOwner ? ownerEnsName : tileOwner;

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
          title={displayedOwner}
        >
          {displayedOwner}
        </Typography>
      </Typography>
    </Box>
  );
};

export default DecentralandMapTileInfo;
