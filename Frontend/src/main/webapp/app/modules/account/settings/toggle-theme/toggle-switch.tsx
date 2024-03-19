// Switch.js
import React, { useEffect, useState } from 'react';
import { Label } from 'reactstrap';
import ThemeUpdateModal from './toggle-theme-confirm-modal';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { UpdateAccountDataType, updateAcc } from '../settings.reducer';
import { useNavigate } from 'react-router-dom';


const Switch = () => {
  const loginUserDetails = useAppSelector(state => state.account.loginUserDetails);
  const hideModal = useAppSelector(state => state.settings.closeModal);
  const err = useAppSelector(state => state.settings.error);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const navigate = useNavigate();

  const handleUpdate = (userId, email, password, hasdarktheme) => {
    const user: UpdateAccountDataType = {
      userId: userId,
      email: email,
      password: password,
      hasdarktheme: hasdarktheme
    };
    console.log('🚀 ~ handleUpdate ~ updateuser:', user);
    dispatch(updateAcc({ data: user, controller }))
  };


  useEffect(() => {
    if (hideModal){
      handleClose();
    }
  }, [hideModal]);
  

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'dark');
    document.querySelector("nav").setAttribute('data-bs-theme', 'dark');
    document.querySelector("nav").setAttribute('className', 'bg-dark');
    document.querySelector("nav").setAttribute('class', 'bg-dark navbar navbar-expand-md navbar-dark fixed-top');
    document.querySelector("nav").setAttribute('class', 'bg-dark navbar navbar-expand-md navbar-dark fixed-top');
    // localStorage.setItem("selectedTheme", "dark");
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'light');
    document.querySelector("nav").setAttribute('data-bs-theme', 'light');
    document.querySelector("nav").setAttribute('className', 'bg-light');
    document.querySelector("nav").setAttribute('class', 'bg-light navbar navbar-expand-md navbar-light fixed-top');
    // localStorage.setItem("selectedTheme", "light");
  }

  // const selectedTheme = localStorage.getItem("selectedTheme");
  const isDarkTheme = loginUserDetails.hasdarktheme;
  console.log("what is the dark theme: " + isDarkTheme)

  if (isDarkTheme === false) {
    setLightMode();
  } else setDarkMode();

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
    setShowModal(true);
  }
  return (
    <div className="switch-container">
      Dark Theme:
      <Label className="switch">
        <input type="checkbox" onChange={toggleTheme} checked={isDarkTheme} />
        <span className="slider round">
        </span>
      </Label>
      {showModal && (
        <ThemeUpdateModal
          showModal={showModal}
          handleUpdate={() => handleUpdate(loginUserDetails.userId, loginUserDetails.email, loginUserDetails.password, !isDarkTheme)} 
          handleClose={handleClose}
          updateError={err}
        />
      )}
    </div>
  );
};

export default Switch;

