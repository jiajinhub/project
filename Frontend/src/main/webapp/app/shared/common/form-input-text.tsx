import React from 'react';
import { ChangeEvent } from 'react';
import { Row } from 'reactstrap';

interface FormInputTextProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const FormInputText = (props: FormInputTextProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <label>
      {props.label}
      <Row>
        <input type="text" value={props.value} onChange={handleChange} placeholder={props.placeholder} />
      </Row>
    </label>
  );
};

export default FormInputText;
