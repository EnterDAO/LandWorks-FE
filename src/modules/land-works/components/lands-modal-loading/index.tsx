import React from 'react';
import { Grid } from '@mui/material';

import Icon from 'components/custom/icon';

import './index.scss';

interface ModalProps {
  href: string;
  text: string;
}

export const ModalLoader: React.FC<ModalProps> = ({ href, text }) => {
  return (
    <Grid container className="rent-modal-loader">
      <Icon name="loader" className="loader" />
      <p>{text}</p>
      <a href={href} target="_blank">
        Check transaction details in wallet
      </a>
    </Grid>
  );
};
