interface ModalInputsType {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  date: string;
  setDate: (date: string) => void;
  time: string;
  setTime: (time: string) => void;
  photo: string;
  setPhoto: (photo: string) => void;
}

export interface AddSeminarModalProps extends ModalInputsType {
  show: boolean;
  setShow: (show: boolean) => void;
  handleSave: () => void;
}

export interface DeleteSeminarModalProps {
  id: string;
  show: boolean;
  setShow: (show: boolean) => void;
  handleDelete: (id: string) => void;
}

export interface EditSeminarModalProps extends ModalInputsType {
  id: string;
  show: boolean;
  setShow: (show: boolean) => void;
  handleEdit: (id: string) => void;
}
