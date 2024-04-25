import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { RegisterDataType, insertAccount, reset } from './register.reducer';
import FormInputText from 'app/shared/common/form-input-text';
import FormInputButton from 'app/shared/common/form-input-button';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import LandingBanner from 'app/modules/account/landingBanner/LandingBanner';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const registrationSuccess = useAppSelector(state => state.register.registrationSuccess);
  const registrationErrorMsg = useAppSelector(state => state.register.errorMessage);
  const [regStr, setRegStr] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    password: '',
    hasdarktheme: false, //hardcode to default, upon user signup is on light theme
    newPassword: '',
    reTypePassword: '',
  });

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  //handle change for textbox and textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handle submit button clicked!'); //for debug remove last
    console.log('Wat is in formData: ', formData); //for debug remove last

    //check if newpassword and retypepassword is same else reject
    if (formData.newPassword === formData.reTypePassword) {
      setFormData(prevFormData => ({
        ...prevFormData,
        password: prevFormData.newPassword,
      }));
    } else {
      toast.error('Rejected');
      setRegStr('Password combination does not match.');
    }
  };

  const handleAlerts = () => {
    return (
        <Alert color="success">
          <strong>Registration Successful!</strong>
          <p>Your account has been created.</p>
          <div className="d-flex justify-content-end mt-2">
            <Button color="primary" size="sm" onClick={() => navToLogin()}>Log In</Button>
          </div>
        </Alert>
      );
  }

  const navToLogin = () => {
    navigate('/login');
  }

  //after register success, navigate to /login
  useEffect(() => {
    if (registrationSuccess) {
//       alert('registered successfully!!!!');
      handleAlerts();
//       toast.success("Successfully registered!");
//       navToLogin();
    }
    if (registrationErrorMsg) {
      const convertRegStr = JSON.stringify(registrationErrorMsg);
      setRegStr(registrationErrorMsg);
      setFormData(prevFormData => ({
        ...prevFormData,
        password: '',
      }));
    }
  }, [registrationSuccess, registrationErrorMsg]);

  useEffect(() => {
    console.log('Wat is in formData.password after change: ', formData.password); //for debug remove last
    if (formData.password != '') {
      const data: RegisterDataType = {
        userId: '',
        email: formData.email,
        password: formData.password,
        hasdarktheme: formData.hasdarktheme,
      };
      dispatch(insertAccount({ data, controller }));
    }
  }, [formData.password]);

  return (
    <div>
      <div className="container">
        <LandingBanner />
        <div className="right">
          <div className="pad-50">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <br />
              <FormInputText value={formData.email} onChange={handleChange} placeholder={'Email Address'} name={'email'} />
              <br />
              <FormInputText
                type={'password'}
                value={formData.newPassword}
                onChange={handleChange}
                placeholder={'New Password'}
                name={'newPassword'}
              />
              <br />
              <FormInputText
                type={'password'}
                value={formData.reTypePassword}
                onChange={handleChange}
                placeholder={'Retype Password'}
                name={'reTypePassword'}
              />
              <br />
              <FormInputButton type={'submit'} id={'submitButton'} label={'Sign Up'} className={'btn-green'} />
              {/* {regStr && <Alert color="warning">{regStr}</Alert>} */}
              <br />
              {regStr && <span className="alert alert-danger">{regStr}</span>}
            </form>
            <div className="pad-50">
              <span className="loginWords">Already have an account?</span> <Link className="loginWords" to="/login">Log In Here!</Link>
            </div>
            {/* <FormInputButton type={'link'} id={'linktoLogin'} label={'Already have an account? Log In Here!'} link={'/login'} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
