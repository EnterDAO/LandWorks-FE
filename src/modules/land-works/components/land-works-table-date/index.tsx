import { timestampSecondsToDate } from 'helpers/helpers';

import { StyledLabel } from './styled';

interface ILandWorksTableDateProps {
  timestamp: string;
  dateFormat: string;
}
const LandWorksTableDate: React.FC<ILandWorksTableDateProps> = ({ timestamp, dateFormat }) => {
  const fullDate = timestampSecondsToDate(timestamp, dateFormat);
  const utc = fullDate.substring(fullDate.length - 6);
  const date = fullDate.substring(0, fullDate.length - 6);
  const slice = date.length - 6;

  const slicedDate = `${date.slice(0, slice)}${date.slice(slice, date.length)}`;

  return (
    <StyledLabel>
      {slicedDate} <span>{utc}</span>
    </StyledLabel>
  );
};

export default LandWorksTableDate;
