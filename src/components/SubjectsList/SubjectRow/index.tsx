import React from 'react';
import { SubjectsRowInterface } from '../../../interfaces-types/props';
import { TableRow, TableCell, Box } from '@mui/material';
import DeleteSubject from '../SubjectActions/DeleteSubject';
import EditSubject from '../SubjectActions/EditSubject/index';

const SubjectRow = (props: SubjectsRowInterface) => {
  const { subject, index } = props;

  return (
    <TableRow>
      <TableCell>{subject.name}</TableCell>
      <TableCell style={{ textAlign: 'end' }}>
        <Box>
          <EditSubject subject={subject} index={index} />
          <DeleteSubject index={index} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default SubjectRow;
