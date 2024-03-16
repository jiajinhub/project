// Switch.js
import React from 'react';
import { Label } from 'reactstrap';

const Switch = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme','dark');
    document.querySelector("nav").setAttribute('data-bs-theme','dark');
    document.querySelector("nav").setAttribute('className', 'bg-dark');
    document.querySelector("nav").setAttribute('class', 'bg-dark navbar navbar-expand-md navbar-dark fixed-top');
    document.querySelector("nav").setAttribute('class', 'bg-dark navbar navbar-expand-md navbar-dark fixed-top');
    localStorage.setItem("selectedTheme", "dark");
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme','light');
    document.querySelector("nav").setAttribute('data-bs-theme','light');
    document.querySelector("nav").setAttribute('className', 'bg-light');
    document.querySelector("nav").setAttribute('class', 'bg-light navbar navbar-expand-md navbar-light fixed-top');
    localStorage.setItem("selectedTheme", "light");
  }

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark"){
    setDarkMode();
  } else setLightMode();

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  }
  return (
    <div className="switch-container">
      Dark Theme:  
      <Label className="switch">
        <input type="checkbox" onChange={toggleTheme} defaultChecked={selectedTheme === "dark"}/>
        <span className="slider round">
        </span>
      </Label>
    </div>
  );
};

export default Switch;
