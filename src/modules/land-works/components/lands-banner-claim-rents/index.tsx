import { FC } from 'react';

import { Button } from 'design-system';
import { ReactComponent as DollarRibbonIcon } from 'resources/svg/dollar-ribbon.svg';

import { BoxStyled, RootStyled } from './styled';

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
      <DollarRibbonIcon height={40} width={40} />
      <BoxStyled>
        <h3>Rents Available to Claim</h3>
        <span>There are unclaimed rents from your listed properties. Claim now</span>
      </BoxStyled>
      <Button
        variant="primary"
        btnSize="auto"
        style={{ marginLeft: 'auto' }}
        onClick={onClickHandler}
        disabled={isClaimButtonDisabled}
      >
        CLAIM RENTS
      </Button>
    </RootStyled>
  );
};

export default LandsBannerClaimRents;
