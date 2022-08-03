import avatarEnterdao from 'assets/img/avatar-enterdao.png';
import avatarMarkward from 'assets/img/avatar-markward.png';
import avatarRadina from 'assets/img/avatar-radina.png';
import avatarVankiz from 'assets/img/avatar-vankiz.png';
import avatarZhivko from 'assets/img/avatar-zhivko.png';

export interface TeamMemberData {
  fullName: string;
  twitterUsername?: string;
  about: string;
  avatarUrl: string;
}

export const teamMembers: TeamMemberData[] = [
  {
    fullName: 'Zhivko Todorov',
    twitterUsername: 'zhivkoto',
    about: 'EnterDAO’s co-founder and lead of business development',
    avatarUrl: avatarZhivko,
  },
  {
    fullName: 'Mark Ward',
    twitterUsername: 'markwardbro',
    about: 'DAO Operations Manager at Universe',
    avatarUrl: avatarMarkward,
  },
  {
    fullName: 'Radina Talanova',
    twitterUsername: 'radina_nt',
    about: 'EnterDAO’s co-founder and product lead for MetaPortal',
    avatarUrl: avatarRadina,
  },
  {
    fullName: 'Ivan Iliyanov',
    twitterUsername: 'vankiz_',
    about: 'LandWorks design lead',
    avatarUrl: avatarVankiz,
  },
  {
    fullName: 'EnterDAO Community',
    about:
      'Every ENTR Token holder and Sharded Minds holder with a claimed role in the Discord server will have the opportunity to vote. Each submission will be presented to the community in our Discord server. Eligible users will vote YAY or NAY and the result of the vote will be counted as the fifth overall vote for the build alongside the other 4 jury members. The voting will take place in a dedicated channel in the EnterDAO Discord server.',
    avatarUrl: avatarEnterdao,
  },
];

interface ScoringFactorData {
  name: string;
  description: string;
  icon: '';
}

// export const scoringFactors =
