import React, { useState } from 'react';
import { Input } from 'antd';

import Icon from 'components/custom/icon';

import './index.scss';

type Iprops = {
  text: string;
};

const TableInput: React.FC<Iprops> = ({ text }) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [editedValue, setEditedValue] = useState<string>(text);
  const handleSave = () => {
    // TODO:: trigger some checks, SC interations ..
    setDisabled(true);
  };

  const handleChange = (e: any) => {
    setEditedValue(e.target.value);
  };

  const handleCancel = () => {
    setEditedValue(text);
    setDisabled(true);
  };

  return (
    <div className="operator">
      <Input
        placeholder="Operator Address"
        bordered={false}
        disabled={disabled}
        value={editedValue}
        style={{ color: '#5D8FF0' }}
        defaultValue={editedValue}
        onChange={handleChange}
      />
      {disabled ? (
        <button className="edit-btn" onClick={() => setDisabled(false)}>
          <Icon name="pencil-outlined" className="pencil-icon"></Icon>
        </button>
      ) : (
        <>
          <button className="edit-btn" onClick={handleSave}>
            <Icon name="check-circle-outlined" className="pencil-icon"></Icon>
          </button>
          <button className="edit-btn" onClick={handleCancel}>
            <Icon name="close-circle-outlined" className="pencil-icon"></Icon>
          </button>
        </>
      )}
    </div>
  );
};

export default TableInput;
