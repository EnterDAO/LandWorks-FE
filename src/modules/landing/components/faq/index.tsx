import React from 'react';
import { useHistory } from 'react-router-dom';

import Accordion from 'components/common/Accordion';
import Typography from 'components/common/Typography';
import AdaptiveTypography from 'components/custom/adaptive-typography';
import { Box, Button, Stack } from 'design-system';
import { LANDING_ROUTES } from 'router/routes';

import { faq } from './data';

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
        {faq.map((faqItem, i) => (
          <Accordion key={i} title={faqItem.question} content={faqItem.answer} />
        ))}
      </Box>
      <Button onClick={() => history.push(LANDING_ROUTES.faq)} variant="primary" btnSize="small">
        See all FAQ
      </Button>
    </Stack>
  );
};
