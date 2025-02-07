import SeminarType from '../seminar/Seminar.type.ts';

export interface ButtonProps {
  setSeminarList: (seminarList: SeminarType[]) => void;
  seminarList: SeminarType[];
}
