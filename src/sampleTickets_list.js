import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./sample_ticket.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableBody from '@mui/material/TableBody';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation, NavLink, useHistory } from "react-router-dom";
import _ from "lodash";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

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

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
var limit = 2;
export default function SampleTickets_list({ updateData }) {
  const [ticket, setticket] = useState([])
  const [addNewemail, setaddNewemail] = useState('');
  const [Buffer, setBuffer] = useState(true);
  const [users_dropdown, setusers_dropdown] = useState('')
  const [users_Status, setusers_Status] = useState([])
  const [Email_List, setEmail_List] = useState([{ From_email: "" }])
  const [Edit, setEdit] = useState()
  let Profileid = sessionStorage.getItem("proid", Profileid)
  const history = useNavigate();
  const { Current_tab } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const check_URLorEmpty = location.search
  const userParam = queryParams.get('user') || '';
  const useranmeparam = queryParams.get('username') || '';
  const statusParam = queryParams.get('status') || '';
  const storedTabCurrent = sessionStorage.getItem('tabCurrent');
  const getUserdata = async (id, myArray) => {
    let label = 'Own';

    if (storedTabCurrent) {

      if (storedTabCurrent == 'Own') {
        setValue(0)
      }
      else {
        setValue(1)
      }

      setTabCurrent(storedTabCurrent);
    }
    if (check_URLorEmpty != '') {
      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/TicketRise_listing/${label}`,
          data: { 'employeeId': Profileid, 'tab_label': tabCurrent, 'filter_user': userParam, 'filter_status': statusParam },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {
          const ticket_data = (res.data.data);
          setticket(ticket_data)
          const ALlUSers_drpdown = res.data.allDrpdown_users;
          const newAllusers = { firstname: 'All', id: 'All' };
          ALlUSers_drpdown.unshift(newAllusers);
          setusers_dropdown(ALlUSers_drpdown)

          setEmail_List(null)
        })

        setsendfilter_id(userParam)
        setSelectedStatus(statusParam)
        setSelectedUserId(useranmeparam)

      } catch (error) {

      }
    }
    else {
      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/TicketRise_listing/${label}`,
          data: { 'employeeId': Profileid, 'tab_label': tabCurrent, 'filter_user': sendfilter_id, 'filter_status': selectedStatus },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {
          const ticket_data = (res.data.data);
          setticket(ticket_data)
          const ALlUSers_drpdown = res.data.allDrpdown_users;
          const newAllusers = { firstname: 'All', id: 'All' };
          ALlUSers_drpdown.unshift(newAllusers);
          setusers_dropdown(ALlUSers_drpdown)

          setEmail_List(null)
        })



      } catch (error) {

      }
    }

  }
  useEffect(() => {
    getUserdata();

  }, [])

  const navigate = useNavigate();
  const [navemail, setnavemail] = useState('')
  const handleEdit = async (id) => {
    const data = await axios.get(`http://localhost:5000/ticketEdit/${id}`).then(res => {
      const edit_ticket = (res.data.ticket);
      const email_ticket = res.data.data;

      setnavemail(email_ticket)
      let id = edit_ticket.map((item) => item.id);
      let names = edit_ticket.map((item) => item.name);
      let subject = edit_ticket.map((item) => item.subject);
      let message = edit_ticket.map((item) => item.message);
      let email = edit_ticket.map((item) => item.email);
      let select_name = email_ticket.map((item) => item.name);
      let select_mainid = email_ticket.map((item) => item.id);
      let edit_name = names.toString();
      let edit_subject = subject.toString();
      let edit_message = message.toString();
      let edit_email = email.toString();
      let edit_mainid = select_mainid.toString();
      let edit_addname = select_name.toString();
      let edit_id = id.toString();
      sessionStorage.setItem('name', edit_name)
      sessionStorage.setItem('subject', edit_subject)
      sessionStorage.setItem('message', edit_message)
      sessionStorage.setItem('id', edit_id)
      sessionStorage.setItem('addname', edit_addname)
      sessionStorage.setItem('mainid', edit_mainid)
      sessionStorage.setItem('Edit', 'test')



    })
    const datanavigate = await axios.get(`http://localhost:5000/ticketEdit/${id}`)
      .then(res => {
        let ticket_email = res.data.data;
        setaddNewemail(ticket_email)
        let email = ticket_email.map((item) => item.email);
        let flag_data = ticket_email.map((item) => item.flag);
        let id = ticket_email.map((item) => item.id);
        const ticket_emailid = email
        sessionStorage.setItem("email_data", id)
        let mainEmailid = sessionStorage.setItem("Email_id", email)
        sessionStorage.setItem("flag", flag_data)

      })
    navigate("/user/contact_us", { state: addNewemail })
  }

  const tickets_del = (id) => {

    axios.put(`http://localhost:5000/deleteTicketlist/${id}`)
      .then(() => {
        getUserdata();
      })
  }

  const AddTickets = () => {
    navigate("/user/contact_us")
    sessionStorage.setItem('Edit', 'new')
  }

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBuffer(false)

    }, 2000)
  });

  let TiketData_Array = ticket.map(item => {
    return {
      subject: item.subject,
      message: item.message,


    };
  });
  const [tabCurrent, setTabCurrent] = useState(storedTabCurrent);
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const TabWiseRecords = async (label) => {
    setTabCurrent(label)
    history(`/user/ticket/${label}`);

    sessionStorage.setItem('tabCurrent', label);
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:5000/TicketRise_listing/${label}`,
        data: { 'employeeId': Profileid, 'tab_label': label, 'filter_user': sendfilter_id, 'filter_status': selectedStatus },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {

        let desorting = res.data.data

        setticket(desorting)
      })



    } catch (error) {

    }

  }

  const Record_found = ticket.length;
  const [showDropdowns, setShowDropdowns] = useState(false);

  const toggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };
  const Submit_UsersDrop = () => {
    setShowDropdowns(!showDropdowns);
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:5000/TicketRise_listing/${tabCurrent}`,
        data: { 'employeeId': Profileid, 'tab_label': tabCurrent, 'filter_user': sendfilter_id, 'filter_status': selectedStatus },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {


        let user_filters = res.data.data

        setticket(user_filters)
      })



    } catch (error) {

    }
    history(`/user/ticket/${tabCurrent}?user=${sendfilter_id}&username=${selectedUserId}&status=${selectedStatus}`)

  }
  const [selectedUserId, setSelectedUserId] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sendfilter_id, setsendfilter_id] = useState('All')
  const handleUserSelect = (user) => {

    history(`/user/ticket/${tabCurrent}`)
    setSelectedUserId(user.firstname);
    setsendfilter_id(user.id)
  }
  const handleStatusOption = (option) => {
    history(`/user/ticket/${tabCurrent}`)
    setSelectedStatus(option.label);

  }

  const UserStatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'pending', label: 'pending' },
    { value: 'Completed', label: 'Completed' },
  ];

  const handleResetFirstRow = () => {
    setSelectedStatus('All')
    setsendfilter_id('All')
    setSelectedUserId('All')
    history(`/user/ticket/${tabCurrent}`)
  };

  // const Show_highlight=sessionStorage.getItem('tab_label')
  const back_tohome=()=>{
    navigate(`/user/home`);
  }
  return (
    <div >
      {Buffer ? (<div animation="border" className="loader" />) : (
        <div className="tickets_head">

          <div className="ticketfill_head">
            <ArrowBackIcon className="ticket_backicon" onClick={back_tohome} ></ArrowBackIcon>
            <h4 className="tic_head">Tickets Raise</h4></div>
          <div className="addtic_btn">
          <div className="filter_container ">
              <Button onClick={toggleDropdowns} className="dropdown_icons">Filter
                <KeyboardArrowDownIcon />
              </Button>
            </div>&nbsp;&nbsp;&nbsp;
            <div>
              <Button variant="primary" id="Add_button" onClick={AddTickets}>Add Tickets</Button>

            </div>
            
          </div>
          <div className="Tabs_Tickets">
            <Tabs value={value} onChange={handleChange} centered >
              <Tab label="Own" onClick={() => TabWiseRecords("Own")} />
              <Tab label="Others" onClick={() => TabWiseRecords("Others")} />
            </Tabs>
          </div>
          {/* <ExcelExportButton  fileName="Tickets Data" Heading="Ticket Details" sheetHead="Tickets Data" identifier="TicketListPage"/> */}
          <TableContainer component={Paper} className="sampleliststl">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow key={"item.id"}>
                  {value == '0' ? (<>  <StyledTableCell >To</StyledTableCell></>) : (<>  <StyledTableCell >From</StyledTableCell></>)}

                  <StyledTableCell >Subject</StyledTableCell>
                  <StyledTableCell >Message</StyledTableCell>
                  <StyledTableCell >Status</StyledTableCell>
                  <StyledTableCell>View</StyledTableCell>
                  {/* <StyledTableCell >Delete</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {ticket.map((item, index) => {
                  return <StyledTableRow >
                    <StyledTableCell >{item.firstname}</StyledTableCell>
                    <StyledTableCell >{item.Subject}</StyledTableCell>
                    <StyledTableCell >{item.Message}</StyledTableCell>
                    <StyledTableCell ><Button className={item.status == 'pending' ? ("pendingTicket_Active") : ("Completed_acive")}>{item.status}</Button></StyledTableCell>
                    <StyledTableCell className="viewed" ><NavLink to={`/user/Ticketview/${tabCurrent}/${item.id}`} className="Viewlink"><RemoveRedEyeIcon ></RemoveRedEyeIcon></NavLink ></StyledTableCell>

                    {/* <StyledTableCell  className="deleted"><ModeEditOutlinedIcon type='submit'  onClick={() => handleEdit(item.id)}>Edit</ModeEditOutlinedIcon></StyledTableCell> */}
                    {/* <StyledTableCell  className="deleted"><DeleteIcon onClick={() => tickets_del(item.id)} >Delete</DeleteIcon></StyledTableCell> */}
                  </StyledTableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {Record_found == '0' ? (
            <div class="no-record">
              <p>No records found.</p>

            </div>) : (<></>)}




          {showDropdowns && (
            <div className="Overall_dropdownshowed">

              <div className="Userselt_drop">
                <p id="Users_headingticket">Users</p>
                <DropdownButton id="dropdown1" title={selectedUserId}>
                  {users_dropdown.map((user, index) => (
                    <Dropdown.Item key={index} onClick={() => handleUserSelect(user)}>
                      {user.firstname}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>

              <div className="UserStatus_drop">
                <p id="Status_headtic">Status</p>
                <DropdownButton id="dropdown2" title={selectedStatus}>
                  {UserStatusOptions.map((option) => (
                    <Dropdown.Item key={option.value} onClick={() => handleStatusOption(option)}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>




              <button className="btn btn-success mt-3" onClick={Submit_UsersDrop}>
                Submit
              </button>
              <button className="btn btn-danger mt-3" onClick={handleResetFirstRow}>
                Reset
              </button>
              {/* <button className="btn btn-danger mt-3" onClick={toggleDropdowns}>
            Close Dropdowns
          </button> */}
            </div>
          )}

        </div>)}

    </div>
  )
}
