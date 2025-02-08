import { Button, Modal } from 'react-bootstrap';
import { DeleteSeminarModalProps } from './Modal.type.ts';

const DeleteSeminarModal = ({
  id,
  show,
  setShow,
  handleDelete,
}: DeleteSeminarModalProps) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSeminarModal;
