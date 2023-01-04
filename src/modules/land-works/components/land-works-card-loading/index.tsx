import React from 'react';

import Icon from 'components/custom/icon';
import { SpinnerSecondary } from 'design-system/icons';

import { ContainerStyled, RootStyled, Spinner, TypographyStyled } from './styled';

interface LoadingCardProps {
  title: string;
}

const LandWorksLoadingCard: React.FC<LoadingCardProps> = ({ title }) => {
  return (
    <RootStyled>
      <Icon
        style={{ position: 'absolute' }}
        className="card-image"
        name="png/CardLoadingSkeleton"
        width="100%"
        height="362"
      />
      <ContainerStyled>
        <Spinner>
          <SpinnerSecondary />
        </Spinner>
        <TypographyStyled>{title} in progress...</TypographyStyled>
      </ContainerStyled>
    </RootStyled>
  );
};

export default LandWorksLoadingCard;
