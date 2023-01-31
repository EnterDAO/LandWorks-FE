import React from 'react';

import { Box, ControlledSelect, Stack } from 'design-system';

interface MarketplaceAssetListProps {
  test: boolean;
}

const MarketplaceAssetList = (props: MarketplaceAssetListProps) => {
  return (
    <>
      <Box display="flex" gap={4} pb={2}>
        {/* <ControlledSelect
          width="290px"
          value={selectedMetaverse}
          onChange={onChangeMetaverse}
          options={availableMetaverses}
        />
        <Box>
          <ControlledSelect
            width="190px"
            value={landType}
            onChange={onChangeType}
            options={listTypes[selectedMetaverse]}
          />
        </Box> */}
      </Box>

      <Stack height={455} overflow="auto" p={4} mx={-4}>
        {/* <AssetList /> */}
      </Stack>
    </>
  );
};

export default MarketplaceAssetList;
