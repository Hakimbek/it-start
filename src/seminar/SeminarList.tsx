import { useEffect, useState } from 'react';
import Seminar from './Seminar.tsx';
import { Table } from 'react-bootstrap';
import * as axios from 'axios';
import SeminarType from './Seminar.type.ts';

export const seminarUrl = 'http://localhost:3000/seminars';

const SeminarList = () => {
  const [seminarList, setSeminarList] = useState<SeminarType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios.default
      .get(seminarUrl)
      .then(({ data }) => {
        setSeminarList(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

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
            seminarList.map(({ id, title, description, date, time, photo }) => (
              <Seminar
                key={id}
                id={id}
                title={title}
                description={description}
                date={date}
                time={time}
                photo={photo}
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
