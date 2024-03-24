import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { updateAcc, reset, UpdateAccountDataType } from '../password/password.reducer';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataType, getAccountById } from 'app/modules/login/login.reducer';
import { useForm } from 'react-hook-form';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const loginUserDetails = useAppSelector(state => state.account.loginUserDetails);
  const controller = new AbortController();
  const updatedDetails = useAppSelector(state => state.password.updatedDetails)
  const updateErr = useAppSelector(state => state.password.error)
  const [isFormSubmitted, setFormIsSubmitted] = useState(false);


  // const handleValidSubmit = ({ newPassword }) => {
  //   dispatch(savePassword({ newPassword }));
  // };

  // const handleValidSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = getValues(); // Assuming getValues returns an object with form field values

  //   // Check if the new password is the same as the existing password
  //   if (newPassword === password) {
  //     // Passwords match, proceed with form submission
  //     setPasswordsMatch(true);
  //     // Call your update function here
  //     // updatePassword(newPassword);
  //   } else {
  //     // Passwords don't match, display error
  //     setPasswordsMatch(false);
  //   }
  // };


  const userID: UserDataType = {
    userID: loginUserDetails.userId
  }

  useEffect(() => {
    if (updatedDetails && !updateErr && isFormSubmitted) {
      console.log("TRIGGERED password update")
      console.log(updatedDetails);
      console.log(updateErr);

      dispatch(getAccountById({userID, controller}));

      toast.success('Your password has been updated successfully!');
      setFormIsSubmitted(false);      
    }
  }, [updatedDetails]);


  const handleUpdate = (password) => {
    const user: UpdateAccountDataType = {
      userId: loginUserDetails.userId,
      email: loginUserDetails.email,
      password: password,
      hasdarktheme: loginUserDetails.hasdarktheme
    };
    console.log('🚀 ~ handleUpdate ~ updateuser:', user);
    dispatch(updateAcc({ data: user, controller }))
  };

  const handleValidSubmit = (data) => {
    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;
    const confirmPassword = data.confirmPassword;


    if (currentPassword === loginUserDetails.password) {
      if (newPassword === confirmPassword) {
        handleUpdate(newPassword);
        setFormIsSubmitted(true);      

      }
      else toast.error('Your new passwords are mismatched. Please re-enter your new password.')
    }
    else {
      toast.error('Current password is incorrect.')
    }
  }

  const updatePassword = event => setPassword(event.target.value);


  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">
            <strong>Change Password</strong>
          </h2>
          <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="currentPassword"
              label="Current password"
              placeholder="Current password"
              type="password"
              validate={{
                required: { value: true, message: 'Your password is required.' },
              }}
              data-cy="currentPassword"
            />
            <ValidatedField
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
              data-cy="newPassword"
            />
            <ValidatedField
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
              data-cy="confirmPassword"
            />
            <Button color="success" type="submit" data-cy="submit">
              Save
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
      {/* for reset password if have time */}
      {/* <br/>
      <Row className="justify-content-center">
        <Col md="8">
          <Link to={'/account/reset/request'} id={'linktoreset'}>
            Forgot Your Password?
          </Link>
        </Col>
      </Row> */}
    </div>
  );
};

