import React from 'react';
import { Box } from '@mui/material';

interface YoutubeEmbedProps {
  embedId: string;
}

const YoutubeEmbed = ({ embedId }: YoutubeEmbedProps) => {
  return (
    <Box position="relative" overflow="hidden" pb="56.25%">
      <Box
        component="iframe"
        position="absolute"
        left={0}
        top={0}
        width={1}
        height={1}
        src={`https://www.youtube.com/embed/${embedId}`}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{ pointerEvents: 'all' }}
      />
    </Box>
  );
};

export default YoutubeEmbed;
