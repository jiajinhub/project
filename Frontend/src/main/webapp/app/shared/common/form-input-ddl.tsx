import React, { ChangeEvent } from 'react';
import { Row, Col } from 'reactstrap';

interface Option {
  value: string;
  label: string;
}

interface FormInputDDLProps {
  label: string;
  value: string;
  name: string;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FormInputDDL = (props: FormInputDDLProps) => {
  return (
    <div>
      <label style={{ marginLeft: '30px' }}>
        {props.label}
      </label>
      <div style={{ marginLeft: '40px' }}>
        <Row style={{ width: '30%'}}>
            <select value={props.value} onChange={props.onChange} name={props.name}>
              {props.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
        </Row>
      </div>
    </div>
  );
};

export default FormInputDDL;
