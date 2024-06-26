import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';

interface FormInputButtonProps {
  type: 'submit' | 'button' | 'link';
  alignmentClass?: string;
  id: string;
  name?: string;
  label: string;
  link?: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  btnStyle?: React.CSSProperties;
}

const FormInputButton = (props: FormInputButtonProps) => {
  return (
    <div className="pad-02">
    <Row>
      {props.type === 'link' && (
        <Link to={props.link} id={props.id} className={`btn ${props.className ? props.className : ''}`} style={props.btnStyle}>
          {props.label}
        </Link>
      )}
      {(props.type === 'button' || props.type === 'submit') && (
        <button
          type={props.type}
          className={`${props.className ? props.className : ''}`}
          id={props.id}
          name={props.name}
          onClick={props.onButtonClick}
          style={props.btnStyle}
        >
          {props.label}
        </button>
      )}
    </Row>
    </div>
  );
};

export default FormInputButton;
