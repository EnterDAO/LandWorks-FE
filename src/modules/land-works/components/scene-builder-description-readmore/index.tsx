import { FC, useState } from 'react';
import { styled } from '@mui/system';

import { THEME_COLORS } from 'themes/theme-constants';

interface Props {
  children: string;
  onExpand: () => void;
}

const StyledSpan = styled('span')({
  color: THEME_COLORS.light,
  cursor: 'pointer',
});
export const ReadMore: FC<Props> = ({ children, onExpand }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
    onExpand();
  };
  return (
    <p>
      {isReadMore ? text.slice(0, 200) : text}
      <StyledSpan onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </StyledSpan>
    </p>
  );
};
