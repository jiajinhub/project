import { useAppDispatch, useAppSelector } from 'app/config/store';
import FormInputButton from 'app/shared/common/form-input-button';
import CustomDatePicker from 'app/shared/common/form-input-datepicker';
import FormInputDDL from 'app/shared/common/form-input-ddl';
import FormInputText from 'app/shared/common/form-input-text';
import FormInputTextArea from 'app/shared/common/form-input-textArea';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { CreateProductDataType, CreateProductReducerType, createProduct } from './create-product.reducer';

export const CreateProduct = () => {
  //TODO: Do code table for this category ***************************
  //for ddl Category
  const options = [
    {value: '', label:''},
    { value: 'Drinks', label: 'Drinks' },
    { value: 'Household Items', label: 'Household Items' },
    { value: 'Perishable', label: 'Perishable' },
  ];

  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const isCreated = useAppSelector(state => state.product.isCreated);
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');
  const [e1, setE1] = useState('');
  const [e2, setE2] = useState('');
  const [e3, setE3] = useState('');
  const [e4, setE4] = useState('');
  const [eN, setEN] = useState('');
  const [e5, setE5] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    expiryDate: null,
    description: '',
    nutriGrade: '',
    listId: localStorage.getItem('listID'),
  });

  //handle change for textbox and textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setE1('');
    setE3('');
    setE4('');
    setEN('');
  };

  //handle change for ddl select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      category,
    }));
    setE2('');
  };

  //handle datepicker change
  const handleDateChange = (date: Date | null) => {
    setFormData(prevState => ({
      ...prevState,
      expiryDate: date,
    }));
    setE5('');
  };

  //handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = /^[0-9]+$/;
    if (formData.name.trim() === '') {
      setE1('Name is required');
      return;
    }
    if (formData.category.trim() === '') {
      setE2('Category is required');
      return;
    }
    if (formData.price.trim() === '') {
      setE3('Price is required');
      return;
    }
    if (formData.quantity.trim() === '') {
      setE4('Quantity is required');
      return;
    } else if (!num.test(formData.quantity)) {
      setEN('Please enter a number');
      return;
    }
    if (formData.expiryDate === null) {
      setE5('ExpiryDate is required');
      return;
    }

    console.log('handle submit button clicked!'); //for debug remove last
    console.log('Wat is in formData: ', formData); //for debug remove last
    dispatch(createProduct({ data: formData as CreateProductDataType, controller }))
    .then(() => {
      navigate('/product');
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };

  useEffect(() => {
    if (isCreated) {
      console.log('product is created successfully!');
    }
  }, [isCreated]);

  //for debug remove last
  //TEMPORARY BUTTON STYLE FOR CREATE BUTTON*********************
  const customStyle: React.CSSProperties = {
    backgroundColor: '#D9C5B2',
    borderRadius: '10px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
    border: 'none',
    display: 'flex',
    height: '40px',
    width: '130px',
    right: '20px',
    position: 'absolute',
    padding: '5px 10px',
    alignItems: 'center',
    justifyContent: 'center',

  };

  return (
    <div>
      <h1 style={{ marginLeft: '30px', textAlign: 'left'}}>Add Inventory</h1>
      <form onSubmit={handleSubmit} style={{ marginLeft: '30px' }}>
        <Row className="justify-content-center">
          <FormInputText label="Title" value={formData.name} onChange={handleChange} placeholder={'Name'} name={'name'}/>
          {e1 && (<div style={{ color: 'red',fontSize: '12px',marginLeft: '60px'}}>Name is required</div>)}
          <FormInputDDL label="Category" options={options} value={formData.category} onChange={handleSelectChange} name={'category'}/>
          {e2 && (<div style={{ color: 'red',fontSize: '12px',marginLeft: '60px'}}>Category is required</div>)}
        </Row>
        <Row>
          <FormInputText label="Price" value={formData.price} onChange={handleChange} placeholder={'$SGD'} name={'price'} />
          {e3 && (<div style={{ color: 'red',fontSize:'12px',marginLeft: '30px'}}>Price is required</div>)}
          <FormInputText label="Quantity" value={formData.quantity} onChange={handleChange} name={'quantity'} />
          {e4 && (<div style={{ color: 'red',fontSize: '12px',marginLeft: '30px'}}>Quantity is required</div>)}
          {eN && (<div style={{ color: 'red',fontSize: '12px',marginLeft: '30px'}}>Please enter a number</div>)}
        </Row>
        <FormInputText label="NutriGrade" value={formData.nutriGrade} onChange={handleChange} name={'nutriGrade'} />
        <Row>
          <CustomDatePicker
            label={'ExpiryDate'}
            selectedDate={formData.expiryDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            name={'expiryDate'}
          />
          {e5 && (<div style={{ color: 'red', fontSize: '12px', marginLeft: '30px'}}>ExpiryDate is required</div>)}
          <div style={{ marginBottom: '10px' }}>
            <FormInputTextArea
              label={'Remarks'}
              value={formData.description}
              onChange={handleChange}
              placeholder="Short Description..."
              name={'description'}
            />
          </div>

          <FormInputButton type={'submit'} id={'submitButton'} label={'Create'} btnStyle={customStyle} />
        </Row>
      </form>
    </div>
  );
};

export default CreateProduct;
