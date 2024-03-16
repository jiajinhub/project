import React, { ChangeEvent } from 'react';
import { Row } from 'reactstrap';

interface FormInputTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  label: string;
}

const FormInputTextArea = (props: FormInputTextAreaProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <label>
      {props.label}
      <Row>
        <textarea value={props.value} onChange={handleChange} placeholder={props.placeholder} rows={props.rows} cols={props.cols} />
      </Row>
    </label>
  );
};

export default FormInputTextArea;
