import React, { FC, useLayoutEffect, useState } from 'react';

import { Box, Stack } from 'design-system';
import { MinusIcon, PlusThinIcon, ViewAllIcon } from 'design-system/icons';
import { LandsExploreMapBaseProps } from 'modules/interface';
import LandsExploreMap from 'modules/land-works/components/lands-explore-map';
import LandsExploreMapVoxels from 'modules/land-works/components/lands-explore-map-voxels';
import { useHeader } from 'providers/header-provider';

import MapControlButton from './MapControlButton';
import ToggleMapVisibilityButton from './ToggleMapVisibilityButton';

import { DECENTRALAND_METAVERSE, VOXEL_METAVERSE } from 'modules/land-works/constants';

interface ExploreMapProps extends Omit<LandsExploreMapBaseProps, 'zoom' | 'onZoom'> {
  type: typeof VOXEL_METAVERSE | typeof DECENTRALAND_METAVERSE;
  isMapVisible?: boolean;
  onShowMap?: () => void;
  onHideMap?: () => void;
}

const ZOOM_STEP = 0.2;

const ExploreMap: FC<ExploreMapProps> = ({ type, isMapVisible, onShowMap, onHideMap, ...mapProps }) => {
  const header = useHeader();
  const [zoom, setZoom] = useState(0.5);
  const [isMapMaximized, setIsMapMaximized] = useState(false);

  const handleZoom = (newZoom: number) => {
    setZoom(newZoom);
  };

  useLayoutEffect(() => {
    if (!isMapVisible) {
      setIsMapMaximized(false);
    }
  }, [isMapVisible]);

  const zoomIn = () => {
    setZoom((prevZoom) => {
      const nextZoom = prevZoom + ZOOM_STEP;

      return nextZoom > 1 ? 1 : nextZoom;
    });
  };

  const zoomOut = () => {
    setZoom((prevZoom) => {
      const nextZoom = prevZoom - ZOOM_STEP;

      return nextZoom < 0 ? 0 : nextZoom;
    });
  };

  const toggleIsMapMaximized = () => setIsMapMaximized((prevIsMapMaximized) => !prevIsMapMaximized);

  const MapComponent = type === VOXEL_METAVERSE ? LandsExploreMapVoxels : LandsExploreMap;

  return (
    <Box
      display={{
        xs: 'none',
        lg: 'block',
      }}
      right={0}
      top={0}
      position="absolute"
      height={1}
      sx={
        isMapVisible
          ? {
              pl: isMapMaximized ? 0 : 5,
              width: isMapMaximized ? 1 : 0.5,
            }
          : {
              width: 0,
              pl: 0,
            }
      }
    >
      <Box
        height={1}
        width={1}
        sx={
          isMapMaximized
            ? {
                top: 0,
                pt: header.height + 'px',
                position: 'fixed',
                height: 1,
              }
            : {
                top: header.height + 25 + 'px',
                position: 'sticky',
                maxHeight: `calc(100vh - ${header.height + 25}px)`,
                pb: 5,
              }
        }
      >
        <ToggleMapVisibilityButton active={isMapVisible} onClick={isMapVisible ? onHideMap : onShowMap} />
        {isMapVisible && (
          <Box
            position="relative"
            overflow="hidden"
            borderRadius={isMapMaximized ? 0 : '20px 0 0 20px'}
            height={1}
            width={1}
            bgcolor="#662363"
          >
            <MapComponent {...mapProps} zoom={zoom} onZoom={handleZoom} />

            <Stack spacing={2} position="absolute" right={20} top={20}>
              <MapControlButton disabled={zoom === 1} onClick={zoomIn} icon={PlusThinIcon} />
              <MapControlButton disabled={zoom === 0} onClick={zoomOut} icon={MinusIcon} />
              <MapControlButton onClick={toggleIsMapMaximized} icon={ViewAllIcon} />
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExploreMap;
