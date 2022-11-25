import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import { useEffect } from 'react';
import { Subject } from '../../interfaces-types/subject';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import subjectsSlice from '../../store/subjects-slice';
import { getSubjects } from '../../services/api-services/subjects';
import SubjectRow from './SubjectRow/index';
import Search from '../../layout/Search';
import './SubjectsList.scss';

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

  console.log(subjects);

  return (
    <>
      <Box className="subjects-list__search-container">
        <Search searchPage="subjects" />
      </Box>
      <TableContainer className="subjects-list-container">
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
    </>
  );
};

export default SubjectsList;
