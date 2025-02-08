import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { seminarUrl } from '../seminar/SeminarList.tsx';
import * as axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { HeaderProps } from './Header.type.ts';
import AddSeminarModal from '../modal/AddSeminarModal.tsx';

import './Header.style.css';

// Header component shows title and "Add Seminar" button
const Header = ({ setSeminarList, seminarList }: HeaderProps) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState('');

  // This function handles adding seminars
  const handleSave = async () => {
    // We generate new seminar from inputs
    const newSeminarList = {
      id: uuidv4(),
      title,
      description,
      date: date.split('-').join('.'),
      time,
      photo,
    };

    // Add seminar to state
    setSeminarList([...seminarList, newSeminarList]);
    // Make call to add seminar to server
    await axios.default.post(seminarUrl, newSeminarList);
    // Close modal
    setShow(false);
  };

  return (
    <div className="header-wrapper">
      <h3>Seminars</h3>
      <Button variant="primary" onClick={() => setShow(true)}>
        Add Seminar
      </Button>
      <AddSeminarModal
        show={show}
        setShow={setShow}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        photo={photo}
        setPhoto={setPhoto}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Header;
