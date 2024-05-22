import React, { useState, useEffect, props, useCallback } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from "react-router-dom";
import "./home.css";
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import _ from "lodash";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import ImageViewer from 'react-simple-image-viewer';
import { createGlobalState } from 'react-hooks-global-state';
import * as ReactBootStrap from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import * as XLSX from 'xlsx';
import ExcelExportButton from "./ExcelExportButton";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ActionsDropdown from "./ActionsDropdown";
import ReportPage from "./ReportPage";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
var limit = 5;
function Home() {
  const [page, setpageCount] = useState()
  const [update, setUpdate] = useState([])
  const [viewData, setviewData] = useState([])
  const [product, setProduct] = useState([])
  const [viewproduct, setviewProduct] = useState([])
  const [currentPage, setCurrentpage] = useState()
  const [previewImg, setPreviewImg] = useState()
  const [showExceldata, setshowExceldata] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  let Viewbackpage = (location.state)
  let updateViewbackpage = (Math.ceil(Viewbackpage / 2));
  const history = useNavigate();

  const getUserdata = async (id, myArray) => {
    const data = await axios.get(`http://localhost:5000/userslist/${id}/${updateViewbackpage}`).then(res => {

      const myArray = ('Data', res.data.data)
      setshowExceldata(res.data.listing)
      setProduct(res.data.data)
      const total = res.data.count
      setpageCount(Math.ceil(total / limit));

      if (updateViewbackpage == '') {
        updateViewbackpage = 1;
      }
      else {
        updateViewbackpage = updateViewbackpage
      }
      setCurrentpage(updateViewbackpage);
      return data;

    })

  }
  const pagination = () => {
    setpageCount(page)
  }
  const fetchComments = async (currentPage, id) => {
    const res = await fetch(
      `http://localhost:5000/userslist/${id}/${currentPage}`
    );
    const data = await res.json();
    const data1 = data.data

    return data1;
  };
  const handlePageClick = async (data) => {

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);
    setProduct(commentsFormServer);
  };
  function imgedit(currentPage, id) {
    axios.get(`http://localhost:5000/images/${id}/${currentPage}`).then(res => {
      const imageEdit = (res.data)

    })
    navigate("/form")
  }
  const handleYes = (id) => {
    axios.delete(`http://localhost:5000/usersdel/${id}`)
      .then(() => {
        getUserdata();
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };



  const handleNo = () => {
    console.log("user choice is no")
  };
  const userDel = (id) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to delete this user?',
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
    });
  };
  const navigate = useNavigate();
  function handleEdit({ id, firstname, lastname, email, mobileno, country, city, password, gender, employeeId, AccessLevel, update, profile }) {
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('firstname', firstname)
    sessionStorage.setItem('lastname', lastname)
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('mobileno', mobileno)
    sessionStorage.setItem('country', country)
    sessionStorage.setItem('city', city)
    sessionStorage.setItem('password', password)
    sessionStorage.setItem('gender', gender)
    sessionStorage.setItem('update', 'test')
    sessionStorage.setItem('employeeId', employeeId)
    sessionStorage.setItem('AccessLevel', AccessLevel)

    axios.get(`http://localhost:5000/viewPage/${id}`).then(res => {
      var res_formdata = res.data.data;

      navigate("/user/form", { state: res_formdata })

    })
  }
  useEffect(() => {
    setTimeout(() => {
      getUserdata();
      setIsLoading(false);
    }, 2000);

  }, [])
  useEffect((id) => {
    axios.get(`http://localhost:5000/images/${id}/${currentPage}`).then(res => {
      const imageEdit = (res)

    })
  })
  useEffect(() => {
    handlePrev();
  }, [])
  const pages = _.range(1, page + 1)
  const handlePage1 = async (currentPage, id) => {
    const res = await fetch(
      `http://localhost:5000/userslist/${id}/${currentPage}`

    );
    const data = await res.json();
    const data1 = data.data

    return data1;
  }
  const handlePrev = async (data) => {

    let currentPage = data;

    const commentsFormServer = await handlePage1(currentPage);
    setProduct(commentsFormServer);
    setCurrentpage(currentPage);
  }
  const handlePage2 = async (data) => {

    let currentPage = data;

    const commentsFormServer = await handlePage1(currentPage);
    setProduct(commentsFormServer);
    setCurrentpage(currentPage);
  };


  const handleChange = async (id, Status) => {

    let SendStatus = 'True'
    if (Status == 'True') {
      SendStatus = 'False'
    }


    axios.put(`http://localhost:5000/userStatus/${id}`, { SendStatus },

    )
      .then(res => {



      })
    const Pro_Product = product;

    const objIndex = Pro_Product.findIndex((obj => obj.id == id));

    Pro_Product[objIndex].Active_Status = SendStatus;



    const updateArray = [...product]
    setProduct(updateArray)

  };
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    ImageLink
  ];
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const openProfile = useCallback((index, getItem, item) => {
    ImageLink = item
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const initialState = { currentImage: 0 };
  const { useGlobalState } = createGlobalState(initialState);
  const [currentImage, setCurrentImage] = useGlobalState('currentImage');

  const ViewUser_page = (id) => {
    axios.get(`http://localhost:5000/viewPage/${id}`).then(res => {
      var res_viewdata = res.data.data;

      navigate("/user/view", { state: res_viewdata })
    })
  }
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const AttendanceSummary = (id) => {
    navigate("/user/summary", { state: id })

  }
  const AddUsers = (id, firstname, lastname, email, mobileno, country, city, password, gender, employeeId, AccessLevel, profile) => {
    sessionStorage.setItem('update', 'new')
    sessionStorage.removeItem('id', id)
    sessionStorage.removeItem('firstname', firstname)
    sessionStorage.removeItem('lastname', lastname)
    sessionStorage.removeItem('email', email)
    sessionStorage.removeItem('mobileno', mobileno)
    sessionStorage.removeItem('country', country)
    sessionStorage.removeItem('city', city)
    sessionStorage.removeItem('password', password)
    sessionStorage.removeItem('gender', gender)
    sessionStorage.removeItem('employeeId', employeeId)
    sessionStorage.removeItem('AccessLevel', AccessLevel)
    navigate("/user/form")
  }
  const goback_home=()=>{
    navigate(`/user/home`)
  }
  return (
    <div>
      {isLoading ? (<div animation="border" className="loader" />) : (
        <div className="tableStl">
          <ArrowBackIcon className="record_backicon" onClick={goback_home}></ArrowBackIcon>
          <div className="userRcord_heading">
            <h5 className="record_subhead">
              Users Details</h5>
          </div>
     


          <div className="Export_btn">
            <ExcelExportButton fileName="User Data" Heading="User Details" sheetHead="User Data" identifier="userlistPage" />

          </div>
          <div>
            <Button className="AddUsers" onClick={AddUsers}>Add User</Button>
          </div>
          <TableContainer component={Paper} className="userliststl">
            <Table sx={{ minWidth: 1200 }} aria-label="customized table">
              <TableHead>
                <TableRow key={"item.id"}>
                  <StyledTableCell >Profile</StyledTableCell>
                  <StyledTableCell align="center">EmpId</StyledTableCell>
                  <StyledTableCell align="right">First Name</StyledTableCell>
                  <StyledTableCell align="left">Last Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="right">Mobile No</StyledTableCell>
                  <StyledTableCell align="right">Country</StyledTableCell>
                  <StyledTableCell align="center">City</StyledTableCell>
                  <StyledTableCell align="right">Gender</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Level</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  {/* <StyledTableCell align="right">Edit</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell> */}

                </TableRow>
              </TableHead>
              <TableBody>
                {product.map((item, index) => {
                  return <StyledTableRow >
                    <StyledTableCell  ><div> <img src={"http://localhost:5000/images/" + item.id}
                      onClick={() => openProfile(1, item, "http://localhost:5000/images/" + item.id)}
                      width="45"
                      key={item}
                      style={{ margin: '0px', borderRadius: '28px', height: '40px' }}
                      alt=""
                    />

                      {isViewerOpen && (
                        <ImageViewer
                          src={images}
                          disableScroll={false}
                          closeOnClickOutside={true}
                          onClose={closeImageViewer}
                        />
                      )}</div> </StyledTableCell>
                    <StyledTableCell align="right">{item.employeeId}</StyledTableCell>
                    <StyledTableCell  >{item.firstname}</StyledTableCell >
                    <StyledTableCell align="right">{item.lastname}</StyledTableCell>
                    <StyledTableCell align="right">{item.email}</StyledTableCell>
                    <StyledTableCell align="right">{item.mobileno}</StyledTableCell>
                    <StyledTableCell align="right">{item.country}</StyledTableCell>
                    <StyledTableCell align="right">{item.city}</StyledTableCell>
                    <StyledTableCell align="right">{item.gender}</StyledTableCell>
                    <StyledTableCell align="right"><Stack direction="row" alignItems="center">
                      <Switch onClick={() => handleChange(item.id, item.Active_Status)} checked={item.Active_Status == 'True' ? 1 : 0}></Switch>
                    </Stack></StyledTableCell>
                    <StyledTableCell align="center">{item.AccessLevel}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Nav>
                        <NavDropdown title="Actions" id="basic-nav-dropdown" className="custom-dropdown">
                          <NavDropdown.Item onClick={() => AttendanceSummary(item.id)} ><SummarizeOutlinedIcon></SummarizeOutlinedIcon>Summary</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => handleEdit(item)} ><ModeEditOutlinedIcon></ModeEditOutlinedIcon>Edit</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => ViewUser_page(item.id)}><RemoveRedEyeIcon ></RemoveRedEyeIcon>View</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => userDel(item.id)}><DeleteIcon ></DeleteIcon>Delete</NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </StyledTableCell>
                    {/* <ActionsDropdown /> */}
                    {/* <StyledTableCell align="right" className="deleted"><ModeEditOutlinedIcon type='submit' onClick={() => handleEdit(item)}>Edit</ModeEditOutlinedIcon></StyledTableCell>
                  <StyledTableCell align="right" className="deleted"><DeleteIcon onClick={() => userDel(item.id)}>Delete</DeleteIcon></StyledTableCell> */}
                    <StyledTableCell ></StyledTableCell>
                  </StyledTableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <nav className="nav-pagination">
            <div className="page-list">
              <ul className="userlistpagination">
                <li className={currentPage > 1 ? "" : "Page-Disable"}><div ><ArrowBackIcon onClick={() => handlePrev(currentPage - 1)} /></div></li>
                {
                  pages.map((page, i) => (
                    <li className={page == currentPage ? "pagiantion_selected" : "pagination_unselected"}
                      onClick={() => handlePage2(page)} >{page}</li>))

                }
                <li className={currentPage < page ? "" : "Page-Disable"}><div><ArrowForwardIcon onClick={() => handlePrev(currentPage + 1)} /></div></li>
              </ul>
            </div>
          </nav>
        </div>
      )}

      {/* <ReactPaginate 
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={""}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      /> */}

    </div>
  );
}
export default Home;  
