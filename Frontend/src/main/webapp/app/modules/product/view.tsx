import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
import { API_URL, API_LIST } from 'app/config/constants/api-endpoints';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


export const View = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [name, nameInput] = useState('');
  const [price, priceInput] = useState('');
  const [cat, catInput] = useState('');
  const [quantity, quantityInput] = useState('');
  const [ed, edInput] = useState('');
  const [ng, ngInput] = useState('');
  const [des, desInput] = useState('');
  const {productId} = useParams();
  const [list, setList] = useState(null);
  const [prod, editProd] = useState('');

  const edit = (date) => {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      return `${y}-${m}-${d}`;
  };

  const getexpiry = (ed) => {
    const date = new Date();
    const expire = new Date(ed);
    const sub = expire.getTime() - date.getTime();
    const day = Math.floor(sub / (1000 * 60 * 60 * 24));

    if(day < 0){
      return 'Expired';
    } else if (day <= 15){
      return 'Expiring soon';
    } else {
      return false;
    }
  };

  useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await fetch(`${API_URL}product/${productId}`);
               if (!response.ok) {
                 throw new Error('Error');
               }
               const input = await response.json();
               setData(input);
               nameInput(input.name);
               priceInput(input.price);
               catInput(input.category);
               quantityInput(input.quantity);
               ngInput(input.nutriGrade);
               desInput(input.description);
               const expiryDate = new Date(input.expiryDate);
               edInput(edit(expiryDate));
               const productListId = input.listId;
               const option = { list_id: productListId };
               const r = await fetch(`${API_URL}${API_LIST}`, {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(option)
               });
               if (!r.ok) {
                 throw new Error('Error');
               }
               const prodData = await r.json();
               const ListId = prodData.name;
               editProd(ListId);

             } catch (error) {
               setError('Error');
               setLoading(false);
             } finally {
               setLoading(false);
             }
        };
        fetchData();

  }, []);

  const expiryStatus = getexpiry(ed);

  return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="view" style={{ display: 'inline-block', fontWeight: 500, marginRight: '20px'}}>
              {prod} / {name}
            </h2> {expiryStatus && (
            <button style={{ borderRadius: '10px',  borderColor: 'red' }} disabled>
              <span style={{ color: 'red' }}>{expiryStatus === 'Expired' ? 'Expired' : expiryStatus === 'Expiring soon' ? 'Expiring': ''}</span>
            </button>)}
            <Link to={`/update/${productId}`} style={{display: 'flex', justifyContent: 'flex-end'}}>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <ValidatedForm id="view" onSubmit={null} formNoValidate noValidate={ false } >
              <p className="viewProducts" style={{ marginBottom: '4px' }}>Category</p>
              <p className="viewProducts" style={{ minHeight: '20px' }}>{cat}</p>
              <p className="viewProducts" style={{ marginBottom: '4px' }}>Price</p>
              <p className="viewProducts" style={{ minHeight: '20px' }}>SGD {price}</p>
              <p className="viewProducts" style={{ marginBottom: '4px' }}>Quantity</p>
              <p className="viewProducts" style={{ minHeight: '20px' }}>{quantity}</p>
              <p className="viewProducts" style={{ marginBottom: '4px' }}>Expiry Date</p>
              <p className="viewProducts" style={{ minHeight: '20px' }}>{ed}</p>
              <p className="viewProducts" style={{ marginBottom: '4px' }}>NutriGrade</p>
              <p className="viewProducts" style={{ minHeight: '20px' }}>{ng}</p>
              <p className="viewProducts" style={{ marginBottom: '4px' }}>Description / Remarks</p>
              <p className="viewProducts" style={{ minHeight: '20px' }}>{des}</p>
              <Link to="/product" className="btn viewProducts" color="primary"  style={{justifyContent: 'flex-end', display: 'inline-block', border: '1px solid', borderRadius: '5px', marginLeft: '750px'}}>
                Cancel
              </Link>
            </ValidatedForm>
          </Col>
        </Row>
      </div>
  );
};

export default View;
