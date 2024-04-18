import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { API_LIST, API_URL, API_UPDATE } from 'app/config/constants/api-endpoints';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useParams  } from 'react-router-dom';
import { Modal } from 'reactstrap';

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
  const [priceValue, setPriceData] = useState(false);
  const [quantityValue, setQuantityData] = useState(false);
  const [listProd, setProdList] = useState('');
  const [itemUpdated, setItemUpdated] = useState(false);
  const [update, updated] = useState(false);
  const [N, setN] = useState('');
  useEffect(() => {
    item();
  }, []);

  const item = async () => {
    try {
      const val = await fetch(`${API_URL}product/${productId}`);
      const v1 = await val.json();
      setData(v1);
      setName(v1.name);
      setPrice(v1.price);
      setCategory(v1.category);
      setQuantity(v1.quantity);
      setExpiryDate(v1.expiryDate);
      setNutriGrade(v1.nutriGrade);
      setDescription(v1.description);
      setSelectedDate(v1.expiryDate);
      setList(v1.listId);
      setPriceData(true);
      setQuantityData(true);
      const prod = v1.listId;
       const option = { list_id: prod };
       const r = await fetch(`${API_URL}${API_LIST}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(option)
       });
       if (!r.ok) {
         throw new Error('Not ok');
       }
       const List = await r.json();
       const list = List.name;
        setProdList(list);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const openModal = () => {
    const num = /^[0-9]+$/;
    if (!num.test(quantity)) {
      setN('Please enter a number');
      return;
    } else {
      setopen(true);
    }
  };

  const closeModal = () => {
    updated(false)
  };

  const close = () => {
    setopen(false);
  };

  const prodPrice = (event) => {
    setPrice(event.target.value);
  };

  const prodCat = (event) => {
    setCategory(event.target.value);
  };

  const prodQuantity = (event) => {
    const num = /^[0-9]+$/;
    if (!num.test(quantity)) {
      setN('');
    }
    setQuantity(event.target.value);
  };

  const prodNG = (event) => {
    setNutriGrade(event.target.value);
  };

  const prodDes = (event) => {
    setDescription(event.target.value);
  };

  const prodDate = (date: Date | null) => {
    setSelectedDate(date);
  };

  const edit = (e) => {
    data.name = name;
    data.price = price;
    data.category = cat;
    data.quantity = quantity;
    data.nutriGrade = ng;
    data.description = des;
    data.expiryDate = selectedDate;
    axios.post(`${API_URL}${API_UPDATE}`, data);
    setopen(false);
    setItemUpdated(true);
    updated(true);
  };

  const expiry = (ed) => {
    const currentDate = new Date();
    return currentDate > new Date(ed);
  };

  return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
              <h2 id="view">
                {listProd} / {name} {expiry(ed) && <span style={{ color: 'red', fontSize: '17px' }}>Expired</span>}
              </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <ValidatedForm id="view" onSubmit={openModal}>
              <label>Category</label>
              <br/>
              <select value={cat} onChange={prodCat}>
                <option>Drinks</option>
                <option>Household Items</option>
                <option>Perishable</option>
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
                onChange={prodPrice}
              />)}
               {quantityValue && (
              <ValidatedField
                id="viewQuantity"
                name="viewQuantity"
                label="Quantity"
                data-cy="viewQuantity"
                value={quantity}
                onChange={prodQuantity}
                validate={{required: 'please include quantity',}}
                required
              />)}
              {N && (<div style={{ color: 'red',fontSize: '12px'}}>Please enter a number</div>)}
              <label>Expiry Date </label>
              <br/>
              <DatePicker id="Expiry Date" selected={selectedDate} onChange={prodDate} dateFormat="yyyy-MM-dd"/>
              <br/><br/>
              <ValidatedField
                id="viewNG"
                name="viewNG"
                label="NutriGrade"
                data-cy="viewNG"
                value={ng}
                onChange={prodNG}
              />
              <ValidatedField
                id="viewDescription"
                name="viewDescription"
                label="Description / Remarks"
                data-cy="viewDescription"
                value={des}
                onChange={prodDes}
              />
              <div style={{ display: 'flex'}}>
                <button id="search">
                  Update
                </button>
                <Modal isOpen={open}>
                  <p>Do you want to save?</p>
                  <button onClick={edit}>Yes</button>
                  <button onClick={close}>No</button>
                </Modal>
                <Modal isOpen={update}>
                  {itemUpdated &&
                   <div>
                     <p style={{ marginLeft: '20px' }}>Updated successfully!</p>
                     <button onClick={closeModal} style={{ margin: '0 auto', display: 'block', marginBottom: '10px' }}> Ok </button>
                   </div>}
                </Modal>
                <div>
                  <Link to={`/product`} className="btn btn-secondary" style={{ textDecoration: 'none' border: '1px solid', color: '#000', background: 'transparent', marginLeft: '10px'}}>Cancel</Link>
                </div>
              </div>
            </ValidatedForm>
          </Col>
        </Row>
      </div>
  );
};

export default Update;
