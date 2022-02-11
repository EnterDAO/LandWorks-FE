import { Radio, RadioChangeEvent } from 'antd';

import './index.scss';

interface IAvailableSorterProps {
  onAvailableChange: (e: RadioChangeEvent) => void;
  availableOnly: boolean;
  text: string;
}
export const LandsAvailableSorter: React.FC<IAvailableSorterProps> = ({ onAvailableChange, availableOnly, text }) => {
  return (
    <div
      className="available-sort-wrapper"
      onClick={() => onAvailableChange({ target: { checked: !availableOnly } } as RadioChangeEvent)}
    >
      <Radio checked={availableOnly} onChange={onAvailableChange}></Radio>
      <span className="label">{text}</span>
    </div>
  );
};
