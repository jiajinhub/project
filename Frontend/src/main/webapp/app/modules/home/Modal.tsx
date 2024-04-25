import React, { useState } from 'react';
import './addListModal.scss';
import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
  toUpdate: boolean;
  name: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user, name, description) => void;
}

const Modal: React.FC<ModalProps> = ({ toUpdate, name, description, isOpen, onClose, onSubmit }) => {
  const [newName, setName] = useState(name);
  const [newDescription, setDescription] = useState(description);
  const user = useAppSelector(state => state.userDetails.userId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(user, name, description);
    e.preventDefault();
    onSubmit(user, newName, newDescription);
    setName('');
    setDescription('');
  };

  return (
    <div className={`modal ${isOpen ? 'display-block' : 'display-none'}`}>
    <div className="modal-main">
      <div className="modalHeader">
        {toUpdate ? (
          <h3>Update {name}</h2>
        ) : (
          <h3>New List</h2>
        )}

        <div onClick={onClose}>
          <FontAwesomeIcon icon="times" style={{color: '#14110F'}}/>
        </div>
      </div>
      <div className="inputFieldsMain">
        <form onSubmit={handleSubmit}>
          <div className="inputFields">
          <input type="text" id="name" placeholder="Title" value={newName} onChange={(e) => setName(e.target.value)} required />
          <textarea id="description" value={newDescription} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            {toUpdate ? (
              <button type="submit" className="button">Update</button>
            ) : (
              <button type="submit" className="button">Create</button>
            )}
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Modal;
