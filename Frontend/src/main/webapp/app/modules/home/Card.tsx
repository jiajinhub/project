import './card.scss';

import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import { Link, useNavigate } from 'react-router-dom';

interface CardProps {
  listItem: {
    name: string;
    description: string;
    productCount: number;
    expiredProductCount: number;
    expiringProductCount: number;
    list_id: number;
  };
  refresh: () => {};
}

const Card: React.FC<CardProps> = ({ listItem, refresh }) => {
  const [showCardMenu, setShowCardMenu] = useState<boolean>(false);
  const userID = useAppSelector(state => state.userDetails.userId);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const navToList = (listID, listName) => {
    localStorage.setItem('listID', JSON.stringify(listID));
    localStorage.setItem('listName', JSON.stringify(listName));
    navigate('/product');
  }


  const toggleEditModal = () => {
    setShowModal(!showModal);
  };

  const cardClasses = [
    'groceryListCards',
    listItem.expiredProductCount > 0 && 'expired',
    listItem.expiredProductCount === 0 && listItem.expiringProductCount > 0 && 'warning',
  ].join(' ');

  const toggleCardMenu = () => {
    setShowCardMenu(!showCardMenu);,
  };

  const handleUpdate = async (user, name, description) => {
    try {
      const getResponse = await axios.get('http://localhost:8080/dashboard/updateList', {
        params: { listID: listItem.list_id, name, description }, headers: {'Content-Type': 'application/json'}
      });
      toggleEditModal();
      toggleCardMenu();
      refresh();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const getResponse = await axios.get('http://localhost:8080/dashboard/deleteUserList', {
        params: { userID, listID: listItem.list_id }, headers: {'Content-Type': 'application/json'}
      });
      toggleCardMenu();
      refresh();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
      setShowCardMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cardClasses} key={listItem.list_id}>
      <div className="cardHeader">
        <h3 style={{color: '#14110F'}}>{listItem.name}</h3>
        <div className="cardMenuIcon" ref={anchorRef} onClick={toggleCardMenu}>
          <FontAwesomeIcon icon="ellipsis-vertical" style={{color: '#14110F'}} />
          {showCardMenu && (
            <div className="cardMenu">
              <div className="cardMenuItem" onClick={toggleEditModal}>Edit</div>
              <div className="cardMenuItem" onClick={handleDelete}>Delete</div>
            </div>
          )}
          <div>
            <Modal toUpdate={true} name={listItem.name} description={listItem.description} isOpen={showModal} onClose={toggleEditModal} onSubmit={handleUpdate} />
          </div>
        </div>
      </div>
      <div className="groceryListCardsDetails" onClick={() => navToList(listItem.list_id, listItem.name)}>
        <h4 style={{color: '#14110F'}}>Total Items: {listItem.productCount}</h4>
        <h4 style={{color: '#14110F'}}>Total Expired: {listItem.expiredProductCount}</h4>
        <h4 style={{color: '#14110F'}}>Total Expiring: {listItem.expiringProductCount}</h4>
      </div>
    </div>
  );
};

export default Card;
