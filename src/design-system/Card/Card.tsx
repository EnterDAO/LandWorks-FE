import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { cardStyles } from './card-styles';
import CardTextsBox from './CardTextsBox';

import { THEME_COLORS } from '../../themes/theme-constants';

type CardProps = {
  size?: 'small' | 'medium' | 'large';
  image: string;
  dateLabel?: string | 'now';
  hoverAction?: JSX.Element;
  heading: string;
  tag?: string;
  subHeading?: string;
  description?: string;
  bottomAction?: JSX.Element;
  onClick?(): void;
};

const Card: FC<CardProps> = (props) => {
  const { size, image, dateLabel, hoverAction, heading, tag, subHeading, description, bottomAction, onClick } = props;

  let sizeStyles;

  if (size === 'small') {
    sizeStyles = cardStyles.sizeSmall;
  } else if (size === 'medium') {
    sizeStyles = cardStyles.sizeMedium;
  } else {
    sizeStyles = cardStyles.sizeLarge;
  }

  return (
    <Box
      sx={{
        ...cardStyles.cardContainer,
        ...(size === 'small' && cardStyles.cardContainerRow),
      }}
    >
      <Box
        className="card-image-box"
        component="button"
        type="button"
        sx={{
          ...cardStyles.imageBox,
          ...sizeStyles,
          backgroundImage: `url('${image}')`,
        }}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        {dateLabel && (
          <Box
            sx={{
              ...cardStyles.dateLabel,
              ...(dateLabel === 'now' && cardStyles.dateLabelNow),
            }}
          >
            <Typography variant="body2" color={THEME_COLORS.darkBlue01} display="flex" alignItems="center">
              {dateLabel === 'now' ? (
                <>
                  Now
                  <Box component="span" sx={cardStyles.dataLabelNowDot} ml={1} />
                </>
              ) : (
                dateLabel
              )}
            </Typography>
          </Box>
        )}
        {hoverAction && (
          <Box className="card-hover-action-container" sx={cardStyles.hoverActionContainer}>
            {hoverAction}
          </Box>
        )}
      </Box>
      <CardTextsBox size={size} heading={heading} tag={tag} subHeading={subHeading} description={description} />
      {bottomAction && <Box mt={3}>{bottomAction}</Box>}
    </Box>
  );
};

export default Card;
