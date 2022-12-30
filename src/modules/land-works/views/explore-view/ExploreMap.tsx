import React, { ComponentType, useLayoutEffect, useState } from 'react';

import { ReactComponent as MinimizeIcon } from 'assets/icons/minimize.svg';
import Typography from 'components/common/Typography';
import { Box, Stack } from 'design-system';
import { MinusIcon, PlusThinIcon, ViewAllIcon } from 'design-system/icons';
import { LandsExploreMapBaseProps } from 'modules/interface';
import LandsExploreMap from 'modules/land-works/components/lands-explore-map';
import LandsExploreMapVoxels from 'modules/land-works/components/lands-explore-map-voxels';
import { METAVERSES, MetaverseId } from 'modules/land-works/data/metaverses';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import MapControlButton from './MapControlButton';
import ToggleMapVisibilityButton from './ToggleMapVisibilityButton';

interface ExploreMapProps extends Omit<LandsExploreMapBaseProps, 'zoom' | 'onZoom'> {
  metaverse: string;
  isMapVisible?: boolean;
  onShowMap?: () => void;
  onHideMap?: () => void;
}

const ZOOM_STEP = 0.2;

const metaverseMapComponentsById: Record<MetaverseId, ComponentType<LandsExploreMapBaseProps>> = {
  [METAVERSES.Decentraland]: LandsExploreMap,
  [METAVERSES.Voxels]: LandsExploreMapVoxels,
};

// TODO: refactor
const ExploreMap = ({ metaverse, isMapVisible, onShowMap, onHideMap, ...mapProps }: ExploreMapProps) => {
  const stickyOffset = useStickyOffset();
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

  const MapComponent = metaverseMapComponentsById[metaverse as MetaverseId];

  const mapOffsetTop = stickyOffset.offsets.filter + stickyOffset.offsets.header;

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
              pl: isMapMaximized ? 0 : 3,
              width: isMapMaximized ? 1 : 0.5,
              zIndex: isMapMaximized ? 2 : 1,
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
        pt={4}
        sx={
          isMapMaximized
            ? {
                top: 0,
                pt: stickyOffset.offsets.header + 'px',
                position: 'fixed',
                height: 1,
              }
            : {
                top: mapOffsetTop + 'px',
                position: 'sticky',
                maxHeight: `calc(100vh - ${mapOffsetTop}px)`,
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
            zIndex={0}
            bgcolor="var(--theme-card-color)"
          >
            {MapComponent ? (
              <>
                <MapComponent {...mapProps} enableTooltips={isMapMaximized} zoom={zoom} onZoom={handleZoom} />

                <Stack spacing={2} position="absolute" right={20} top={20}>
                  <MapControlButton disabled={zoom === 1} onClick={zoomIn} icon={PlusThinIcon} />
                  <MapControlButton disabled={zoom === 0} onClick={zoomOut} icon={MinusIcon} />
                  <MapControlButton onClick={toggleIsMapMaximized} icon={isMapMaximized ? MinimizeIcon : ViewAllIcon} />
                </Stack>
              </>
            ) : (
              <Typography position="absolute" top={0} left={0} right={0} bottom={0} margin="auto">
                Map is not implemented yet
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExploreMap;
