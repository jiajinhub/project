import './home.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Row, Col, Alert, Button } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import { API_URL } from 'app/config/constants/api-endpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'app/config/constants/icon.js'
import Modal from './Modal';

export const Home = () => {
  const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
  const userID = useAppSelector(state => state.userDetails.userId);
  const [userEmail, setUserEmail] = useState(null);
  const [userLists, setUserLists] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddList = async (user, name, description) => {
    try {
      const getResponse = await axios.get('http://localhost:8080/dashboard/addList', {
        params: { userID: user, name, description }, headers: {'Content-Type': 'application/json'}
      });
      toggleModal();
      fetchUserData();
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error);
    }
  };

  const getTrimmedEmail = (email) => {
    if (email) {
      const symbolIndex = email.indexOf('@');
      if (symbolIndex > -1) {
        return email.substring(0, symbolIndex);
      } else {
        return email;
      }
    } else {
      return null;
    }
  };

  const fetchUserData = async () => {
    try {
      const getResponse = await axios.get('http://localhost:8080/dashboard/getUserLists', {
        params: { userID }, headers: {'Content-Type': 'application/json'}
      });
      setUserEmail(getTrimmedEmail(getResponse.data?.user?.email));
      setUserLists(getResponse.data?.lists);

    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
      setShowModal(false);
    }
  }, [isAuthenticated]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userEmail) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <h1 className="welcomeTexts">Welcome, {userEmail}!</h1>
      <div className="subHeader">
        <h2>Dashboard</h2>
        <div className="addListButton" onClick={toggleModal}>
          <FontAwesomeIcon icon="plus"/>
          <h4 className="addListText">New List</h4>
        </div>
      </div>
      <div>
        <Modal isOpen={showModal} onClose={toggleModal} onSubmit={handleAddList} />
      </div>
      {userLists ? (
        <div className="cardGrid">
          {userLists.map((listItem) => (
           <div className={`groceryListCards ${listItem.expiredProductCount > 0 ? 'expired' : null} ${listItem.expiredProductCount == 0 && listItem.expiringProductCount > 0 ? 'warning' : null}`} key={listItem.list_id}>
             <div className="groceryListCardsDetails cardHeader"><h3>{listItem.name}</h3></div>
             <div className="groceryListCardsDetails">
              <h4>Total Items: {listItem.productCount}</h4>
              <h4>Total Expired: {listItem.expiredProductCount}</h4>
              <h4>Total Expiring: {listItem.expiringProductCount}</h4>
             </div>
           </div>
          ))
         }
        </div>
      ) : (
        <div>
          <Alert color="warning">
            If you want to
            <span>&nbsp;</span>
            <Link to="/login" className="alert-link">
              sign in
            </Link>
            , you can try the default accounts:
            <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (login=&quot;user&quot; and
            password=&quot;user&quot;).
          </Alert>

          <Alert color="warning">
            You don&apos;t have an account yet?&nbsp;
            <Link to="/account/register" className="alert-link">
              Register a new account
            </Link>
          </Alert>
        </div>
      )}
    </Row>
  );
};

export default Home;
