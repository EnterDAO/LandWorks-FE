import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { ArrowRightIcon } from '../icons';
import Icon from '../icons/Icon';

import { THEME_COLORS } from '../../themes/theme-constants';

export interface BreadcrumbsMenuLink {
  name: string;
  path: string;
}

interface BreadcrumbsMenuProps {
  links: BreadcrumbsMenuLink[];
  ariaLabel?: string;
}

const BreadcrumbsMenu: FC<BreadcrumbsMenuProps> = (props) => {
  const history = useHistory();
  const { links, ariaLabel } = props;

  return (
    <Breadcrumbs
      separator={<Icon iconElement={<ArrowRightIcon />} iconSize="xs" sx={{ color: THEME_COLORS.grey03 }} />}
      aria-label={ariaLabel}
    >
      {links.map((currentLink: BreadcrumbsMenuLink, index: number) => {
        if (index === links.length - 1) {
          return (
            <Typography variant="button" component="span" key={currentLink.name}>
              {currentLink.name}
            </Typography>
          );
        }
        return (
          <Typography
            key={currentLink.name}
            variant="caption"
            component="span"
            onClick={() => history.push(currentLink.path)}
            color={THEME_COLORS.grey03}
            sx={{ cursor: 'pointer' }}
          >
            {currentLink.name}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};
export default BreadcrumbsMenu;
