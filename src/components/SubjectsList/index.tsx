import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffect } from 'react';
import { Subject } from '../../interfaces-types/subject';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import subjectsSlice from '../../store/subjects-slice';
import { getSubjects } from '../../services/api-services/subjects';
import SubjectRow from './SubjectRow/index';

const SubjectsList = () => {
  const dispatch = useAppDispatch();

  const subjects: Subject[] = useAppSelector(
    (state) => state.subjects.subjectList
  );

  useEffect(() => {
    const subjectsList = async (): Promise<void> => {
      const subjects = await getSubjects();
      subjects !== undefined &&
        dispatch(subjectsSlice.actions.setSubjects(subjects));
    };

    subjectsList();
  }, [dispatch]);

  return (
    <TableContainer style={{ width: '90%', margin: 'auto', marginTop: '60px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, index) => (
            <SubjectRow key={subject.id} subject={subject} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectsList;
