import React, { useEffect, useState} from 'react';
import { Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { saveAccountSettings, reset } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
  const loginUserDetails = useAppSelector(state => state.account.loginUserDetails);
  const successMessage = useAppSelector(state => state.settings.successMessage);
 // const user = useAppSelector(state => state.userDetails);


  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div className="component">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            Settings
          </h2>
          {/* <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="First Name"
              id="firstName"
              placeholder="Your first name"
              validate={{
                required: { value: true, message: 'Your first name is required.' },
                minLength: { value: 1, message: 'Your first name is required to be at least 1 character' },
                maxLength: { value: 50, message: 'Your first name cannot be longer than 50 characters' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Last Name"
              id="lastName"
              placeholder="Your last name"
              validate={{
                required: { value: true, message: 'Your last name is required.' },
                minLength: { value: 1, message: 'Your last name is required to be at least 1 character' },
                maxLength: { value: 50, message: 'Your last name cannot be longer than 50 characters' },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
              validate={{
                required: { value: true, message: 'Your email is required.' },
                minLength: { value: 5, message: 'Your email is required to be at least 5 characters.' },
                maxLength: { value: 254, message: 'Your email cannot be longer than 50 characters.' },
                validate: v => isEmail(v) || 'Your email is invalid.',
              }}
              data-cy="email"
            />
            <Button color="primary" type="submit" data-cy="submit">
              Save
            </Button>
          </ValidatedForm> */}
          <Row>Email: </Row>
          <Row>{loginUserDetails.email}</Row>

          <br/><br/>
          <Row>Change Password</Row>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
