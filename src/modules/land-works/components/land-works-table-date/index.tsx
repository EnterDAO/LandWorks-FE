import { timestampSecondsToDate } from 'helpers/helpers';

import '../land-works-card-history/index.scss';

interface ILandWorksTableDateProps {
  timestamp: string;
  dateFormat: string;
}
const LandWorksTableDate: React.FC<ILandWorksTableDateProps> = ({ timestamp, dateFormat }) => {
  const fullDate = timestampSecondsToDate(timestamp, dateFormat);
  const utc = fullDate.substring(fullDate.length - 6);
  const date = fullDate.substring(0, fullDate.length - 6);

  return (
    <div className="timezone">
      {date} <span>{utc}</span>
    </div>
  );
};

export default LandWorksTableDate;
