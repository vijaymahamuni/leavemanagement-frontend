import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import _ from "lodash";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import ExcelExportButton from "./ExcelExportButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./LeaveRequestlisting.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import { set } from "date-fns";
import Modal from '@mui/material/Modal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Norecord_component from "./Norecords_component";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {

    backgroundColor: '#003152',
    color: theme.palette.common.white,
    fontSize: 16,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,



  },
}));
let ImageLink = '';
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
var limit = 5;

function LeaveRequestlisting() {

  const [requestData, setrequestData] = useState([]);
  const [page, setpageCount] = useState();
  const [TabState, setTabState] = useState('Requested');
  const [totalcount, setTotalcount] = useState();
  const [Loading, setLoading] = useState(true);
  let AllowAccess = sessionStorage.getItem('Access_Level')

  let Profileid = sessionStorage.getItem("proid", Profileid)

  let Typesofrecords = 'Requested'
  let res_viewdata = 'Own';
  const [permission_usersdrop, setPermission_usersdrop] = useState('')
  const permission_tabcurr = sessionStorage.getItem('permission_tab');
  const { Current_tab } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const check_URLorEmpty = location.search
  const userParam = queryParams.get('user') || '';
  const statusParam = queryParams.get('status') || '';
  const dateParam = queryParams.get('date') || '';
  const userName = queryParams.get('username') || '';
  const inputDate = new Date(dateParam);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const outputDateStr = `${year}-${month}-${day}`;
  console.log("datepickers date format lastupdate", outputDateStr)
  let initialSelectedDate = null;

  if (outputDateStr && outputDateStr !== 'NaN-NaN-NaN') {

    const parsedDate = new Date(outputDateStr);
    const currentDate = new Date();

    if (parsedDate <= currentDate) {
      initialSelectedDate = parsedDate;
    }
  } const getUserdata = async (id, myArray) => {

    if (permission_tabcurr) {

      if (permission_tabcurr == 'Requested') {
        setValue(0)
      }
      else if (permission_tabcurr == 'Process') {
        setValue(1)
      }
      else {
        setValue(2)
      }

      setpaginationid(permission_tabcurr);
    }


    if (check_URLorEmpty != '') {

      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/leaveListing/${paginationid}`,
          data: { 'employeeId': Profileid, 'Emp_level': AllowAccess, 'paginationId': paginationid, 'current_Page': currentPage, 'selectedUser': sendfilter_id, 'selectedStatus': selectedStatus, 'selectedDate': outputDateStr }
          ,
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {
          if (res.data.data == '') {
            setLoading(false)
          }
          else {
            if (requestData == '') {
              let desorting = res.data.data
              console.log(res.data.data)
              const total = res.data.count
              setreqCount(total)
              setpageCount(Math.ceil(total / limit));
              desorting.sort((a, b) => b.id - a.id);
              setrequestData(res.data.data)
              setLoading(false)
            }
          }
          if (permission_usersdrop == '') {
            const AllUsers_drop = res.data.Leavelist_userslist;
            const newAllusers = { firstname: 'All', id: 'All' };
            AllUsers_drop.unshift(newAllusers);
            setPermission_usersdrop(AllUsers_drop)
          }

        })
        setsendfilter_id(userParam)
        setSelectedStatus(statusParam)
        setSelectedUserId(userName)


      } catch (error) {

      }

    }
    else {
      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/leaveListing/${paginationid}`,
          data: { 'employeeId': Profileid, 'Emp_level': AllowAccess, 'paginationId': paginationid, 'current_Page': currentPage, 'selectedUser': sendfilter_id, 'selectedStatus': selectedStatus, 'selectedDate': selectedDate },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {
          if (res.data.data == '') {
            setLoading(false)
          }
          else {
            if (requestData == '') {
              let desorting = res.data.data
              console.log(res.data.data)
              const total = res.data.count
              setreqCount(total)
              setpageCount(Math.ceil(total / limit));

              desorting.sort((a, b) => b.id - a.id);

              setrequestData(res.data.data)
              setLoading(false)
            }
          }
          if (permission_usersdrop == '') {
            const AllUsers_drop = res.data.Leavelist_userslist;
            const newAllusers = { firstname: 'All', id: 'All' };
            AllUsers_drop.unshift(newAllusers);
            setPermission_usersdrop(AllUsers_drop)
          }

        })



      } catch (error) {

      }
      console.log("View before Date format is", dateParam)
    }


  }

  useEffect(() => {
    getUserdata()

  })




  const navigate = useNavigate();
  sessionStorage.setItem("request", 'permission')
  const EditLeavelisting = (id, employee, empid, employeeID, email, mobileno, leave_type, start_date, end_date, comments) => {


    axios.get(`http://localhost:5000/viewPermission/${empid}`).then(res => {
      var res_formdata = res.data.data;


      navigate("/user/leaveForm", { state: res_formdata })

    })

    sessionStorage.setItem('empid', empid)

    sessionStorage.setItem('leave_type', leave_type)
    sessionStorage.setItem('start_date', start_date)
    sessionStorage.setItem('end_date', end_date)
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('reason', comments)


  }
  const [delAlert, setdelAlert] = useState(false);
  const deleteAlert = () => {
    setdelAlert(true)
  }
  const handleYes = (id) => {
    axios.delete(`http://localhost:5000/emplyeedel/${id}`)
    .then(() => {
      getUserdata();
    })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  const handleNo = () => {
    console.log('User chose No');
  };
  function EmployeeDelete(id) {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to delete this?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        handleYes(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleNo();
      }
    })
 }
  const ViewLeave_page = (id) => {
    axios.get(`http://localhost:5000/viewleaveReqpage/${id}`).then(res => {
      var res_viewdata = res.data.data;
      var accessLevel = res_viewdata[0].AccessLevel;



      navigate(`/user/leaveView`, {
        state: {
          ViewId: id,
          AccessLevel: accessLevel
        }
      });
    })
  }
  const [request, setrequest] = useState('')


  const AddLeave_Req = () => {

    navigate("/user/leaveForm")

    sessionStorage.removeItem("employee");
    sessionStorage.removeItem("employeeID");
    sessionStorage.removeItem("mobileno");
    sessionStorage.removeItem("leave_type");
    sessionStorage.removeItem("start_date");
    sessionStorage.removeItem("end_date");
    sessionStorage.setItem("request", 'leave');

  }
  let Profilename = sessionStorage.getItem("profileName", Profilename);
  let ProfileEmailid = sessionStorage.getItem('Proemail', ProfileEmailid)
  let UserMobileno = sessionStorage.getItem('Promobileno', UserMobileno)

  const [status, setStatus] = useState('Pending');

  // let  statusUpdate=location.state;

  const handleApprove = () => {

  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  const Approved_Record = async (label) => {

    Typesofrecords = label
    try {

      const response = axios({
        method: "post",
        url: `http://localhost:5000/leaveListing`,
        data: { 'employeeId': Profileid, 'Emp_level': AllowAccess, 'paginationId': Typesofrecords, 'current_Page': currentPage },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {

        setrequestData(res.data.data)
      })



    } catch (error) {

    }


  }
  const [currentPage, setcurrentPage] = useState('1')
  const [reqCount, setreqCount] = useState('')
  sessionStorage.setItem('reqCount', reqCount)
  const [paginationid, setpaginationid] = useState('Requested')
  const history = useNavigate();
  const Rejected_Record = async (label, nxtpage) => {
    setpaginationid(label)
    history(`/user/permission/${label}`);
    sessionStorage.setItem('permission_tab', label);
    setTabState(label)
    try {
      const data1 = axios({
        method: "post",
        url: `http://localhost:5000/leaveListing/${label}`,
        data: { 'employeeId': Profileid, 'Emp_level': AllowAccess, 'paginationId': label, 'current_Page': nxtpage, 'selectedUser': sendfilter_id, 'selectedStatus': selectedStatus, 'selectedDate': selectedDate },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {

        let desorting = res.data.data;
        const total = res.data.count
        setreqCount(total)
        setpageCount(Math.ceil(total / limit));
        desorting.sort((a, b) => b.id - a.id);

        setrequestData(desorting)
      })



    } catch (error) {

    }



  }




  const handlePageClick = async (data) => {
    let nxtpage = data.selected + 1;
    const commentsFormServer = await Rejected_Record(paginationid, nxtpage);

  };

  if (AllowAccess == 'L4') {
    sessionStorage.setItem('tabValue', 'Emplevel')
  }
  else {
    sessionStorage.setItem('tabValue', TabState)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [selectedUserId, setSelectedUserId] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sendfilter_id, setsendfilter_id] = useState('All')
  const UserStatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Pending', label: 'Pending' },
    { value: 'L3 Accepted', label: 'L3 Accepted' },
    { value: 'L2 Accepted', label: 'L2 Accepted' },
    { value: 'L2 Accepted and L1 Pending', label: 'L2 Accepted and L1 Pending' },
    { value: 'L3 Rejected', label: 'L3 Rejected' },
    { value: 'L2 Rejected', label: 'L2 Rejected' },
    { value: 'L1 Rejected', label: 'L1 Rejected' },
    { value: 'L1 Accepted', label: 'L1 Accepted' },
  ];

  const handleUserSelect = (user) => {
    history(`/user/permission/${paginationid}`)

    setSelectedUserId(user.firstname);
    setsendfilter_id(user.id)

  }
  const handleStatusOption = (option) => {
    history(`/user/permission/${paginationid}`)
    setSelectedStatus(option.label);

  }
  const handleReset_filter = () => {
    setSelectedStatus('All')
    setsendfilter_id('All')
    setSelectedUserId('All')
    setSelectedDate(null)
    history(`/user/permission/${paginationid}`)

  }
  const Submit_permissionfilter = () => {

    setIsModalOpen(!isModalOpen);
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:5000/leaveListing/${paginationid}`,
        data: { 'employeeId': Profileid, 'Emp_level': AllowAccess, 'paginationId': paginationid, 'current_Page': currentPage, 'selectedUser': sendfilter_id, 'selectedStatus': selectedStatus, 'selectedDate': selectedDate },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {


        let user_filters = res.data.data

        setrequestData(user_filters)
      })



    } catch (error) {

    }
    history(`/user/permission/${paginationid}?user=${sendfilter_id}&username=${selectedUserId}&status=${selectedStatus}&date=${selectedDate}`)
  }
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [updatedformatdate, setupdateformatdate] = useState();
  const handleDateChange = (date) => {

    // const inputDate = new Date(date);
    // const year = inputDate.getFullYear();
    // const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are 0
    // const day = String(inputDate.getDate()).padStart(2, '0');
    // const outputDateStr = `${year}-${month}-${day}`;
    // console.log("datepickers date format inia",outputDateStr)
    // setupdateformatdate(outputDateStr)
    setSelectedDate(date);
    console.log("selected date format", date)

  };
  const userChangeUrl = () => {

    history(`/user/permission/${paginationid}?user=$jayap&username=${selectedUserId}&status=${selectedStatus}&date=${selectedDate}`)

  }
  const Record_found = requestData.length;
  const back_tohome=()=>{
    navigate(`/user/home`);
  }
  return (
    <div>
      {Loading ? (<div animation="border" className="loader" />) : (
        <div className="Leavelisting">
          {/* <div className="permission_head">
              <ArrowBackIcon className="backIcon" ></ArrowBackIcon>

              <p className="leaveHeading">Leave Management</p>

              </div> */}
          <div className="formfill_head">
            <ArrowBackIcon className="record_backicon" onClick={back_tohome} ></ArrowBackIcon>
            <h4 className="permission_head">Leave Management</h4></div>
          {AllowAccess != 'L1' ? (<>
            {AllowAccess != 'L4' ? (<> <Tabs value={value} onChange={handleChange} centered>

              <Tab label="Requested" onClick={() => Rejected_Record("Requested", currentPage)} />
              <Tab label="Processing" onClick={() => Rejected_Record("Process", currentPage)} />
              <Tab label="Own" onClick={() => Rejected_Record("Own", currentPage)} />

            </Tabs></>) : (<></>)}
          </>) : (<>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Requested" onClick={() => Rejected_Record("Requested", currentPage)} />
              <Tab label="Processing" onClick={() => Rejected_Record("Process", currentPage)} />
            </Tabs>
          </>)}
          <div className="permisson_filter">
            <Button onClick={openModal}>Filter</Button>
          </div>

          <TableContainer component={Paper} className="leavelisting">
            <Table sx={{ minWidth: 1200 }} aria-label="customized table">
              <TableHead>
                <TableRow key={"item.id"}>
                  <StyledTableCell >Employee</StyledTableCell>
                  {/* <StyledTableCell >EmpID</StyledTableCell> */}
                  <StyledTableCell >Email</StyledTableCell>
                  <StyledTableCell>Mobileno</StyledTableCell>
                  <StyledTableCell >Leave Type</StyledTableCell>
                  <StyledTableCell >Start date</StyledTableCell>
                  <StyledTableCell >End date</StyledTableCell>
                  <StyledTableCell >Reason</StyledTableCell>
                  <StyledTableCell >Status</StyledTableCell>
                  <StyledTableCell >Edit</StyledTableCell>
                  <StyledTableCell >View</StyledTableCell>
                  <StyledTableCell >Delete</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {requestData.map((item, index) => {
                  return <StyledTableRow >
                    <StyledTableCell >{item.firstname}</StyledTableCell>
                    {/* <StyledTableCell >{item.employeeID}</StyledTableCell> */}
                    <StyledTableCell >{item.email}</StyledTableCell>
                    <StyledTableCell >{item.mobileno}</StyledTableCell>
                    <StyledTableCell >{item.leave_type}</StyledTableCell>
                    <StyledTableCell >{item.firstday}</StyledTableCell>
                    <StyledTableCell >{item.lastday}</StyledTableCell>
                    <StyledTableCell >{item.comments}</StyledTableCell>
                    <StyledTableCell ><Button className={item.Active_status == 'L1 Accepted' ? ("ApprovedActive") : item.Active_status == 'L2 Accepted' ? ("ApprovedActive") : item.Active_status == 'L3 Rejected' ? ('RejectedActive') : item.Active_status == 'L2 Rejected' ? ('RejectedActive') : item.Active_status == 'L1 Rejected' ? ('RejectedActive') : ("ActiveBtn")} onClick={handleApprove}>{item.Active_status}</Button></StyledTableCell>
                    <StyledTableCell className="deleted"><ModeEditOutlinedIcon type='submit' onClick={() => EditLeavelisting(item.id, item.empid, item.employee, item.employeeID, item.email, item.mobileno, item.leave_type, item.start_date, item.end_date, item.comments)}>Edit</ModeEditOutlinedIcon></StyledTableCell>
                    <StyledTableCell className="viewed">
                      {sessionStorage.getItem(`viewed_${item.id}`) === 'yes'}
                      <NavLink to={`/user/leaveview/${paginationid}/${item.id}`} className="Viewlink">
                        <RemoveRedEyeIcon ></RemoveRedEyeIcon>
                      </NavLink>
                    </StyledTableCell>
                    {/* <StyledTableCell  className="viewed" ><NavLink to={`/user/leaveview/${paginationid}/${item.id}`} className="Viewlink">View</NavLink ></StyledTableCell> */}
                    <StyledTableCell className="deleted"><DeleteIcon onClick={() => EmployeeDelete(item.id)} >Delete</DeleteIcon></StyledTableCell>

                  </StyledTableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {AllowAccess == 'L1' ? (<></>) : (<><Button variant="primary" id="addleave" onClick={AddLeave_Req} >Add Leave</Button></>)}
          {Record_found == '0' ? (<><Norecord_component /></>) : (<></>)}
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />

         
          {isModalOpen && (
            <div className="Leavepermission-allDrop">

              <div className="permission-Usersdrop">
                <p id='per_usershead' >Users</p>
                <DropdownButton id="dropdown_01" title={selectedUserId}>
                  {permission_usersdrop.map((user, index) => (
                    <Dropdown.Item key={index} onClick={() => handleUserSelect(user)} >
                      {user.firstname}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>

              <div className="permission-Statusdrop" >
                <p id='per_statushead'>Status</p>
                <DropdownButton id="dropdown_02" title={selectedStatus}>
                  {UserStatusOptions.map((option) => (
                    <Dropdown.Item key={option.value} onClick={() => handleStatusOption(option)}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <div id='date_dropdown3'>
                <p id='per_datehead'>Date</p>
                <DatePicker selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  showTimeSelect={false}
                  className="react-datepicker-ignore-onclickoutside" />

              </div>



              <Button className="submit_perfilter" onClick={Submit_permissionfilter}>
                Submit
              </Button>
              <Button className="btn btn-danger mt-3" onClick={handleReset_filter}  >
                Reset
              </Button>

            </div>
          )}
        </div>

      )}

    </div>

  )
}

export default LeaveRequestlisting