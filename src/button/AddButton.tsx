import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { seminarUrl } from '../seminar/SeminarList.tsx';
import * as axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ButtonProps } from './Button.type.ts';

import './AddButton.style.css';

const AddButton = ({ setSeminarList, seminarList }: ButtonProps) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState('');

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleSave = async () => {
    const newSeminarList = {
      id: uuidv4(),
      title,
      description,
      date: date.split('-').join(''),
      time,
      photo,
    };

    setSeminarList([...seminarList, newSeminarList]);
    await axios.default.post(seminarUrl, newSeminarList);
    setShow(false);
  };

  return (
    <div className="add-button__wrapper">
      <h3>Seminars</h3>
      <Button variant="primary" onClick={handleShow}>
        Add Seminar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Seminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-button__form">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Title"
            />

            <label>Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Description"
            />

            <label>Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Time</label>
            <input
              type="time"
              className="form-control"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <label>Photo URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddButton;
