import React from 'react';
import { Grid } from '@mui/material';

import Icon from 'components/custom/icon';
import { Button } from 'design-system';

import './index.scss';

interface ModalProps {
  title: string;
  description: string;
  buttonText: string;
  buttonEvent: () => void;
}

export const ModalSuccess: React.FC<ModalProps> = ({ title, description, buttonEvent, buttonText }) => {
  return (
    <Grid container className="rent-modal-succes">
      <Icon name="success" className="success-icon" />
      <p>{title}</p>
      <span>{description}</span>
      <Button variant="gradient" onClick={buttonEvent}>
        {buttonText}
      </Button>
    </Grid>
  );
};
