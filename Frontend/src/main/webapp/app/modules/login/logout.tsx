import React, { useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { reset } from './login.reducer';
//import { logout } from 'app/shared/reducers/authentication';

export const Logout = () => {
  //const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
  const navigate = useNavigate();

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme','light');
    document.querySelector("nav").setAttribute('data-bs-theme','light');
    document.querySelector("nav").setAttribute('className', 'bg-light');
    document.querySelector("nav").setAttribute('class', 'bg-light navbar navbar-expand-md navbar-light fixed-top');
    // localStorage.setItem("selectedTheme", "light");
  }

  useLayoutEffect(() => {
    //dispatch(logout());
    //if (logoutUrl) {
    // window.location.href = logoutUrl;
    //}
    dispatch(reset());
    setLightMode();
  });

  useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated]);

  return (
    <div className="p-5">
      <h4 className="loginWords">Logged out successfully!</h4>
    </div>
  );
};

export default Logout;
