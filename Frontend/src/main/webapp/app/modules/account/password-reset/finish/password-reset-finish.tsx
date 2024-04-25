import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handlePasswordResetFinish, reset } from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LandingBanner from 'app/modules/account/landingBanner/LandingBanner';
import { AccountDataType } from '../password-reset.reducer';

export const PasswordResetFinishPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
//   const key = searchParams.get('key');
  const key = localStorage.getItem('email');

  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ newPassword }) => {
    const auth: AccountDataType = {
          email: key, //email
          password: newPassword, //password
        };
    console.log("key: " + key);
    console.log("newPassword: " + newPassword);
    dispatch(handlePasswordResetFinish({ auth }));
  }

  const updatePassword = event => setPassword(event.target.value);

  const getResetForm = () => {
    return (
      <ValidatedForm onSubmit={handleValidSubmit}>
        <ValidatedField
          className="loginWords"
          name="newPassword"
          label="New password"
          placeholder="New password"
          type="password"
          validate={{
            required: { value: true, message: 'Your password is required.' },
            minLength: { value: 4, message: 'Your password is required to be at least 4 characters.' },
            maxLength: { value: 50, message: 'Your password cannot be longer than 50 characters.' },
          }}
          onChange={updatePassword}
          data-cy="resetPassword"
        />
        <PasswordStrengthBar password={password} />
        <ValidatedField
          className="loginWords"
          name="confirmPassword"
          label="New password confirmation"
          placeholder="Confirm the new password"
          type="password"
          validate={{
            required: { value: true, message: 'Your confirmation password is required.' },
            minLength: { value: 4, message: 'Your confirmation password is required to be at least 4 characters.' },
            maxLength: { value: 50, message: 'Your confirmation password cannot be longer than 50 characters.' },
            validate: v => v === password || 'The password and its confirmation do not match!',
          }}
          data-cy="confirmResetPassword"
        />
        <Button color="success" type="submit" data-cy="submit">
          Validate new password
        </Button>
      </ValidatedForm>
    );
  };

  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      navigate('/login');
    }
  }, [successMessage]);

  return (
    <div>
      <div className="container">
        <LandingBanner />
        <div className="right">
          <div className="pad-50">
            <h1>Reset password</h1>
            <div>{ getResetForm() }</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// <div>{key ? getResetForm() : null}</div>

export default PasswordResetFinishPage;
