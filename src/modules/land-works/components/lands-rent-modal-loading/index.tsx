import React from 'react';
import { Grid } from '@mui/material';

import Icon from 'components/custom/icon';

interface ModalProps {
  href: string;
}

export const ModalLoader:React.FC<ModalProps> =({href}) => {
  return (
    <Grid container className="rent-modal-loader">
      <Icon name="loader" className="loader" />
      <p>Signing Transaction...</p>
      <a href={href} target="_blank">Check transaction details in wallet</a>
    </Grid>
  )
}
