import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {connect} from 'react-redux';
import { getFormValues } from 'redux-form';
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const BasicTable = ({ values = { members: [] } }) => (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>First name</StyledTableCell>
            <StyledTableCell>Last name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Favt Color</StyledTableCell>
            <StyledTableCell>FeedBack</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.members.map(n => {
            return (
              <TableRow key={`${n.firstName}-${n.lastName}-${n.email}-${n.gender}-${n.color}-${n.notes}`}>
                <TableCell>{n.firstName}</TableCell>
                <StyledTableCell>{n.lastName}</StyledTableCell>
                <StyledTableCell>{n.email}</StyledTableCell>
                <StyledTableCell>{n.gender}</StyledTableCell>
                <StyledTableCell>{n.color}</StyledTableCell>
                <StyledTableCell>{n.notes}</StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
export default connect(state=>({
    values:getFormValues("MyForm")(state)

}))(BasicTable)