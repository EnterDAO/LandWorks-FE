import React, { useRef, useState } from 'react';

import Icon from 'components/custom/icon';
import { CloseIcon, HelpIcon } from 'design-system/icons';
import { useGeneral } from 'providers/general-provider';

import { StyledRoot } from './styled';

import { DISCORD_CHANNEL_URL } from 'modules/land-works/constants';

export const JoinPrompt: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { setJoinPromptOpen } = useGeneral();
  const ref = useRef(null);

  const goToServer = () => {
    window.open(DISCORD_CHANNEL_URL, '_blank');
    setOpen(false);
  };

  const handleClose = () => {
    localStorage.removeItem('join_prompt');
    setJoinPromptOpen(false);
  };
  return (
    <StyledRoot
      onBlur={() => setOpen(false)}
      ref={ref}
      sx={{ width: open ? '290px' : '75px' }}
      onClick={() => setOpen(true)}
    >
      {open ? (
        <>
          <div onClick={goToServer}>
            <p>Need help? Join Discord</p>
            <Icon color="primary" name="discord" width="30" height="30" />
          </div>
          <CloseIcon onClick={handleClose} height={20} width={20} style={{ marginLeft: 10 }} />
        </>
      ) : (
        <HelpIcon />
      )}
    </StyledRoot>
  );
};
