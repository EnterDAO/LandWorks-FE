import React from 'react';
import { SxProps, styled } from '@mui/system';

import { Box } from 'design-system';

import { TeamMemberData } from './data';

import { THEME_COLORS } from 'themes/theme-constants';

export const AvatarContainer = styled('div')({
  width: 120,
  height: 120,
  flexShrink: 0,
  padding: 3,
  borderRadius: '50%',
  background: 'linear-gradient(83.81deg, #AC2CCB -19.8%, #DD3DCB 22%, #EF9C92 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 400px)': {
    width: 80,
    height: 80,
  },
});

export const AvatarImg = styled('img')({
  height: '100%',
  width: '100%',
  borderRadius: '50%',
  border: '10px solid #161622',
  backgroundColor: '#161622',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const TeamDescription = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 20,
  '& h4': {
    color: 'var(--theme-grey900-color)',
    fontSize: 16,
  },
  '& a': {
    color: THEME_COLORS.accentBlue,
  },
});

interface TeamMemberCardProps {
  teamMember: TeamMemberData;
  sx?: SxProps;
}

export const TeamMemberCard = ({ teamMember, sx }: TeamMemberCardProps) => {
  return (
    <Box display="flex" alignItems="center" sx={sx}>
      <AvatarContainer>
        <AvatarImg src={teamMember.avatarUrl} alt={teamMember.fullName} />
      </AvatarContainer>
      <TeamDescription>
        <h4>{teamMember.fullName}</h4>
        {teamMember.twitterUsername && (
          <a href={`https://twitter.com/${teamMember.twitterUsername}`}>@{teamMember.twitterUsername}</a>
        )}
        <p>{teamMember.about}</p>
      </TeamDescription>
    </Box>
  );
};
