export default interface SeminarType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

export interface SeminarListProps {
  seminarList: SeminarType[];
  setSeminarList: (seminarList: SeminarType[]) => void;
  isLoading: boolean;
  isError: boolean;
}

export interface SeminarProps extends SeminarType {
  seminarList: SeminarType[];
  setSeminarList: (seminarList: SeminarType[]) => void;
}
