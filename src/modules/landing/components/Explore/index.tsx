import React from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as LandGroup } from 'assets/img/land_group.svg';
import { ReactComponent as Metaverse } from 'assets/img/main_metaverse.svg';
import { Button } from 'design-system';
import { StyledRoot } from 'modules/landing/components/Explore/styled';

export const Explore: React.FC = () => {
  const history = useHistory();
  return (
    <div className="content-container">
      <StyledRoot>
        <div>
          <Metaverse />
          <h1>
            Explore <br /> Our Marketplace
          </h1>
          <p>Rent a land or list your property for renting - we make it easy for you.</p>
          <Button onClick={() => history.push('/explore')} btnSize="small" variant="gradient">
            Explore
          </Button>
        </div>
        <LandGroup />
      </StyledRoot>
    </div>
  );
};
