import React from 'react';
import { Row } from 'reactstrap';

interface Option {
  value: string;
  label: string;
}

interface FormInputDDLProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormInputDDL = (props: FormInputDDLProps) => {
  return (
    <label>
      {props.label}
      <Row>
        <select value={props.value} onChange={props.onChange}>
          {props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Row>
    </label>
  );
};

export default FormInputDDL;
