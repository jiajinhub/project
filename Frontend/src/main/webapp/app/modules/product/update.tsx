import React, { useEffect, useState, useRef } from 'react';
// import DatePicker from 'react-date-picker';
// import DatePicker from './DatePicker.js';
import { Row, Col, Alert } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useParams  } from 'react-router-dom';
import {Modal,Button} from 'reactstrap';
// import { DropdownMenu, DropdownItem, ButtonDropdown} from 'reactstrap';
// import { Dropdown } from '@thumbtack/thumbprint-react';
// import NavigateButton from './NavigateButton';

export const Update = () => {

  const {productId} = useParams();
  const [data, setData] = useState(null);
  const [open, setopen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cat, setCategory] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [ed, setExpiryDate] = useState(null);
  const [ng, setNutriGrade] = useState('');
  const [des, setDescription] = useState('');

  const [list, setList] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [renderCount, setRenderCount] = useState(0);
  const [priceValue, setPriceData] = useState(false);
  const [quantityValue, setQuantityData] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/${productId}`);
      const data = await response.json();
      setData(data);
      setName(data.name);
      setPrice(data.price);
      setCategory(data.category);
      setQuantity(data.quantity);
      setExpiryDate(data.expiryDate);
      setNutriGrade(data.nutriGrade);
      setDescription(data.description);
      setSelectedDate(data.expiryDate);
      setList(data.listId);
      setPriceData(true);
      setQuantityData(true);
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const openModal = () => {
    setopen(true);
  };

  const close = () => {
    setopen(false);
  };


  const handleNameChange = (event) => {
      setName(event.target.value);
    };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleEPChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleNGChange = (event) => {
    setNutriGrade(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const edit = (e) => {
    const prod = {name,price,cat};
    data.name = name;
    data.price = price;
    data.category = cat;
    data.quantity = quantity;
    data.nutriGrade = ng;
    data.description = des;
    data.expiryDate = selectedDate;
    axios.post(`http://localhost:8080/product/updateProduct`, data)
       .then(res => console.log(res);
    setopen(false);
  };

  const isExpired = (ed) => {
    const currentDate = new Date();
    return currentDate > new Date(ed);
  };

  return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
              <h2 id="view">
                {list} / {name} {isExpired(ed) && <span style={{ color: 'red', fontSize: '17px' }}>Expired</span>}
              </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <ValidatedForm id="view" onSubmit={openModal}>
              <label>Category</label>
              <br/>
              <select value={cat} onChange={handleCategoryChange}>
                <option>Fruit</option>
                <option>Food</option>
                <option>Drink</option>
                <option>Soap and Detergent</option>
                <option>Others</option>
              </select>
              <br/><br/>
               {priceValue && (
              <ValidatedField
                id="viewPrice"
                name="viewPrice"
                label="Price"
                data-cy="viewPrice"
                value={price}
                required
                validate={{ required: 'please include price', }}
                onChange={handlePriceChange}
              />)}
               {quantityValue && (
              <ValidatedField
                id="viewQuantity"
                name="viewQuantity"
                label="Quantity"
                data-cy="viewQuantity"
                value={quantity}
                onChange={handleQuantityChange}
                validate={{required: 'please include quantity',}}
                required
              />)}
              <label>Expiry Date </label>
              <br/>
              <DatePicker id="Expiry Date" selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd"/>
              <br/><br/>
              <ValidatedField
                id="viewNG"
                name="viewNG"
                label="NutriGrade"
                data-cy="viewNG"
                value={ng}
                onChange={handleNGChange}
              />
              <ValidatedField
                id="viewDescription"
                name="viewDescription"
                label="Description / Remarks"
                data-cy="viewDescription"
                value={des}
                onChange={handleDescriptionChange}
              />
              <Button id="search" className="button">
                Update
              </Button>
              <Modal isOpen={open}>
                <p>Do you want to save?</p>
                <button onClick={edit}>Yes</button>
                <button onClick={close}>No</button>
              </Modal>
              &nbsp;
              <Link to={`/product`} className="btn btn-blue">Cancel</Link>
            </ValidatedForm>
          </Col>
        </Row>
      </div>
  );
};

export default Update;
