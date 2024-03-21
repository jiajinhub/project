import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'app/config/store';
import { reset } from './register.reducer';
import FormInputText from 'app/shared/common/form-input-text';
import FormInputButton from 'app/shared/common/form-input-button';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const controller = new AbortController();

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
      toast.success('registered successfully!!!!');
      setFormData(prevFormData => ({
        ...prevFormData,
        password: prevFormData.newPassword,
      }));
      //dispatch first then success then nagivate to login
      // window.location.href = '/login'; ///navigate to login
      //OR do another success page then ask user to click
    } else {
      toast.error('resubmit your password combination does not match please try again!');
    }
  };

  //for debug remove last
  //TEMPORARY BUTTON STYLE FOR CREATE BUTTON*********************
  const customStyle: React.CSSProperties = {
    backgroundColor: 'Green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <br />
        <FormInputText value={formData.email} onChange={handleChange} placeholder={'Email Address'} name={'email'} />
        <br />
        <FormInputText value={formData.newPassword} onChange={handleChange} placeholder={'New Password'} name={'newPassword'} />
        <br />
        <FormInputText value={formData.reTypePassword} onChange={handleChange} placeholder={'reTypePassword'} name={'reTypePassword'} />
        <br />
        <FormInputButton type={'submit'} id={'submitButton'} label={'Sign Up'} btnStyle={customStyle} />
      </form>
    </div>
  );
};

export default RegisterPage;
