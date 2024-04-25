import './prod.scss';

import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Link, useNavigate, useParams, useLocation  } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Table, Modal, ModalBody} from 'reactstrap';
import { API_VIEW_PRODUCT, API_DELETE_PRODUCT, API_URL } from 'app/config/constants/api-endpoints';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'app/config/constants/icon.js';
import { faPlus, faShareAlt } from '@fortawesome/free-solid-svg-icons';

export const Product = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [prod, prodInput] = useState(0);
  const navigate = useNavigate();
  const [e, edit] = useState('view');
  const [listID, setListID] = useState(null);
  const [listName, setListName] = useState(null);

  const change = e => {
      setSearch(e.target.value);
  };

  useEffect(() => {
    var storedData = localStorage.getItem('listID');
    if (storedData) {
      setListID(JSON.parse(storedData));
    }
    storedData = localStorage.getItem('listName');
    if (storedData) {
      setListName(JSON.parse(storedData));
    }
    handleViewProducts();
  }, []);

  const handleViewProducts = async () => {
    axios.get(`${API_URL}${API_VIEW_PRODUCT}/${localStorage.getItem('listID')}`)
      .then(res => setData(res.data));
  }

  const handleOpen = (id) => {
    setOpen(true);
    prodInput(id);
  };

  const close = () => {
    setOpen(false);
  };

  const remove = () => {
    axios.post(`${API_URL}${API_DELETE_PRODUCT}`,{productId: prod})
    setOpen(false);
    handleViewProducts();
  };

  const handleRowDoubleClick = (prodId) => {
    navigate(`/view/${prodId}`);
  };

  const update = (datedata: string): string => {
    const dateValue = new Date(datedata);
    const y = dateValue.getFullYear();
    const m = ('0' + (dateValue.getMonth() + 1)).slice(-2);
    const d = ('0' + dateValue.getDate()).slice(-2);
    return `${y}-${m}-${d}`;
  }

  const changes = (change: string) => {
    edit(change);
  };

  const Item = data.filter(item => {
    if (e === 'view') {
      return true;
    } else if (e === 'after') {
      const x = new Date(item.expiryDate);
      return x < new Date();
    } else if (e === 'before') {
      const y = new Date(item.expiryDate);
      return y >= new Date();
    }
    return false;
  });

  return (
    <div style={{ padding: '1rem' }}>
      <Row className="justify-content-center">
          <h1 id="prodtitle" data-cy="prodTitle">
            {listName}
          </h1>
          <div className="d-flex justify-content-between">
            <div>
              <button className={`btn btn-outline-secondary m-2 ${e ==='view'?'active':''}`} onClick={() => changes('view')}>All</button>
              <button className={`btn btn-outline-secondary m-2 ${e ==='after'?'active':''}`} onClick={() => changes('after')}>Expired</button>
              <button className={`btn btn-outline-secondary m-2 ${e ==='before'?'active':''}`} onClick={() => changes('before')}>Fresh</button>
            </div>
            <div>
              <div className="btn btn-outline-secondary mr-2" ><FontAwesomeIcon icon={faShareAlt} className="mr-1" /> Share</div>
              &nbsp;
              <Link to='/create-product' className="btn label_background"><FontAwesomeIcon icon={faPlus} /> Add Inventory</Link>
            </div>
          </div>
          <hr/>
      </Row>
      <Row className="justify-content-center">
          <ValidatedForm id="prod" onSubmit={null}>
            <ValidatedField
              id="name"
              name="searchQuery"
              onChange={change}
              data-cy="prod"
              placeholder="Search..."
            />
          </ValidatedForm>
          <Table className="table table_background">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price [SGD]</th>
                <th>Expiry Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Item.filter(item => {
                const LC = search.toLowerCase();
                const name = item.name.toLowerCase();
                return name.startsWith(LC)
              }).map((product) => (
                <tr className={`${new Date(product.expiryDate) < new Date() ? "expired" : new Date(product.expiryDate) < new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)) && new Date(product.expiryDate) > new Date() ? "warning" : "fresh"}`} key={product.productId} onDoubleClick={() => handleRowDoubleClick(product.productId)}>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{update(product.expiryDate)}</td>
                  <td className="p-2"><Link to="#" onClick={()=>handleOpen(product.productId)} className="ms-2" style={{"color":"#14110f"}}><FontAwesomeIcon icon="trash"/></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal isOpen={open}>
            <ModalBody>
              <p>Delete this record?</p>
              <button onClick={remove}>Yes</button>
              <button onClick={close}>No</button>
            </ModalBody>
          </Modal>
      </Row>
    </div>
  );
};

export default Product;
