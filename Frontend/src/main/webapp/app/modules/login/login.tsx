import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { AccountDataType, authenticate, getAccount } from './login.reducer';
import FormInputText from 'app/shared/common/form-input-text';
import FormInputButton from 'app/shared/common/form-input-button';
import { Alert } from 'reactstrap';
import LandingBanner from 'app/modules/account/landingBanner/LandingBanner';

export const Login = () => {
  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
  //const isAuthenticated = false;
  const loginError = useAppSelector(state => state.account.loginError);
  // const isLogin = useAppSelector(state => state.account.isLogin);
  const showModalLogin = useAppSelector(state => state.account.showModalLogin);
  // const [showModal, setShowModal] = useState(showModalLogin);
  //const navigate = useNavigate();
  const pageLocation = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    dispatch(getAccount({ controller })); //for debug remove last
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log('wat is in isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  //handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handle submit button clicked!'); //for debug remove last
    console.log('Wat is in formData: ', formData); //for debug remove last

    //userId: 1, email: 'example@example.com', password: 'securepassword'
    const auth: AccountDataType = {
      email: formData.email, //email
      password: formData.password, //password
    };
    console.log('🚀 ~ handleLogin ~ auth:', auth);
    dispatch(authenticate({ auth, controller }));
  };

  //for debug remove last
  //TEMPORARY BUTTON STYLE FOR CREATE BUTTON*********************
  // const customStyle: React.CSSProperties = {
  //   backgroundColor: 'Green',
  //   color: 'white',
  //   border: 'none',
  //   borderRadius: '5px',
  //   padding: '5px 5px',
  //   cursor: 'pointer',
  // };

  const { from } = pageLocation.state || { from: { pathname: '/', search: pageLocation.search } };
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  return (
    <>
      <div>
        <div className="container">
          <LandingBanner />
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="pad-75">
                <h1>Login</h1>
                <p></p>
                <FormInputText value={formData.email} onChange={handleChange} placeholder={'Email Address'} name={'email'} />
                <p></p>
                <FormInputText
                  type={'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={'Password'}
                  name={'password'}
                />
                <p></p>
                {loginError ? (
                  <Alert color="danger" data-cy="loginError">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </Alert>
                ) : null}
                <FormInputButton type={'submit'} id={'submitButton'} label={'Sign In'} className={'btn-green'} />
                <div style={{ paddingTop: '1rem' }} >
                  <Link className="loginWords" to="/account/reset/request" data-cy="forgetYourPasswordSelector">
                    Forget password?
                  </Link>
                </div>
                <div className="pad-50">
                  <span className="loginWords">You don&apos;t have an account yet?</span> <Link className="loginWords" to="/account/register">Sign up Here!</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
