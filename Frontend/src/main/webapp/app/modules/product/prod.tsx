import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Table, Modal, ModalBody} from 'reactstrap';
import { API_VIEW_PRODUCT, API_DELETE_PRODUCT, API_URL } from 'app/config/constants/api-endpoints';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Product = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [prod, prodInput] = useState(0);
  const navigate = useNavigate();

  const change = e => {
      setSearch(e.target.value);
  };

  useEffect(() => {
    axios.get(`${API_URL}${API_VIEW_PRODUCT}`)
    .then(res => setData(res.data));

  }, []);

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
    window.location.reload();
  };

  const handleRowDoubleClick = (prodId) => {
    navigate(`/view/${prodId}`);
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="10">
          <h1 id="prodtitle" data-cy="prodTitle">
            Product
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="10">
          <ValidatedForm id="prod" onSubmit={}>
            <ValidatedField
              id="name"
              name="searchQuery"
              label="Name"
              onChange={change}
              data-cy="prod"
            />
          </ValidatedForm>
          <Table className="table">
            <thead>
              <tr>
                <th>Name</th><th>Category</th>
                <th>Quantity</th><th>Price [SGD]</th>
                <th>Expiry Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.filter(item => {
                const LC = search.toLowerCase();
                const name = item.name.toLowerCase();
                return name.startsWith(LC)
              }.map((product) => (
                <tr className="prod" key={product.productId} onDoubleClick={() => handleRowDoubleClick(product.productId)}>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.expiryDate}</td>
                  <td className="p-2"><Link to="#" onClick={()=>handleOpen(product.productId)} className="ms-2"><FontAwesomeIcon icon="trash"/></Link>
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
        </Col>
      </Row>
    </div>
  );
};

export default Product;
