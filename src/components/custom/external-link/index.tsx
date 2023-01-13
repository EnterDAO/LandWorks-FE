import React from 'react';
import { TypographyProps, styled } from '@mui/material';

import Typography from 'components/common/Typography';

export type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink = styled((props: TypographyProps<'a'>) => {
  return <Typography component="a" variant="link" rel="noopener noreferrer nofollow" target="_blank" {...props} />;
})({});

export default ExternalLink;
