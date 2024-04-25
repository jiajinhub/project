import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { reset } from './settings.reducer';
import { Link } from 'react-router-dom';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const loginUserDetails = useAppSelector(state => state.account.loginUserDetails);
  const successMessage = useAppSelector(state => state.settings.successMessage);

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
        <h1>Settings</h1>
        <div style={{ height: '20px' }}></div>
        <Row>Email: {loginUserDetails.email}</Row>
        <br />
        <Row>
          <Link to={'/account/password'} id={'linktoupdate'} style={{ 'marginLeft': '0px', 'paddingLeft': '0px', 'borderLeft': '0px' }}>
            Change Password
          </Link>
        </Row>
      </Row>
    </div>
  );
};

export default SettingsPage;
