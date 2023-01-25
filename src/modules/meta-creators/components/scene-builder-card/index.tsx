import { FC } from 'react';
import { Link } from 'react-router-dom';

import Divider from 'components/custom/divider';
import Image from 'components/custom/image';
import { Box, Stack, Typography } from 'design-system';
import { LocationIcon } from 'design-system/icons';
import { useMetaCreatorsCreatorPath } from 'router/routes';

import { TypeChip } from './styled';

import { formatShortDescription } from '../../../../utils';

import { NotionResultForProfile } from './types';

interface SceneBuilderCardProps {
  builder: NotionResultForProfile;
}

const SceneBuilderCard: FC<SceneBuilderCardProps> = ({ builder }) => {
  const sceneBuilderPath = useMetaCreatorsCreatorPath(builder.builderName);

  return (
    <Stack
      component={Link}
      to={sceneBuilderPath}
      height={435}
      p={4}
      bgcolor="var(--theme-card-color)"
      borderRadius="20px"
      border="2px solid transparent"
      sx={{
        transition: 'all 0.15s',
        ':hover': {
          boxShadow: '0px 5px 18px rgba(255, 255, 255, 0.3)',
          borderColor: 'var(--theme-primary-color)',
        },
      }}
    >
      <Image
        src={builder.coverPhotoLink}
        alt="Scene builder cover image."
        sx={{
          width: 1,
          height: 133,
          objectFit: 'cover',
          borderRadius: '20px',
          flexShrink: 0,
          bgcolor: 'var(--theme-grey200-color)',
        }}
      />

      <Box
        width={100}
        height={100}
        mx="auto"
        mt="-57px"
        mb={3}
        borderRadius="100%"
        flexShrink={0}
        overflow="hidden"
        border="3px solid var(--theme-primary-color)"
        bgcolor="var(--theme-primary-color)"
        boxShadow="0 0 10px rgba(248, 248, 255, 0.6)"
      >
        <Image
          src={builder.avatarPhotoLink}
          alt="Scene builder profile image."
          sx={{
            width: 1,
            height: 1,
            objectFit: 'cover',
            bgcolor: 'var(--theme-card-color)',
          }}
        />
      </Box>

      <Typography variant="h4" noWrap textAlign="center">
        {builder.builderName}
      </Typography>

      <Typography variant="body2" textTransform="uppercase" noWrap mb={2} textAlign="center">
        {builder.definition}
      </Typography>

      <TypeChip sx={{ mb: 3, mx: 'auto' }}>{builder.builderType}</TypeChip>

      <Typography variant="caption" mb="auto" color="var(--theme-subtle-color)" textAlign="center">
        {formatShortDescription(builder.shortDescription)}
      </Typography>

      <Divider sx={{ my: 2, width: 1 }} />

      <Box display="flex" width={1} alignItems="center" gap={2}>
        <LocationIcon />
        <Typography variant="body2" color="var(--theme-subtle-color)">
          {builder.location}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SceneBuilderCard;
