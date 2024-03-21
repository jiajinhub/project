import React from 'react';
import { ChangeEvent } from 'react';
import { Row } from 'reactstrap';

interface FormInputTextProps {
  label?: string;
  value: string;
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInputText = (props: FormInputTextProps) => {
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   props.onChange(e.target.value);
  // };

  return (
    <label>
      {props.label}
      <Row>
        <input type="text" value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name} />
      </Row>
    </label>
  );
};

export default FormInputText;
