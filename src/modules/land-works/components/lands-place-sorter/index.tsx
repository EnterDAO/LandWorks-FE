import { SelectValue } from 'antd/lib/select';

import Select from 'components/antd/select';

import './index.scss';

const options = [
  {
    label: 'Decentraland',
    value: 1,
  },
];

interface ILandsPlaceSorterProps {
  onPlaceChange: (value: SelectValue) => void;
}
export const LandsPlaceSorter: React.FC<ILandsPlaceSorterProps> = ({ onPlaceChange }) => {
  return <Select options={options} disabled defaultValue="Decentraland" onChange={onPlaceChange}></Select>;
};
