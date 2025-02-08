import { useState } from 'react';
import { seminarUrl } from './SeminarList.tsx';
import './Seminar.style.css';
import * as axios from 'axios';
import { SeminarProps } from './Seminar.type.ts';
import DeleteSeminarModal from '../modal/DeleteSeminarModal.tsx';
import EditSeminarModal from '../modal/EditSeminarModal.tsx';
import Button from 'react-bootstrap/Button';

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

  const handleDelete = async (id: string) => {
    const newSeminarList = seminarList.filter((seminar) => seminar.id !== id);
    setSeminarList(newSeminarList);
    await axios.default.delete(`${seminarUrl}/${id}`);
    setShowDelete(false);
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
