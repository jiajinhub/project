// Switch.js
import { useAppSelector } from 'app/config/store';
import React from 'react';
import { Label } from 'reactstrap';

const Switch = () => {
  const loginUserDetails = useAppSelector(state => state.account.loginUserDetails);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme','dark');
    document.querySelector("nav").setAttribute('data-bs-theme','dark');
    document.querySelector("nav").setAttribute('className', 'bg-dark');
    document.querySelector("nav").setAttribute('class', 'bg-dark navbar navbar-expand-md navbar-dark fixed-top');
    document.querySelector("nav").setAttribute('class', 'bg-dark navbar navbar-expand-md navbar-dark fixed-top');
    // localStorage.setItem("selectedTheme", "dark");
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme','light');
    document.querySelector("nav").setAttribute('data-bs-theme','light');
    document.querySelector("nav").setAttribute('className', 'bg-light');
    document.querySelector("nav").setAttribute('class', 'bg-light navbar navbar-expand-md navbar-light fixed-top');
    // localStorage.setItem("selectedTheme", "light");
  }

  // const selectedTheme = localStorage.getItem("selectedTheme");
  const isDarkTheme = loginUserDetails.hasdarktheme;
  console.log("what is the dark theme: " + isDarkTheme)

  if (isDarkTheme === false){
    setLightMode();
  } else setDarkMode();

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  }
  return (
    <div className="switch-container">
      Dark Theme:  
      <Label className="switch">
        <input type="checkbox" onChange={toggleTheme} defaultChecked={isDarkTheme === true}/>
        <span className="slider round">
        </span>
      </Label>
    </div>
  );
};

export default Switch;
