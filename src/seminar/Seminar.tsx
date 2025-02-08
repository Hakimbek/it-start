import { useState } from 'react';
import { seminarUrl } from './SeminarList.tsx';
import './Seminar.style.css';
import * as axios from 'axios';
import { SeminarProps } from './Seminar.type.ts';
import DeleteSeminarModal from '../modal/DeleteSeminarModal.tsx';
import EditSeminarModal from '../modal/EditSeminarModal.tsx';
import Button from 'react-bootstrap/Button';

// We will get seminars from props and render them
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
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDate, setEditDate] = useState(date.split('.').join('-'));
  const [editTime, setEditTime] = useState(time);
  const [editPhoto, setEditPhoto] = useState(photo);

  // Used for handling delete action
  const handleDelete = async (id: string) => {
    // We will filter seminar
    const newSeminarList = seminarList.filter((seminar) => seminar.id !== id);
    // Add new generated seminar list to state
    setSeminarList(newSeminarList);
    // Make a call to the server to delete the seminar from server
    await axios.default.delete(`${seminarUrl}/${id}`);
    // Close modal
    setShowDelete(false);
  };

  // Used for handling edit action
  const handleEdit = async (id: string) => {
    // Generate new seminar from inputs
    const newSeminar = {
      id,
      title: editTitle,
      description: editDescription,
      date: editDate.split('-').join('.'),
      time: editTime,
      photo: editPhoto,
    };
    // Update seminar list
    const newSeminarList = seminarList.map((seminar) => {
      if (seminar.id === id) {
        return newSeminar;
      }

      return seminar;
    });
    // Edit state
    setSeminarList(newSeminarList);
    // Make a call to the server
    await axios.default.put(`${seminarUrl}/${id}`, newSeminar);
    // Close modal
    setShowEdit(false);
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
          <Button onClick={() => setShowEdit(true)} variant="outline-primary">
            Edit
          </Button>
          <Button onClick={() => setShowDelete(true)} variant="outline-danger">
            Delete
          </Button>
        </td>
      </tr>
      <DeleteSeminarModal
        id={id}
        show={showDelete}
        setShow={setShowDelete}
        handleDelete={handleDelete}
      />
      <EditSeminarModal
        id={id}
        show={showEdit}
        setShow={setShowEdit}
        title={editTitle}
        setTitle={setEditTitle}
        description={editDescription}
        setDescription={setEditDescription}
        date={editDate}
        setDate={setEditDate}
        time={editTime}
        setTime={setEditTime}
        photo={editPhoto}
        setPhoto={setEditPhoto}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default Seminar;
