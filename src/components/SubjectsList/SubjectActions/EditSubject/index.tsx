import { ChangeEvent, useEffect, useState } from 'react';
import { SubjectEditInterface } from '../../../../interfaces-types/props';
import SubjectModal from '../../../Modals/common/SubjectModal';
import { Button } from '@mui/material';
import { validateAddSubject } from '../../../../helpers/inputValidation';
import {
  editSubject,
  getSubjects,
} from '../../../../services/api-services/subjects';
import subjectsSlice from '../../../../store/subjects-slice';
import { useAppDispatch } from '../../../../hooks/redux-hooks';

const EditSubject = (props: SubjectEditInterface) => {
  const { index, subject } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubjectName(event.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubjectName('');
  };

  const handleSubmit = async () => {
    if (error.length) return;

    await editSubject(index, { ...subject, name: subjectName });
    setIsOpen(false);
    setSubjectName('');
  };

  useEffect(() => {
    isOpen === true && setSubjectName(subject?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    validateAddSubject(subjectName, setError);
  }, [subjectName]);

  useEffect(() => {
    const subjectsList = async (): Promise<void> => {
      const subjects = await getSubjects();
      subjects !== undefined &&
        dispatch(subjectsSlice.actions.setSubjects(subjects));
    };

    subjectsList();
  }, [dispatch, isOpen]);

  return (
    <>
      <SubjectModal
        isOpen={isOpen}
        handleChange={handleChange}
        subjectName={subjectName}
        error={error}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isEdit={true}
      />
      <Button
        variant="contained"
        color="warning"
        style={{ marginRight: '20px' }}
        onClick={() => setIsOpen(true)}
      >
        Edit
      </Button>
    </>
  );
};

export default EditSubject;
