import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

import { TagRoot } from './tag-styles';

import { GRADIENT_TEXT } from 'themes/theme-constants';

interface TagProps extends ComponentPropsWithoutRef<typeof TagRoot> {
  children?: ReactNode;
}

const Tag: FC<TagProps> = ({ children, ...otherProps }) => {
  return (
    <TagRoot {...otherProps}>
      <Typography component="span" variant="body2" sx={GRADIENT_TEXT}>
        {children}
      </Typography>
    </TagRoot>
  );
};

export default Tag;
