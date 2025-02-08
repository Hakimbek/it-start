import SeminarType from '../seminar/Seminar.type.ts';

export interface HeaderProps {
  setSeminarList: (seminarList: SeminarType[]) => void;
  seminarList: SeminarType[];
}
