import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'design-system';
import { CloseIcon } from 'design-system/icons';

import { CloseIconButtonStyled, StyledRoot, StyledTitle } from './styled';

interface IProps {
  setShowAgitationBar: (value: boolean) => void;
}

export const AgitaionBar: React.FC<IProps> = ({ setShowAgitationBar }) => {
  const history = useHistory();
  const hideBar = () => {
    setShowAgitationBar(false);
    sessionStorage.setItem('showAgitationBar', 'false');
  };

  return (
    <StyledRoot>
      <StyledTitle>Apply for our Grant Program and win up to $10,000!</StyledTitle>
      <Button variant="primary" btnSize="xsmall" onClick={() => history.push('/grats-program')}>
        Read more
      </Button>
      <CloseIconButtonStyled
        variant="circular"
        btnSize="small"
        icon={<CloseIcon />}
        colorVariant="light"
        onClick={hideBar}
      />
    </StyledRoot>
  );
};
