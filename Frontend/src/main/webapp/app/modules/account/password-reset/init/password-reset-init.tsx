import React, { useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Button, Alert, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LandingBanner from 'app/modules/account/landingBanner/LandingBanner';
import { Link, useNavigate } from 'react-router-dom';

export const PasswordResetInit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ email }) => {
    dispatch(handlePasswordResetInit(email));
  };

  const successMessage = useAppSelector(state => state.passwordReset.initSuccessMessage);

  useEffect(() => {
    if (successMessage) {
//       toast.success(successMessage);
      navigate('/account/reset/finish');
    }
  }, [successMessage]);

  return (
    <div>
      <div className="container">
        <LandingBanner />
        <div className="right">
          <div className="pad-50">
            <h1>Reset your password</h1>
            <Alert color="warning">
              <p className="loginWords">Enter the email address you used to register</p>
            </Alert>
            <ValidatedForm onSubmit={handleValidSubmit}>
              <ValidatedField
                className="loginWords"
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
                data-cy="emailResetPassword"
              />
              <Button color="primary" type="submit" data-cy="submit">
                Reset password
              </Button>
            </ValidatedForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetInit;
