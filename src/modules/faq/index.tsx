import React from 'react';

import Accordion from 'components/common/Accordion';
import Typography from 'components/common/Typography';
import { Box } from 'design-system';
import useAutoScrollToAnchor from 'hooks/useAutoScrollToAnchor';
import { Connect } from 'layout/components/connect';
import Footer from 'layout/components/footer';

import { faq } from './data';

const FAQView = () => {
  const anchorId = useAutoScrollToAnchor();

  return (
    <Box pt={{ xs: 12, xl: 26 }} pb={0} className="content-container">
      <Typography
        textAlign="center"
        whiteSpace={{ xs: 'pre-line', xl: 'nowrap' }}
        variant="h1"
        lineHeight={1.5}
        fontSize={{ xs: 25, xl: 60 }}
        mb={3}
      >
        Frequently Asked
        {'\n'}
        <Typography variant="inherit" component="span" color="gradient">
          Questions
        </Typography>
      </Typography>

      <Typography mb={{ xs: 12, xl: 18 }} textAlign="center">
        You can see here the most frequently asked question about LandWorks.
      </Typography>

      <Box mx="auto" maxWidth={680} mb={{ xs: 10, xl: 16 }}>
        {faq.map((faqItem, i) => (
          <Accordion
            defaultExpanded={!!faqItem.id && anchorId === faqItem.id}
            id={faqItem.id}
            key={i}
            title={faqItem.question}
            content={faqItem.answer}
          />
        ))}
      </Box>

      <Connect />
      <Footer />
    </Box>
  );
};

export default FAQView;
