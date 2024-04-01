import './home.scss';

import React, { useEffect, useState, useRef, createRef } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Row, Col, Alert, Button } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import { API_URL } from 'app/config/constants/api-endpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'app/config/constants/icon.js';
import Modal from './Modal';
import Card from './Card';

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

  const handleList = async (user, name, description) => {
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
    return (
      <div>
          <h4>
            You are currently logged out. Please sign back in!
          </h4>
      </div>
    );
  }

  const exportExcel = async (listId: number) => {
    try {
      const requestBody = { listId }; // Create the request body object
      const response = await axios.post('http://localhost:8080/product/ExportExcel', requestBody, {
        responseType: 'arraybuffer', // Specify the response type as arraybuffer
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to download the file
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'exported_excel.xlsx');
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('Excel exported successfully');
    } catch (error) {
      console.error('Error exporting Excel:', error);
      setError(error);
    }
  };

  return (
    <Row>
      <h1 className="welcomeTexts">Welcome, {userEmail}!</h1>
      <div className="subHeader">
        <h2>Dashboard</h2>
        <div className="addListButton" onClick={toggleModal}>
          <FontAwesomeIcon icon="plus"/>
          <h4 className="addListText">New List</h4>
        </div >
      </div>
      <div className="no-style-div" >
        <button onClick={() => exportExcel(1)}>
              Export Excel
        </button>
        <div style={{ height: '20px' }}></div>
      </div>
      <div>
        <Modal toUpdate={false} name={''} description={''} isOpen={showModal} onClose={toggleModal} onSubmit={handleList} />
      </div>
      {userLists ? (
        <div className="cardGrid">
            {userLists.map((listItem) => (
              <Card listItem={listItem} refresh={fetchUserData} key={listItem.list_id}/>
            ))}
          </div>
      ) : (
        <div>
          <Alert color="warning">
            <h3>
              You do not have any list yet! Create something and make everyone's life happier! :D
            </h3>
          </Alert>
        </div>
      )}
    </Row>
  );
};

export default Home;
