import React, { FC } from 'react';

import { ReactComponent as GradientStarIcon } from 'assets/icons/gradient-star.svg';
import { Box, Button } from 'design-system';

const FeedbackButton: FC = () => {
  return (
    <Button
      btnSize="xsmall"
      variant="secondary"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'auto !important',
        '& > span': {
          display: 'inline-flex',
          alignItems: 'center',
        },
        padding: '0 15px 0 10px !important',
      }}
      onClick={() => window.open('https://d1zs47v7suw.typeform.com/landworks-rent', '_blank', 'noopener,noreferrer')}
    >
      <Box component="span" display="inline-flex" mr={1}>
        <GradientStarIcon />
      </Box>
      Share Feedback and get 500 ENTR
    </Button>
  );
};

export default FeedbackButton;
