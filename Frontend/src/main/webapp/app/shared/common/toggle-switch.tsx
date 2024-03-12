// Switch.js
import React from 'react';
import { Label } from 'reactstrap';

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className="switch-container">
      <Label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider round"></span>
      </Label>
    </div>
  );
};

export default Switch;
