
import React, { useState, useEffect, props } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Update from './Update';
import { useNavigate } from "react-router-dom";
import "./home.css";
import ThreeDRotation from '@mui/icons-material/DeleteSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useSlotProps } from "@mui/base";
import ReactPaginate from 'react-paginate';
import _ from "lodash";
import classnames from 'classnames';
import Pagination from 'react-bootstrap/Pagination';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch, useSelector,connect } from "react-redux";
import { loadUsers } from "./action";


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

const Listtable = () => {
    const  {users} = useSelector(state => state.data)
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(loadUsers())
    },[])
  return (
    <div className="tableStl">
      <h1>Redux User List Details..</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow key={"item.id"}>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Mobile No</StyledTableCell>
              <StyledTableCell align="right">Country</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, id) => {
              return <StyledTableRow >
                <StyledTableCell  >{user.firstname}</StyledTableCell >
                <StyledTableCell align="right">{user.lastname}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.mobileno}</StyledTableCell>
                <StyledTableCell align="right">{user.country}</StyledTableCell>
                <StyledTableCell align="right">{user.city}</StyledTableCell>
                <StyledTableCell align="right">{user.gender}</StyledTableCell>
                </StyledTableRow>
              })}
          </TableBody>
          </Table>
        </TableContainer>
    </div>

  )}
export default Listtable;