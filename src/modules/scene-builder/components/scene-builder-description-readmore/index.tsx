import { FC, Fragment, useState } from 'react';
import { styled } from '@mui/system';

interface Props {
  children: string;
}

const StyledSpan = styled('span')({
  color: 'var(--theme-light-color)',
  cursor: 'pointer',
  textDecoration: 'underline',
});

export const ReadMore: FC<Props> = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p>
      {isReadMore
        ? text.slice(0, 180)
        : text.split('/n').map((desc, index) => (
            <Fragment key={index}>
              <p key={index}>{desc}</p>
              <br />
            </Fragment>
          ))}
      <StyledSpan onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </StyledSpan>
    </p>
  );
};
