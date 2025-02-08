import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { seminarUrl } from '../seminar/SeminarList.tsx';
import * as axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { HeaderProps } from './Header.type.ts';
import AddSeminarModal from '../modal/AddSeminarModal.tsx';

import './Header.style.css';

const Header = ({ setSeminarList, seminarList }: HeaderProps) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSave = async () => {
    const newSeminarList = {
      id: uuidv4(),
      title,
      description,
      date: date.split('-').join('.'),
      time,
      photo,
    };

    setSeminarList([...seminarList, newSeminarList]);
    await axios.default.post(seminarUrl, newSeminarList);
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
