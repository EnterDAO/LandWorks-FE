import { FC } from 'react';

import { Button } from 'design-system';
import { ReactComponent as DollarRibbonIcon } from 'resources/svg/dollar-ribbon.svg';

import { RootStyled, SpanStyled } from './styled';

interface Props {
  onButtonClick?: () => void;
  isClaimButtonDisabled: boolean;
}

const LandsBannerClaimRents: FC<Props> = ({ onButtonClick, isClaimButtonDisabled }) => {
  const onClickHandler = () => {
    onButtonClick && onButtonClick();
  };

  return (
    <RootStyled>
      <DollarRibbonIcon />
      <SpanStyled>Rents Available to Claim</SpanStyled>
      <Button variant="accentblue" btnSize="auto" onClick={onClickHandler} disabled={isClaimButtonDisabled}>
        CLAIM RENTS
      </Button>
    </RootStyled>
  );
};

export default LandsBannerClaimRents;
