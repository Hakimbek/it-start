import { useState } from 'react';
import SeminarType from './Seminar.type.ts';
import { seminarUrl } from './SeminarList.tsx';
import './Seminar.style.css';
import * as axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

interface SeminarProps extends SeminarType {
  seminarList: SeminarType[];
  setSeminarList: (seminarList: SeminarType[]) => void;
}

const Seminar = ({
  id,
  title,
  description,
  date,
  time,
  photo,
  seminarList,
  setSeminarList,
}: SeminarProps) => {
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDate, setEditDate] = useState(date.split('.').join('-'));
  const [editTime, setEditTime] = useState(time);
  const [editPhoto, setEditPhoto] = useState(photo);

  const handleClose = () => setShow(false);

  const handleShow = (isDelete: boolean) => {
    setIsDelete(isDelete);
    setShow(true);
  };

  const handleDelete = async (id: string) => {
    const newSeminarList = seminarList.filter((seminar) => seminar.id !== id);
    setSeminarList(newSeminarList);
    await axios.default.delete(`${seminarUrl}/${id}`);
  };

  const handleEdit = async (id: string) => {
    const newSeminar = {
      id,
      title: editTitle,
      description: editDescription,
      date: editDate.split('-').join('.'),
      time: editTime,
      photo: editPhoto,
    };
    const newSeminarList = seminarList.map((seminar) => {
      if (seminar.id === id) {
        return newSeminar;
      }

      return seminar;
    });
    setSeminarList(newSeminarList);
    await axios.default.put(`${seminarUrl}/${id}`, newSeminar);
    setShow(false);
  };

  return (
    <>
      <tr className="seminar-row">
        <td>{title}</td>
        <td>{description}</td>
        <td>{date}</td>
        <td>{time}</td>
        <td>
          <img src={photo} alt="Photo" className="seminar-photo" />
        </td>
        <td>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleShow(false)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-delete"
            onClick={() => handleShow(true)}
          >
            Delete
          </button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        {isDelete ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Edit Seminar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="add-button__form">
                <label>Title</label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Title"
                />

                <label>Description</label>
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Description"
                />

                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />

                <label>Time</label>
                <input
                  type="time"
                  className="form-control"
                  placeholder="Time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                />

                <label>Photo URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Photo URL"
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleEdit(id)}>
                Edit Changes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default Seminar;
