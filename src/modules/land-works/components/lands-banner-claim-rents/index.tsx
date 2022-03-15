import { FC } from 'react';

import { Button } from 'design-system';
import { ReactComponent as DollarRibbonIcon } from 'resources/svg/dollar-ribbon.svg';

import { RootStyled, SpanStyled } from './styled';

const LandsBannerClaimRents: FC = () => {
  return (
    <RootStyled>
      <DollarRibbonIcon />
      <SpanStyled>Rents Available to Claim</SpanStyled>
      <Button variant="accentblue" btnSize="auto">
        CLAIM RENTS
      </Button>
    </RootStyled>
  );
};

export default LandsBannerClaimRents;
