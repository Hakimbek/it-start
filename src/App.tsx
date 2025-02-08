import SeminarList, { seminarUrl } from './seminar/SeminarList.tsx';
import Header from './header/Header.tsx';
import { useEffect, useState } from 'react';
import SeminarType from './seminar/Seminar.type.ts';
import * as axios from 'axios';

function App() {
  // Save seminars to this state after getting them from server
  const [seminarList, setSeminarList] = useState<SeminarType[]>([]);
  // Show loading message if isLoading is true
  const [isLoading, setIsLoading] = useState(true);
  // Show error message if isError is true
  const [isError, setIsError] = useState(false);

  // Get seminars after component mounts
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
      <Header seminarList={seminarList} setSeminarList={setSeminarList} />
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
