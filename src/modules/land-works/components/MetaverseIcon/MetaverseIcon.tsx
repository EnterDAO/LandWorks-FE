import React from 'react';
import { Box } from '@mui/material';

import decentralandLogoImgSrc from 'assets/logos/decentraland-logo.png';
import voxelsLogoImgSrc from 'assets/logos/voxel-logo.png';
import Icon, { IconProps } from 'components/common/Icon';
import Image from 'components/custom/image';

interface MetaverseIconProps extends Omit<IconProps, 'icon'> {
  metaverseId: string;
}

const iconsByMetaverseId = {
  '1': <Image src={decentralandLogoImgSrc} />,
  '2': <Image src={voxelsLogoImgSrc} />,
};

const MetaverseIcon = ({ metaverseId, ...iconProps }: MetaverseIconProps) => {
  const icon = iconsByMetaverseId[metaverseId as keyof typeof iconsByMetaverseId] || <Box borderRadius="100%" />;

  return <Icon icon={icon} {...iconProps} />;
};

export default MetaverseIcon;
