import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Stack, Typography } from 'design-system';
import { routes } from 'router/routes';

import { questionData } from './data';
import { QuestionItem } from './QuestionItem';

import { GRADIENT_TEXT } from 'themes/theme-constants';

export const FAQ: React.FC = () => {
  const history = useHistory();

  return (
    <Stack alignItems="center" py={{ xs: 10, lg: 20 }} className="content-container">
      <Typography textAlign="center" variant="h1" component="h2" mb={{ xs: 10, lg: 12 }}>
        Frequently Asked
        <br />
        <Typography variant="inherit" sx={GRADIENT_TEXT}>
          Questions
        </Typography>
      </Typography>
      <Box maxWidth={680} mb={10}>
        {questionData.map((item) => (
          <QuestionItem item={item} key={item.id} />
        ))}
      </Box>
      <Button onClick={() => history.push(routes.faq)} variant="primary" btnSize="small">
        See all FAQ
      </Button>
    </Stack>
  );
};
