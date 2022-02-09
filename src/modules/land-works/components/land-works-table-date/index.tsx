import { timestampSecondsToDate } from 'helpers/helpers';

interface ILandWorksTableDateProps {
  timestamp: string;
  dateFormat: string;
}
const LandWorksTableDate: React.FC<ILandWorksTableDateProps> = ({ timestamp, dateFormat }) => {
  return <p>{timestampSecondsToDate(timestamp, dateFormat)}</p>;
};

export default LandWorksTableDate;
