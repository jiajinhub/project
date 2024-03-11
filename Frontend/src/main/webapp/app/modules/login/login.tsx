import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';
//import { login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';
import { AccountDataType, authenticate, getAccount } from './login.reducer';

interface IAuthParams {
  email: string;
  password: string;
  //rememberMe?: boolean;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
  //const isAuthenticated = false;
  const loginError = useAppSelector(state => state.account.loginError);
  const isLogin = useAppSelector(state => state.account.isLogin);
  const showModalLogin = useAppSelector(state => state.account.showModalLogin);
  const [showModal, setShowModal] = useState(showModalLogin);
  const navigate = useNavigate();
  const pageLocation = useLocation();

  useEffect(() => {
    setShowModal(true);
    dispatch(getAccount({ controller })); //for debug remove last
  }, []);

  //const handleLogin = (username, password, rememberMe = false) => dispatch(login(username, password, rememberMe));
  const handleLogin = (email, password, rememberMe = false) => {
    //for debug remove last
    //userId: 1, email: 'example1@example.com', password: 'password124'
    const auth: AccountDataType = {
      email: 'example1@example.com', //email
      password: 'password124', //password
    };
    console.log('🚀 ~ handleLogin ~ auth:', auth);
    dispatch(authenticate({ auth, controller }));
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  useEffect(() => {
    console.log('wat is in isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const { from } = pageLocation.state || { from: { pathname: '/', search: pageLocation.search } };
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  return <LoginModal showModal={showModal} handleLogin={handleLogin} handleClose={handleClose} loginError={loginError} />;
};

export default Login;
