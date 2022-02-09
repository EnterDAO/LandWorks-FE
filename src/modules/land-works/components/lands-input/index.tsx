import { Input } from 'antd';

import './index.scss';

interface IProps {
  onInputChange: (event: any) => void;
  customClassName?: string;
}

export const LandsInput: React.FC<IProps> = ({ onInputChange, customClassName }) => {
  return <Input placeholder="1" className={`custom-lands-input ${customClassName}`} onChange={onInputChange} />;
};
