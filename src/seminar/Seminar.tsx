import SeminarType from './Seminar.type.ts';
import { seminarUrl } from './SeminarList.tsx';
import './Seminar.style.css';
import * as axios from 'axios';

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
  const handleDelete = async (id: string) => {
    const newSeminarList = seminarList.filter((seminar) => seminar.id !== id);
    setSeminarList(newSeminarList);
    await axios.default.delete(`${seminarUrl}/${id}`);
  };

  return (
    <tr className="seminar-row">
      <td>{title}</td>
      <td>{description}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>
        <img src={photo} alt="Photo" className="seminar-photo" />
      </td>
      <td>
        <button className="btn btn-outline-primary">Edit</button>
        <button
          className="btn btn-outline-danger btn-delete"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Seminar;
