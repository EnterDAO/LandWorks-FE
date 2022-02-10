import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Tag from '../Tag/Tag';
import { cardTextsBoxStyles } from './card-styles';

type CardTextsBoxProps = {
  size?: 'small' | 'medium' | 'large';
  heading: string;
  tag?: string;
  subHeading?: string;
  description?: string;
};

const CardTextsBox: FC<CardTextsBoxProps> = (props) => {
  const { size, heading, tag, subHeading, description } = props;

  let structure = (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" noWrap>
          {heading}
        </Typography>
        {tag && <Tag sx={{ ml: 2 }}>{tag}</Tag>}
      </Box>
      {subHeading && (
        <Typography variant="body2" sx={cardTextsBoxStyles.textUppercase} noWrap>
          {subHeading}
        </Typography>
      )}
    </>
  );

  if (size === 'small') {
    structure = (
      <>
        <Typography variant="h4" noWrap maxWidth="100%">
          {heading}
        </Typography>
        {subHeading && (
          <Typography variant="body2" sx={cardTextsBoxStyles.textUppercase} noWrap maxWidth="100%">
            {subHeading}
          </Typography>
        )}
        {tag && <Tag sx={{ mt: 2 }}>{tag}</Tag>}
      </>
    );
  }

  return (
    <Box sx={{ ...(size === 'small' && cardTextsBoxStyles.textsBoxSmall) }}>
      {structure}
      {description && (
        <Typography variant="body1" mt={2} sx={cardTextsBoxStyles.description}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default CardTextsBox;
