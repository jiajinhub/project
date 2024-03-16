import FormInputButton from 'app/shared/common/form-input-button';
import CustomDatePicker from 'app/shared/common/form-input-datepicker';
import FormInputDDL from 'app/shared/common/form-input-ddl';
import FormInputText from 'app/shared/common/form-input-text';
import FormInputTextArea from 'app/shared/common/form-input-textArea';
import React, { useState } from 'react';
import { Button, Row } from 'reactstrap';

export const CreateProduct = () => {
  //for ddl
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [value, setValue] = React.useState('fruit');

  const handleChange = event => {
    setValue(event.target.value);
  };

  //for textbox
  const [name, setName] = useState('');
  const handleNameChange = (value: string) => {
    setName(value);
  };
  const [price, setPrice] = useState('');
  const handlePriceChange = (value: string) => {
    setPrice(value);
  };
  const [qty, setQty] = useState('');
  const handleQtyChange = (value: string) => {
    setQty(value);
  };

  //for datepicker
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  //for textarea
  const [text, setText] = useState('');

  const handleChangetextarea = (value: string) => {
    setText(value);
  };

  //button
  const handleButtonClick = () => {
    console.log('create button clicked!');
  };

  return (
    <div>
      <h1>Add Inventory</h1>
      <Row>
        <FormInputText label="Title" value={name} onChange={handleNameChange} placeholder={'Name'} />
        <FormInputDDL label="Select an option" options={options} value={value} onChange={handleChange} />
      </Row>
      <Row>
        <FormInputText label="Price" value={price} onChange={handlePriceChange} placeholder={'$SGD'} />
        <FormInputText label="Quantity" value={qty} onChange={handleQtyChange} />
      </Row>
      <Row>
        <CustomDatePicker
          label={'ExpiryDate'}
          selectedDate={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
        <FormInputTextArea label={'Remarks'} value={text} onChange={handleChangetextarea} placeholder="Enter text..." />
        <FormInputButton type={'button'} id={'cpButton'} label={'create'} onButtonClick={handleButtonClick} />
      </Row>
    </div>
  );
};

export default CreateProduct;
