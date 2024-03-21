import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { RegisterDataType, insertAccount, reset } from './register.reducer';
import FormInputText from 'app/shared/common/form-input-text';
import FormInputButton from 'app/shared/common/form-input-button';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const registrationSuccess = useAppSelector(state => state.register.registrationSuccess);

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

  //after register success, navigate to /login
  // useEffect(() => {
  //   if (registrationSuccess) {
  //     window.location.href = '/login';
  //   }
  // }, [registrationSuccess]);

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

  //for debug remove last
  //TEMPORARY BUTTON STYLE FOR CREATE BUTTON*********************
  const customStyle: React.CSSProperties = {
    backgroundColor: 'Green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p></p>
        <FormInputText value={formData.email} onChange={handleChange} placeholder={'Email Address'} name={'email'} />
        <p></p>
        <FormInputText value={formData.newPassword} onChange={handleChange} placeholder={'New Password'} name={'newPassword'} />
        <p></p>
        <FormInputText value={formData.reTypePassword} onChange={handleChange} placeholder={'Retype Password'} name={'reTypePassword'} />
        <p></p>
        <FormInputButton type={'submit'} id={'submitButton'} label={'Sign Up'} btnStyle={customStyle} />
      </form>
      <FormInputButton type={'link'} id={'linktoLogin'} label={'Already have an account? Log In Here!'} link={'/login'} />
    </div>
  );
};

export default RegisterPage;
