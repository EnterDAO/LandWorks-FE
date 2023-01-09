import React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from 'components/common/Typography';
import AdaptiveTypography from 'components/custom/adaptive-typography';
import { Box, Button, Stack } from 'design-system';
import QuestionAccordion from 'layout/components/quastion-accordion/QuestionAccordion';
import { LANDING_ROUTES } from 'router/routes';

import { questionData } from './data';

export const FAQ: React.FC = () => {
  const history = useHistory();

  return (
    <Stack alignItems="center" py={{ xs: 10, lg: 20 }} className="content-container">
      <AdaptiveTypography textAlign="center" variant="h1" component="h2" mb={{ xs: 10, xl: 18 }}>
        Frequently Asked
        <br />
        <Typography variant="inherit" color="gradient">
          Questions
        </Typography>
      </AdaptiveTypography>
      <Box maxWidth={680} mb={10}>
        {questionData.map((question) => (
          <QuestionAccordion question={question} key={question.id} />
        ))}
      </Box>
      <Button onClick={() => history.push(LANDING_ROUTES.faq)} variant="primary" btnSize="small">
        See all FAQ
      </Button>
    </Stack>
  );
};
