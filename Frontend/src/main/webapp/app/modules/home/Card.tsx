import React, { useState, useRef, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './card.scss';

interface CardProps {
  listItem: {
    name: string;
    productCount: number;
    expiredProductCount: number;
    expiringProductCount: number;
    list_id: number;
  },
  refresh: () => {};
}

const Card: React.FC<CardProps> = ({ listItem, refresh }) => {
  const [showCardMenu, setShowCardMenu] = useState<boolean>(false);
  const userID = useAppSelector(state => state.userDetails.userId);
  const anchorRef = useRef<HTMLDivElement>(null);

  const cardClasses = [
    'groceryListCards',
    listItem.expiredProductCount > 0 && 'expired',
    listItem.expiredProductCount === 0 && listItem.expiringProductCount > 0 && 'warning',
  ].join(' ');

  const toggleCardMenu = () => {
    setShowCardMenu(!showCardMenu);
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
        <h3>{listItem.name}</h3>
        <div className="cardMenuIcon" ref={anchorRef} onClick={toggleCardMenu}>
          <FontAwesomeIcon icon="ellipsis-vertical" />
          {showCardMenu && (
            <div className="cardMenu">
              <div className="cardMenuItem" onClick={toggleCardMenu}>Edit</div>
              <div className="cardMenuItem" onClick={handleDelete}>Delete</div>
            </div>
          )}
        </div>
      </div>
      <div className="groceryListCardsDetails">
        <h4>Total Items: {listItem.productCount}</h4>
        <h4>Total Expired: {listItem.expiredProductCount}</h4>
        <h4>Total Expiring: {listItem.expiringProductCount}</h4>
      </div>
    </div>
  );
};

export default Card;
