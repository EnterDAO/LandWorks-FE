import React from 'react';
import { Link } from '@mui/material';

import { ReactComponent as StayUp } from 'assets/img/StayUp.svg';
import Icon from 'components/custom/icon';
import config from 'config';
import { Button } from 'design-system';
import {
  Copyright,
  IconsRaw,
  LinksRaw,
  StyledForm,
  StyledInput,
  StyledLink,
  StyledRoot,
} from 'modules/landing/components/Connect/styled';
import { LANDING_ROUTES } from 'router/routes';

export const Connect: React.FC = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="content-container">
      <StyledRoot>
        <StayUp />
        <h2>Receive Latest Updates</h2>
        <p>
          We often update LandWorks with whole new features, that’s why subcribe to be the first to receive the latest
          updates.
        </p>
        <StyledForm action={config.mailchimp.url} method="POST" target="_blank">
          <input type="hidden" name="u" value={config.mailchimp.u} />
          <input type="hidden" name="id" value={config.mailchimp.id} />
          <StyledInput
            placeholder="Enter your email"
            type="email"
            name="EMAIL"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
          />
          <Button btnSize="medium" variant="gradient" type="submit">
            notify me
          </Button>
        </StyledForm>
      </StyledRoot>

      <IconsRaw>
        <StyledLink href="https://github.com/EnterDAO">
          <Icon name="png/Github" width="20" height="20" />
        </StyledLink>
        <StyledLink href="https://twitter.com/EnterDao">
          <Icon name="twitter" width="20" height="20" />
        </StyledLink>
        <StyledLink href="https://discord.gg/7QJvEctG2G">
          <Icon name="discord" width="20" height="20" />
        </StyledLink>
        <StyledLink href="https://dune.com/rakis/LandWorks">
          <Icon name="dune" width="20" height="20" />
        </StyledLink>
        <StyledLink href="https://www.coingecko.com/en/coins/enterdao">
          <Icon name="coingecko" width="20" height="20" />
        </StyledLink>
        <StyledLink href="https://medium.com/enterdao">
          <Icon name="medium" width="20" height="20" />
        </StyledLink>
      </IconsRaw>

      <LinksRaw>
        <Link href="https://enterdao.xyz/">EnterDAO</Link>

        <Link href={LANDING_ROUTES.home}>LandWorks</Link>

        <Link href="https://metaportal.gg/">MetaPortal</Link>

        <Link href="https://docs.landworks.xyz/">Documentation</Link>
      </LinksRaw>

      <Copyright>
        <Icon name="png/LandWorksLogo" width="39" height="41" />
        <div>landworks.xyz © {getYear()}. Open-sourced.</div>
      </Copyright>
    </div>
  );
};
