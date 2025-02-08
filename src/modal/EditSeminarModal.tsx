import { Button, Modal } from 'react-bootstrap';
import { EditSeminarModalProps } from './Modal.type.ts';
import Input from '../common/Input.tsx';

const EditSeminarModal = ({
  id,
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
  handleEdit,
}: EditSeminarModalProps) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Seminar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="add-button__form">
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
        <Button variant="primary" onClick={() => handleEdit(id)}>
          Edit Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSeminarModal;
