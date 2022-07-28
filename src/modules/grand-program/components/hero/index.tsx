import React from 'react';

import HeroImage from 'assets/img/grandProgramHero.png';
import { Button } from 'design-system';

import { Description, Image, LeftSide, StyledRoot } from './styled';

export const Hero: React.FC = () => {
  return (
    <StyledRoot>
      <LeftSide>
        <h1>Open Scenes</h1>
        <h2>Grant Program</h2>
        <Description>
          <span>
            Bringing creators to the metaverse economy is a fundamental piece to how Landworks and EnterDAO will grow.
            As we empower more artists, we will in turn grow as well and increase our reach and potential to make
            further impact.
          </span>
          <p>That’s why we are introducing the first iteration of LandWork’s Open Scene Grant Program.</p>
        </Description>
        <Button
          onClick={() => window.open('https://d1zs47v7suw.typeform.com/to/hs05sYCZ')}
          variant="gradient"
          btnSize="medium"
        >
          Apply now
        </Button>
      </LeftSide>
      <div>
        <Image src={HeroImage} />
      </div>
    </StyledRoot>
  );
};
