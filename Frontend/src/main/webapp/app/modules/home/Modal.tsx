import React, { useState } from 'react';
import './addListModal.scss';
import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user, name, description) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const user = useAppSelector(state => state.userDetails.userId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(user, name, description);
    e.preventDefault();
    onSubmit(user, name, description);
    setName('');
    setDescription('');
  };

  console.log('isopen: ' + isOpen);

  return (
    <div className={`modal ${isOpen ? 'display-block' : 'display-none'}`}>
    <div className="modal-main">
      <div className="modalHeader">
        <h3>New List</h2>
        <div onClick={onClose}>
          <FontAwesomeIcon icon="times"/>
        </div>
      </div>
      <div className="inputFieldsMain">
        <form onSubmit={handleSubmit}>
          <div className="inputFields">
          <input type="text" id="name" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} required />
          <textarea id="description" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <button type="submit" className="button">Create</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Modal;
