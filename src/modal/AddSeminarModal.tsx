import { Button, Modal } from 'react-bootstrap';
import Input from '../common/Input.tsx';
import { AddSeminarModalProps } from './Modal.type.ts';

import './Modal.style.css';

// This modal is opened when user will click the "Add Seminar" button
const AddSeminarModal = ({
  show,
  setShow,
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
  time,
  setTime,
  photo,
  setPhoto,
  handleSave,
}: AddSeminarModalProps) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Seminar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-form">
          <Input label="Title" value={title} setValue={setTitle} type="text" />
          <Input
            label="Description"
            value={description}
            setValue={setDescription}
            type="text"
          />
          <Input label="Date" value={date} setValue={setDate} type="date" />
          <Input label="Time" value={time} setValue={setTime} type="time" />
          <Input
            label="Photo URL"
            value={photo}
            setValue={setPhoto}
            type="url"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSeminarModal;
