import { FC } from 'react';

import ExternalLink from 'components/custom/external-link';
import { Button, Grid, Modal } from 'design-system';

import { TypographyStyled } from './styled';

interface BuilderContactModal {
  email: string;
  discord: string;
  twitter: string;
  open: boolean;
  handleClose: () => void;
}

const BuilderContactModal: FC<BuilderContactModal> = ({ email, discord, twitter, open, handleClose }) => {
  const linkStyle = {
    color: '#F8F8FF',
  };

  const hasValidDiscord = discord !== '-' && discord !== undefined;
  const hasValidTwitter = twitter !== '-' && twitter !== undefined;

  return (
    <Modal height="70vh" open={open} handleClose={handleClose}>
      <Grid display="flex" flexDirection="column" alignItems="center">
        <TypographyStyled variant="h1">Send a Message</TypographyStyled>
        <TypographyStyled variant="h2">
          Choose method to contact the builder. The communication happens outside of LandWorks.
        </TypographyStyled>
        <Grid display="flex" width="300px" flexDirection="column" gap="15px" mt="30px">
          <Button btnSize="medium" variant="gradient">
            {/* THIS VALUE PASSED IN NEEDS TO BE THE USERS FULL EMAIL ADDRESS */}
            <ExternalLink style={linkStyle} href={`mailto:${email}`}>
              Send Email
            </ExternalLink>
          </Button>
          {hasValidDiscord && (
            <Button btnSize="medium" variant="secondary">
              {/* THIS VALUE PASSED IN NEEDS TO BE THE USERS DISCORD ID OF ±18 NUMBERS */}
              <ExternalLink style={linkStyle} href={`https://discordapp.com/users/${discord}`}>
                Send message in discord
              </ExternalLink>
            </Button>
          )}
          {hasValidTwitter && (
            <Button btnSize="medium" variant="secondary">
              {/* THIS VALUE PASSED IN NEEDS TO BE A COMPLETE URL TO THE TWITTER PROFILE  */}
              <ExternalLink style={linkStyle} href={`${twitter}`}>
                Send message in Twitter
              </ExternalLink>
            </Button>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default BuilderContactModal;
