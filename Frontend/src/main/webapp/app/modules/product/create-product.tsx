import { useAppDispatch, useAppSelector } from 'app/config/store';
import FormInputButton from 'app/shared/common/form-input-button';
import CustomDatePicker from 'app/shared/common/form-input-datepicker';
import FormInputDDL from 'app/shared/common/form-input-ddl';
import FormInputText from 'app/shared/common/form-input-text';
import FormInputTextArea from 'app/shared/common/form-input-textArea';
import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import { CreateProductDataType, CreateProductReducerType, createProduct } from './create-product.reducer';

export const CreateProduct = () => {
  //TODO: Do code table for this category ***************************
  //for ddl Category
  const options = [
    { value: 'Food', label: 'Food' },
    { value: 'Soap and Detergent', label: 'Soap and Detergent' },
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Drinks', label: 'Drinks' },
  ];

  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const isCreated = useAppSelector(state => state.product.isCreated);
  const [value, setValue] = React.useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    expiryDate: null,
    description: '',
    nutriGrade: '',
    listId: 1, //hardcode currently, need to wait for grocery list to complete********************
  });

  //handle change for textbox and textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle change for ddl select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      category,
    }));
  };

  //handle datepicker change
  const handleDateChange = (date: Date | null) => {
    setFormData(prevState => ({
      ...prevState,
      expiryDate: date,
    }));
  };

  //handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handle submit button clicked!'); //for debug remove last
    console.log('Wat is in formData: ', formData); //for debug remove last
    dispatch(createProduct({ data: formData as CreateProductDataType, controller }));
  };

  useEffect(() => {
    if (isCreated) {
      console.log('product is created successfully!');
    }
  }, [isCreated]);

  //for debug remove last
  //TEMPORARY BUTTON STYLE FOR CREATE BUTTON*********************
  const customStyle: React.CSSProperties = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h1>Add Inventory</h1>
      <form onSubmit={handleSubmit}>
        <Row>
          <FormInputText label="Title" value={formData.name} onChange={handleChange} placeholder={'Name'} name={'name'} />
          <FormInputDDL label="Category" options={options} value={value} onChange={handleSelectChange} name={'category'} />
        </Row>
        <Row>
          <FormInputText label="Price" value={formData.price} onChange={handleChange} placeholder={'$SGD'} name={'price'} />
          <FormInputText label="Quantity" value={formData.quantity} onChange={handleChange} name={'quantity'} />
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
          <FormInputTextArea
            label={'Remarks'}
            value={formData.description}
            onChange={handleChange}
            placeholder="Short Description..."
            name={'description'}
          />
          <FormInputButton type={'submit'} id={'submitButton'} label={'create'} btnStyle={customStyle} />
        </Row>
      </form>
    </div>
  );
};

export default CreateProduct;
