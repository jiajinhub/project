import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form } from 'reactstrap';
import { useForm } from 'react-hook-form';

export interface IToggleThemeProps {
  showModal: boolean;
  updateError: boolean;
  handleUpdate: (id: number, email: string, password: string,hasdarktheme: boolean) => void;
  handleClose: () => void;
}

const ThemeUpdateModal = (props: IToggleThemeProps) => {
  const updateTheme = ({id, email, password, hasdarktheme }) => {
    props.handleUpdate(id, email, password, hasdarktheme);
  };

  const {
    handleSubmit,
  } = useForm({ mode: 'onTouched' });

  const { updateError, handleClose } = props;

  const handleUpdateSubmit = e => {
    handleSubmit(updateTheme)(e);
  };

  return (
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="theme-page" autoFocus={false} >
      <Form onSubmit={handleUpdateSubmit}>
        <ModalHeader id="login-title" data-cy="loginTitle" toggle={handleClose} className='component'>
         Confirm deletion
        </ModalHeader>
        <ModalBody className='component'>
          <Row>
            <Col md="12">
              {updateError ? (
                <Alert color="danger" data-cy="themeError">
                  <strong>Failed to update theme!</strong>
                </Alert>
              ) : null}
            </Col>
          </Row>

          <Row>
            <Col md="12">
              Please confirm if you would like to update your application theme. 
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='component'>
          <Button color="secondary" onClick={handleClose} tabIndex={1}>
            Cancel
          </Button>{' '}
          <Button color="primary" type="submit" data-cy="submit">
            Confirm
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ThemeUpdateModal;
