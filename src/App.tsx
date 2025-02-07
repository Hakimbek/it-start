import SeminarList, { seminarUrl } from './seminar/SeminarList.tsx';
import AddButton from './button/AddButton.tsx';
import { useEffect, useState } from 'react';
import SeminarType from './seminar/Seminar.type.ts';
import * as axios from 'axios';

import './App.css';

function App() {
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
      <AddButton seminarList={seminarList} setSeminarList={setSeminarList} />
      <SeminarList
        setSeminarList={setSeminarList}
        seminarList={seminarList}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
}

export default App;
