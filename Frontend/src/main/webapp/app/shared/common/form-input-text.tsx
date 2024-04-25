import React from 'react';
import { ChangeEvent } from 'react';
import { Row } from 'reactstrap';

interface FormInputTextProps {
  type?: string;
  label?: string;
  value: string;
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword?: string;
}

const FormInputText = (props: FormInputTextProps) => {
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   props.onChange(e.target.value);
  // };

  return (
    <div>
      <label>
        {props.label}
        <Row style={{ width: '30%'}}>
          <div className="pad-03">
            <input
              type={props.type}
              value={props.value}
              onChange={props.onChange}
              placeholder={props.placeholder}
              name={props.name}
              data-cy={props.type === 'password' ? 'password' : null}
            />
            {/* {props.type==='text' && (
            <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name}/>
            )}
            {props.type==='password' && (
            <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name} data-cy="password"/>
            )} */}
          </div>
        </Row>
      </label>
    </div>
  );
};

export default FormInputText;
