import React from 'react';

import Icon from 'components/custom/icon';
import { SpinnerSecondary } from 'design-system/icons';

import { ContainerStyled, RootStyled, Spinner, TypographyStyled } from './styled';

const LandWorksLoadingCard: React.FC = () => {
  return (
    <RootStyled>
      <Icon
        style={{ position: 'absolute' }}
        className="card-image"
        name="png/CardLoadingSkeleton"
        width="100%"
        height="388"
      />
      <ContainerStyled>
        <Spinner>
          <SpinnerSecondary />
        </Spinner>
        <TypographyStyled>Listing in progress...</TypographyStyled>
      </ContainerStyled>
    </RootStyled>
  );
};

export default LandWorksLoadingCard;
