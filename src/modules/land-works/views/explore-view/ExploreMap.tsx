import React, { FC, useState } from 'react';

import { ReactComponent as MinimizeIcon } from 'assets/icons/minimize.svg';
import { Box, Stack } from 'design-system';
import { MinusIcon, PlusThinIcon, ViewAllIcon } from 'design-system/icons';
import MetaverseMap, { MetaverseMapProps } from 'modules/land-works/views/explore-view/MetaverseMap/MetaverseMap';
import { useStickyOffset } from 'providers/sticky-offset-provider';

import MapControlButton from './MapControlButton';
import { useMetaverseMap } from './MetaverseMap/MetaverseMapProvider';
import ToggleMapVisibilityButton from './ToggleMapVisibilityButton';

interface ExploreMapProps extends Omit<MetaverseMapProps, 'isFullScreen'> {
  isMapVisible?: boolean;
  onShowMap?: () => void;
  onHideMap?: () => void;
}

const MetaverseMapZoomInButton = () => {
  const { zoom, zoomIn, maxZoom } = useMetaverseMap();

  return <MapControlButton disabled={zoom === maxZoom} onClick={zoomIn} icon={PlusThinIcon} />;
};

const MetaverseMapZoomOutButton = () => {
  const { zoom, zoomOut, minZoom } = useMetaverseMap();

  return <MapControlButton disabled={zoom === minZoom} onClick={zoomOut} icon={MinusIcon} />;
};

const ExploreMap: FC<ExploreMapProps> = ({ isMapVisible, onShowMap, onHideMap, ...metaverseMapProps }) => {
  const stickyOffset = useStickyOffset();
  const [isMapMaximized, setIsMapMaximized] = useState(false);

  const toggleIsMapMaximized = () => setIsMapMaximized((prevIsMapMaximized) => !prevIsMapMaximized);

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
            bgcolor="#662363"
          >
            <MetaverseMap isFullScreen={isMapMaximized} {...metaverseMapProps}>
              <Stack spacing={2} position="absolute" right={20} top={20}>
                <MetaverseMapZoomInButton />
                <MetaverseMapZoomOutButton />
                <MapControlButton onClick={toggleIsMapMaximized} icon={isMapMaximized ? MinimizeIcon : ViewAllIcon} />
              </Stack>
            </MetaverseMap>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExploreMap;
