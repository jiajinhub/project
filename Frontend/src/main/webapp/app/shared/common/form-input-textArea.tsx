import React, { ChangeEvent } from 'react';
import { Row } from 'reactstrap';

interface FormInputTextAreaProps {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  label: string;
}

const FormInputTextArea = (props: FormInputTextAreaProps) => {
  // const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   props.onChange(event.target.value);
  // };

  return (
    <div>
      <label>
        {props.label} </label>
      <div style={{ marginLeft: '12px' }}>
        <Row>
          <textarea
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            rows={props.rows}
            cols={props.cols}
            name={props.name}
          />
        </Row>
      </div>
    </div>
  );
};

export default FormInputTextArea;
