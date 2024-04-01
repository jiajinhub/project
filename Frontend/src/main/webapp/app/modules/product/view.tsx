import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export const View = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [fetchDataFlag, setFetchDataFlag] = useState(false);
  const [name, nameInput] = useState('');
  const [price, priceInput] = useState('');
  const [cat, catInput] = useState('');
  const [quantity, quantityInput] = useState('');
  const [ed, edInput] = useState('');
  const [ng, ngInput] = useState('');
  const [des, desInput] = useState('');
  const {productId} = useParams();

  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  const isExpired = (ed) => {
    const currentDate = new Date();
    return currentDate > new Date(ed);
  };

  useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch(`http://localhost:8080/product/${productId}`);
               if (!response.ok) {
                 throw new Error('Not ok');
               }
               const responseData = await response.json();
               setData(responseData);
               nameInput(responseData.name);
               priceInput(responseData.price);
               catInput(responseData.category);
               quantityInput(responseData.quantity);
               ngInput(responseData.nutriGrade);
               desInput(responseData.description);
               const expiryDate = new Date(responseData.expiryDate);
               edInput(formatDate(expiryDate));

             } catch (error) {
               setError('Error fetching data');
               setLoading(false);
             } finally {
               setLoading(false);
             }
        };
        if (!data) {
          fetchData();
        }

  }, [data]);

  return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="view">
              {name} {isExpired(ed) && <span style={{ color: 'red', fontSize: '17px' }}>Expired</span>}
            </h2>
            <Link to={`/update/${productId}`} style={{display: 'flex', justifyContent: 'flex-end'}}>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <ValidatedForm id="view" onSubmit={null} formNoValidate noValidate={ false } >
              <p>Category</p>
              <p>{cat}</p>
              <p>Price</p>
              <p>{price}</p>
              <p>Quantity</p>
              <p>{quantity}</p>
              <p>Expiry Date</p>
              <p>{ed}</p>
              <p>NutriGrade</p>
              <p>{ng}</p>
              <p>Description / Remarks</p>
              <p>{des}</p>
              <Link to="/product" className="btn btn-success" color="primary" style={{display: 'flex', justifyContent: 'flex-end'}}>
                Cancel
              </Link>
            </ValidatedForm>

          </Col>
        </Row>
      </div>
  );
};

export default View;
