import Seminar from './Seminar.tsx';
import { Table } from 'react-bootstrap';
import { SeminarListProps } from './Seminar.type.ts';

export const seminarUrl = 'http://localhost:3000/seminars';

const SeminarList = ({
  seminarList,
  isLoading,
  isError,
  setSeminarList,
}: SeminarListProps) => {
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            !isError &&
            seminarList.map((seminar) => (
              <Seminar
                key={seminar.id}
                {...seminar}
                setSeminarList={setSeminarList}
                seminarList={seminarList}
              />
            ))}
        </tbody>
      </Table>
      {isError && <p>Error</p>}
    </>
  );
};

export default SeminarList;
