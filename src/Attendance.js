import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, PieChart, Pie, Scatter, ScatterChart, ComposedChart, Line, BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import "./Attendance.css";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserSlash } from "@fortawesome/free-solid-svg-icons";
// import DatePicker from "react-datepicker";
import DatePicker from 'rsuite/DatePicker';
import { startOfWeek, endOfWeek, format, getISOWeek } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import 'rc-calendar/assets/index.css';
import { useParams } from 'react-router-dom';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'react-calendar/dist/Calendar.css';
// import "react-datepicker/dist/react-datepicker.css";
import enGB from 'date-fns/locale/en-GB';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import "rsuite/dist/rsuite.css";
import logo from "./images/logo_kpi.png";
import moment from 'moment';
import { curveCardinal } from 'd3-shape';
import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AttendanceChart = () => {
  const [Buffer, setBuffer] = useState(true);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState('')
  const [year, setYear] = useState([current_year])
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState(' Attendance Summary')
  const getKpiUserdata = () => {
    try {

      const response = axios({
        method: "post",
        url: `http://localhost:5000/kpi_data`,
        data: { 'Month': [currentMonth], 'weekly': weeklyKpi, 'year_kpi': [currentYear] },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {
        setloading(false)

        const kpi_chart = res.data.data;
        const kpi_absent = res.data.Absent;
        const most_preDay = res.data.Most_preDay;
        const most_absentDay = res.data.Most_absentDay;
        setShow_kpiData(kpi_chart)
        setAbsent_kpiData(kpi_absent)
        setMostPre_day(most_preDay)
        setMostabsent_day(most_absentDay)
        setloading(false)
      })



    } catch (error) {

    }
  }
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const getUserdata = () => {

    try {
      const response = axios({
        method: "post",
        url: `http://localhost:5000/summary`,
        data: { 'year_pass': [currentYear], 'Month': [currentMonth], 'User': ['0'] },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {

        const chart_data = res.data.data;
        setData(chart_data)
      })


    } catch (error) {

    }
  }
  const [users_Dropdown, setusers_Dropdown] = useState([])
  const UsersDropdown = async () => {
    const data = await axios.get(`http://localhost:5000/UsersDropdown`).then(res => {
      const UsersDropdown = (res.data.data);

      setusers_Dropdown(UsersDropdown)
    })
  }
  useEffect(() => {
    setTimeout(() => {
      getUserdata();
      UsersDropdown();
      getKpiUserdata();
      setBuffer(false)
      getUser_list();


    }, 2000);
  }, []);
  const date = new Date();
  const current_Month = date.getMonth();
  const current_year = date.getFullYear();
  console.log("curre_year", current_year)

  const [selectedOption, setSelectedOption] = useState(currentMonthName);
  const [weeklyKpi, setWeeklykpi] = useState('')
  const [MonthKpi, setMonthKpi] = useState(currentMonthName);
  const [Show_kpiData, setShow_kpiData] = useState([])
  const [Absent_kpiData, setAbsent_kpiData] = useState([])
  const [MostPre_day, setMostPre_day] = useState([])
  const [Mostabsent_day, setMostabsent_day] = useState([])
  const [show_Month, setshow_Month] = useState([current_Month]);
  const [show_KpiMonth, setshow_KpiMonth] = useState();
  const [show_Userlist, setshow_Userlist] = useState(['0']);
  const [show_daily, setshow_daily] = useState(['0']);
  const [selecteduserwise, setSelecteduserwise] = React.useState(0);
  const [selectedCherttypewise, setselectedCherttypewise] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(0);
  const [selected_Dropdown, setselected_Dropdown] = React.useState(0);
  const [weeklyWise, setWeeklyWise] = useState()
  const [selectedYear, setselectedYear] = useState([current_year]);
  const [selected_kpiYear, setselected_kpiYear] = useState([current_year]);
  const [selectedUser, setselectedUser] = useState('');
  const [typesFilter, settypesFilter] = useState();
  const [selectedCharttype, setselectedCharttype] = useState('BarChart');
  const [typesof_dropdown, settypesof_dropdown] = useState();
  const [lastfil, setlastfil] = useState();
  const [chart_drop, setChart_drop] = useState();
  const [popup, setpopup] = useState([]);
  const [title_model, settitle_model] = useState();
  const [popupmonth, setpopupmonth] = useState(currentMonthName);
  const [Presentpop, setPresentpop] = useState([])
  const [Absentpop, setAbsentpop] = useState([])
  const [Offpop, setOffpop] = useState([])
  const [loading, setloading] = useState([])
  const weekly_value = [
    { value: '00', label: 'All' },
    { value: '01', label: 'Monday' },
    { value: '02', label: 'Tuesday' },
    { value: '03', label: 'Wednesday' },
    { value: '04', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
    { value: '7', label: 'Sunday' },

  ]
  const options = [

    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'Septamber' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
  const date_pic = [

    { value: '01' },
    { value: '02' },
    { value: '03' },
    { value: '04' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10' },
    { value: '11' },
    { value: '12' },
    { value: '13' },
    { value: '14' },
    { value: '15' },

  ];
  const year_drop = [
    { value: '2024' },
    { value: '2025' },
    { value: '2026' },
    { value: '2027' },
    { value: '2028' },

  ]
  const Chart_dropdown = [

    { label: '01', value: 'BarChart' },
    { label: '02', value: 'AreaChart' },
    { label: '03', value: 'LineChart' },
    { label: '04', value: 'ComposedChart' },
  ]
  const user_filter = [
    { value: 'All', label: '1' },
    { value: 'Divya', label: '2' },
    { value: 'Gnana Prakash', label: '3' },
    { value: 'Jaya Praksh', label: '4' },
    { value: 'Sowthri', label: '5' },
    { value: 'Srivanthi', label: '6' },
    { value: 'Thiru', label: '7' },
    { value: 'Sampath', label: '8' },
    { value: 'Vijay', label: '9' },
    { value: 'Vinu', label: '10' },

  ]
  const Typesof_drop = [
    { value: 'Monthly' },
    { value: 'Yearly' },
    { value: 'Daily' },

  ]
  const Typesof_Kpidrop = [
    { value: 'Monthly' },
    { value: 'Yearly' },
    { value: 'Weekly' },

  ]
  const Last_drop = [
    { value: 'Frequent' },
    { value: 'User Wise' },

  ]
  const handleChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption(selectedIndex);
    alert(selectedIndex)
  };
  const Kpi_submit = () => {

    if (selected_Dropdown == 0) {
      setloading(true)
      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/kpi_data`,
          data: { 'Month': show_KpiMonth, 'weekly': weekStart, 'year_kpi': selected_kpiYear },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {

          const kpi_chart = res.data.data;
          const kpi_absent = res.data.Absent;
          const most_preDay = res.data.Most_preDay;

          const most_absentDay = res.data.Most_absentDay;
          setShow_kpiData(kpi_chart)
          setAbsent_kpiData(kpi_absent)
          setMostPre_day(most_preDay)
          setMostabsent_day(most_absentDay)
          setloading(false)
        })



      } catch (error) {

      }
    }
    else if (selected_Dropdown == 1) {
      setloading(true)
      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/yearlyWise_kpi`,
          data: { 'year_kpi': selected_kpiYear },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {

          const kpi_chart = res.data.data;
          const kpi_absent = res.data.Absent;
          const most_preDay = res.data.Most_preDay;
          const most_absentDay = res.data.Most_absentDay;
          setShow_kpiData(kpi_chart)
          setAbsent_kpiData(kpi_absent)
          setMostPre_day(most_preDay)
          setMostabsent_day(most_absentDay)
          setloading(false)
        })



      } catch (error) {

      }
    }
    else {
      setloading(true)
      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/kpi_datepicker`,
          data: { 'week_start': weekStart, 'weekend': selectednewDate },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {

          const kpi_chart = res.data.data;

          const kpi_absent = res.data.most_absent;
          const most_preDay = res.data.Most_preDay;
          const most_absentDay = res.data.Most_absentDay;
          setShow_kpiData(kpi_chart)
          setAbsent_kpiData(kpi_absent)
          setMostPre_day(most_preDay)
          setMostabsent_day(most_absentDay)
          setloading(false)
        })



      } catch (error) {

      }
    }

  }
  const Submit_Process = async (event) => {
    if (selecteduserwise == 1 && selectedFile == 1) {
      const selectedIndex = event.target.selectedIndex;
      setSelectedOption(selectedIndex);

      setselectedYear(year)


      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/year_userwise`,
          data: { 'year_pass': selectedYear, 'Month': show_Month, 'User': show_Userlist },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {

          const chart_data = res.data.data;
          setData(chart_data)
        })



      } catch (error) {

      }

    }
    else if (selecteduserwise == 0 && selectedFile == 1) {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);

      setSelectedFile(formData)
      setselectedYear(year)

      setBuffer(true)
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/chart_user`,
          data: { 'file': selectedFile},
          headers: { 'Content-Type': "application/json" },

        }).then(res => {

          const chart_data = res.data.data;
          setData(chart_data)
        })

        setBuffer(false)
      } catch (error) {

      }
    }
    else if (selecteduserwise == 1) {
      const selectedIndex = event.target.selectedIndex;
      setSelectedOption(selectedIndex);

      setselectedYear(year)
      setBuffer(true)

      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/date_picker`,
          data: { 'year_pass': selectedYear, 'Month': show_Month, 'User': show_Userlist, 'date_picker': selectedDate },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {

          const chart_data = res.data.data;
          setData(chart_data)
        })

        setBuffer(false)

      } catch (error) {

      }

    }

    else if (selecteduserwise == 0 && selectedFile == 0) {
      const selectedIndex = event.target.selectedIndex;
      setSelectedOption(selectedIndex);

      setselectedYear(year)

      setBuffer(true)
      // alert(year)
      try {

        const response = axios({
          method: "post",
          url: `http://localhost:5000/summary`,
          data: { 'year_pass': year, 'Month': show_Month, 'User': show_Userlist },
          headers: { 'Content-Type': 'application/json' },

        }).then(res => {

          const chart_data = res.data.data;
          setData(chart_data)
        })

        setBuffer(false)


      } catch (error) {

      }

    }



  }
  const [selectedDate, setSelectedDate] = useState('');

  function handleDateChange(date) {
    setSelectedDate(date);

  }
  const handleReset = () => {
    getUserdata()
    setSelectedOption('June');
    setselectedUser('All');
    setselectedYear([current_year])
    settypesFilter('Monthly')
    setSelectedFile('0')
    setshow_Userlist(['0'])
    setshow_Month(['2'])
    setSelectedDate(null)
    setlastfil('Frequent')
    setSelecteduserwise('0')




  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAbsentpop([])
    setPresentpop([])
    setOffpop([])
  }
  function handleShow(e) {
    setloading(true)
    setShow(true)
    const demochart = e.activeLabel

    settitle_model(demochart)
    // setselectedYear(year)


    try {

      const response = axios({
        method: "post",
        url: `http://localhost:5000/bar_click`,
        data: { 'year_pass': selectedYear, 'Month': show_Month, 'popup_date': demochart },
        headers: { 'Content-Type': 'application/json' },

      }).then(res => {

        const chart_data = res.data.data;

        setpopup(chart_data)
        setPresentpop(chart_data.Present)
        setAbsentpop(chart_data.Absent)
        console.log("Present Data Name Printed", chart_data)
        setOffpop(chart_data.Off)
        setloading(false)
      })


    } catch (error) {

    } finally {

    }
  }
  let title = "Most Present";
  let value = "Vijay";
  const firstNames = Show_kpiData.map(obj => obj.firstname);
  const top_Absent = Absent_kpiData.map(obj => obj.firstname);
  const Mostabsent_days = Mostabsent_day.map(obj => obj.date);
  const MostPre_days = MostPre_day.map(obj => obj.date);
  const Present_dayname = MostPre_day.map(obj => obj.day_name);
  const Absent_dayname = Mostabsent_day.map(obj => obj.day_name);
  const Abset_title = "Most Absent";
  const Absent_date = "Most Absent Day";
  const Present_date = "Most Present Day";
  const [selectednewDate, setSelectednewDate] = useState();
  const [weekStart, setWeekStart] = useState('');
  const handleDatenewChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const weekCount = getISOWeek(date);

      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      const Week_Start = format(weekStart, 'yyyy-MM-dd');

      setWeekStart(Week_Start)
      const Week_End = format(weekEnd, 'yyyy-MM-dd');
      setSelectednewDate(Week_End)

    }
  };

  const Handle_resetKpi = () => {
    getKpiUserdata();
    setMonthKpi(['6'])
    settypesFilter('Month')
    setselected_kpiYear(['2023'])
    setMonthKpi('June')
    setselected_Dropdown(['0'])
    setSelectedDate('')
    settypesof_dropdown('Monthly')
  }
  const startDate = selectedDate ? startOfWeek(selectedDate, { weekStartsOn: 1 }) : null;
  const endDate = selectedDate ? endOfWeek(selectedDate, { weekStartsOn: 1 }) : null;
  const [value_rsuit, setValue_rsuit] = React.useState(null);

  const handleWeekChange = (weekValue) => {
    setValue_rsuit(weekValue);
  };

  const [objWeek, setObjWeek] = useState({
    date: new Date(),
    dateFrom: null,
    dateTo: null,
    weekNumber: null
  });

  const onChange = (date) => {
    const weekNumber = moment(date).isoWeek();
    const dateFrom = moment(date).startOf('isoWeek').toDate();
    const dateTo = moment(date).endOf('isoWeek').toDate();

    setObjWeek({
      date,
      dateFrom,
      dateTo,
      weekNumber
    })
  }
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  const renderValue = (date) => {
    const weekNumber = moment(date).isoWeek();
    const year = moment(date).year();
    const dateFrom = moment(date).startOf('isoWeek').toDate();
    const dateTo = moment(date).endOf('isoWeek').toDate();
    const Week_End = format(dateTo, 'yyyy-MM-dd');
    const Week_Start = format(dateFrom, 'yyyy-MM-dd')
    setWeekStart(Week_Start)
    setSelectednewDate(Week_End)

    const formattedDateFrom = formatDate(dateFrom);
    const formattedDateTo = formatDate(dateTo);
    return `${formattedDateFrom} to ${formattedDateTo}`;
  }
  const disabledDate = (date) => {
    const today = new Date();
    return date > today;
  };
  const cardinal = curveCardinal.tension(0.2);
  let LeaveReq_count = sessionStorage.getItem('reqCount')
  let AllowAccess = sessionStorage.getItem('Access_Level')
  const [pendingKpi, setPendingKpi] = useState();
  const [RequestKpi, setRequestKpi] = useState();
  const [passtoL1Kpi, setpasstoL1Kpi] = useState();
  const [userList, setUserlist] = useState([]);
  const getUser_list = async () => {
    const data = await axios.get(`http://localhost:5000/profile_data`).then(res => {
      console.log("userList", res.data.data)
      setUserlist(res.data.data)

    })
  }

  const getdata = async () => {
    if (AllowAccess != 'L4') {
      const data = await axios.get(`http://localhost:5000/kpi_leave/${AllowAccess}`).then(res => {

        setPendingKpi(res.data.count)
        setRequestKpi(res.data.Request)
        setpasstoL1Kpi(res.data.passtol1)

      })
    }
  }

  useEffect(() => {
    getdata();
  })
  const navigate = useNavigate();
  const Pending_KpiL3 = (label) => {

    navigate(`/user/permission/Requested`)
  }
  const back_tohome = () => {
    navigate(`/user/home`);
  }
  const handleUserChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    if (selectedIndex > 0) {
      const selectedOption = userList[selectedIndex - 1];
      setselectedUser(selectedOption.firstname);
      console.log("select user",selectedOption.id)

      setshow_Userlist([selectedOption.id]);

    } else {
      setselectedUser('');
      setshow_Userlist([]);
    }
  };

  return (
    <div>
      {Buffer ? (<div animation="border" className="loader" />) : (
        <div className="Attend">

          {/* <div class="dashboard_head">
      <ArrowBackIcon className="record_backicon" ></ArrowBackIcon>
     
      <p>LMS Dashboard</p> </div> */}
          <div className="formfill_head">
            <ArrowBackIcon className="record_backicon" onClick={back_tohome} ></ArrowBackIcon>
            <h4 className="SignupHead">LMS Dashboard</h4></div>

          {AllowAccess == 'L4' ? (<></>) : (<>

            {AllowAccess == 'L3' ? (<>



              <div className="kpi-box11">
                <div className="Title_style11"></div>
                <div className="logo-container11">
                  {/* <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="logo_users11"></img> */}
                </div>

                <h2 className="kpi-title11">Pending Requested </h2>

                <div className="kpi-value11">
                  <p onClick={() => Pending_KpiL3()}>{pendingKpi}</p>
                </div>
              </div>

            </>) : AllowAccess == 'L2' ? (<>
              <div className="kpi-box11">
                <div className="Title_style11"></div>
                <div className="logo-container11">

                  {/* <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="logo_users11"></img> */}


                </div>

                <h2 className="kpi-title11">Pending Requested </h2>

                <div className="kpi-value11">
                  <p onClick={() => Pending_KpiL3()}>{pendingKpi}</p>
                </div>
              </div>
              <div className="kpi-box12">
                <div className="Title_style11"></div>
                <div className="logo-container11">
                  <RunningWithErrorsIcon />
                  {/* <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="logo_users11"></img> */}
                </div>

                <h2 className="kpi-title11">Processing</h2>

                <div className="kpi-value12">
                  <p onClick={() => Pending_KpiL3()}>{RequestKpi}</p>
                </div>
              </div></>) : AllowAccess == 'L1' ? (<>
                <div className="kpi-box11">
                  <div className="Title_style11"></div>
                  <div className="logo-container11">
                    <MarkChatUnreadIcon />

                    {/* <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="logo_users11"></img> */}
                  </div>

                  <h2 className="kpi-title11">Pending Requested </h2>

                  <div className="kpi-value11">
                    <p onClick={() => Pending_KpiL3()}>{pendingKpi}</p>
                  </div>
                </div>
                <div className="kpi-box13">
                  <div className="Title_style11"></div>
                  <div className="logo-container11">
                    <RunningWithErrorsIcon />
                    {/* <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="logo_users11"></img> */}
                  </div>

                  <h2 className="kpi-title11">Processing </h2>

                  <div className="kpi-value13">
                    <p onClick={() => Pending_KpiL3()} >{RequestKpi}</p>
                  </div>
                </div>
                {/* <div className="kpi-box15">
  <div className="Title_style11"></div>
<div className="logo-container11">

<img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="logo_users11"></img>
</div>

  <h2 className="kpi-title11">Pending Requested </h2>
 
  <div className="kpi-value11">
  <p >{passtoL1Kpi}</p>
  </div>
  </div> */}
              </>) : (<></>)}


          </>)}

          <div>
            <h2 className={AllowAccess == "L4" ? "lel4_heading" : "heading_chart"}>{summary}</h2>


            {selectedCharttype == 'BarChart' ? (
              <BarChart
                width={1000}
                height={500}
                data={data}
                onClick={handleShow}
                margin={{ top: 17, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey={selecteduserwise == 1 ? "firstname" : "date"} />
                <YAxis />
                <Tooltip />
                <Legend className="legend_style" />
                <Bar dataKey="Present" stackId="1" fill="#2e75b5" />
                <Bar dataKey="Absent" stackId="1" fill="#ff999a" />
                <Bar dataKey="Off" stackId="1" fill="#b975fe" />
              </BarChart>
            ) : null}

            {selectedCharttype == 'LineChart' ? (
              <LineChart
                width={1000}
                height={500}
                data={data}
                onClick={handleShow}
                margin={{ top: 17, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={selecteduserwise == 1 ? "firstname" : "date"} />
                <YAxis />
                <Tooltip />
                <Legend className="legend_style" />

                <Line type="monotone" dataKey="Present" stroke="#2e75b5" strokeWidth={2} />
                <Line type="monotone" dataKey="Absent" stroke="#ff999a" strokeWidth={2} />
                <Line type="monotone" dataKey="Off" stroke="#b975fe" strokeWidth={2} />

              </LineChart>

            ) : null}

            {selectedCharttype == 'AreaChart' ? (
              <AreaChart
                width={1000}
                height={500}
                data={data}
                onClick={handleShow}
                margin={{ top: 17, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={selecteduserwise == 1 ? "firstname" : "date"} />
                <YAxis />
                <Tooltip />
                <Legend className="legend_style" />
                <Area type={cardinal} dataKey="Present" stackId="1" stroke="#2e75b5" fill="#2e75b5" />
                <Area type={cardinal} dataKey="Absent" stackId="1" stroke="#ff999a" fill="#ff999a" />
                <Area type={cardinal} dataKey="Off" stackId="1" stroke="#b975fe" fill="#b975fe" />
              </AreaChart>
            ) : null}
            {selectedCharttype == 'ComposedChart' ? (
              <ComposedChart width={1000}
                height={500}
                data={data}
                onClick={handleShow}
                margin={{ top: 17, right: 30, left: 20, bottom: 5 }}>

                <XAxis dataKey={selecteduserwise == 1 ? "firstname" : "date"} />
                <YAxis />
                <Tooltip />
                <Legend className="legend_style" />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="Absent" stackId="1" fill="#ff999a" />
                <Bar dataKey="Off" stackId="1" fill="#b975fe" />
                <Bar dataKey="Present" stackId="1" fill="#2e75b5" />

                <Line type="monotone" dataKey="Present" stroke="#e9f2f2" />
                <Line type="monotone" dataKey="Absent" stroke="#cf3eaa" />
                <Line type="monotone" dataKey="Off" stroke="#1aa3a3" />
              </ComposedChart>
            ) : null}


          </div>

          {loading ? (<div animation="border" className="loader_kpi" />) : (<div>
            {selecteduserwise == 0 && selectedFile == 0 ? (<Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{popupmonth}&nbsp;{title_model}&nbsp;,{selectedYear}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Table stripped bordered>
                  <thead>
                    <tr>
                      <th className="new_poppre">Present</th>
                      <th className="absent_stl">Absent</th>
                      <th className="off_stl">Off</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td >
                        {Presentpop.map(name => (
                          <tr>
                            <td >{name}</td>
                          </tr>
                        )
                        )}
                      </td>
                      <td >
                        {Absentpop.map(name => (
                          <tr>
                            <td>{name}</td>
                          </tr>
                        )
                        )}
                      </td>
                      <td >
                        {Offpop.map(name => (
                          <tr>
                            <td> {name}</td>
                          </tr>
                        )
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>) : null}
          </div>)}


          <div className="Overall-dropdown">
            <div className="drop_Chart">
              {(selectedFile == 0) ? (<select
                value={selectedOption}
                onChange={e => {
                  const selectedIndex = [e.target.selectedIndex];
                  setshow_Month(selectedIndex);
                  const options = [...e.target.selectedOptions];
                  const values = options.map(option => option.value);
                  setYear(year)

                  setSelectedOption(values);
                  setpopupmonth(values)
                }
                }
              >
                {options.map((option, index) => (
                  <option key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>) : null}
            </div>
            <div className={selectedFile == 2 ? "change_yeardrop" : "year_dropdown"}>
              {selectedFile == 2 ? null : (<div>
                <select
                  value={selectedYear}
                  onChange={e => {
                    const selectedIndex = [e.target.selectedIndex];
                    setselectedYear(selectedIndex);
                    const options = [...e.target.selectedOptions];
                    const year = options.map(option => option.value);
                    setYear(year)
                    setselectedYear(year);
                  }}
                >
                  {year_drop.map((option) => (
                    <option key={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>)}

            </div>
            <div className={selectedFile == 1 ? "onchange_user" : "user_filter"}>
              <select
                value={selectedUser}
                onChange={handleUserChange}
              >
              <option value="">All user</option>

              {userList.map((option, index) => (
                  <option key={index} value={option.firstname}>
                    {option.firstname}
                  </option>
                ))}
              </select>
            </div>
            <div className={selectedFile == 2 ? "onchange_typesfilter" : "Typesof_yearfilter"}>
              <select
                value={typesFilter}
                onChange={e => {
                  const selectedIndex = [e.target.selectedIndex];

                  setSelectedFile(selectedIndex)
                  setshow_Userlist(selectedIndex);
                  const Typesof_drop = [...e.target.selectedOptions];
                  const user = Typesof_drop.map(option => option.value);

                  settypesFilter(user);

                }}
              >
                {Typesof_drop.map((option) => (
                  <option key={option.value}>
                    {option.value}
                  </option>
                ))}

              </select>

            </div>
            <div className="Last_filter">
              <select
                value={lastfil}
                onChange={e => {
                  const selectedIndex = [e.target.selectedIndex];
                  setshow_daily(selectedIndex);
                  setSelecteduserwise(selectedIndex)
                  const Last_drop = [...e.target.selectedOptions];
                  const user = Last_drop.map(option => option.value);

                  setlastfil(user);

                }}
              >
                {Last_drop.map((option) => (
                  <option key={option.value}>
                    {option.value}

                  </option>
                ))}
              </select>
            </div>
            <div className="chart_filter">
              <select
                value={selectedCharttype}
                onChange={e => {
                  const selectedIndex = [e.target.selectedIndex];
                  // setshow_Userlist(selectedIndex);
                  const user_filter = [...e.target.selectedOptions];
                  const user = user_filter.map(option => option.value);
                  setselectedCharttype(user);
                  const user1 = user_filter.map(option1 => option1.label);

                  setselectedCharttype(user1);
                }}
              >
                {Chart_dropdown.map((option) => (
                  <option key={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="date_picker">
              {selecteduserwise == 1 && selectedFile == 2 ? (<DatePicker selected={selectedDate} onChange={handleDateChange} placeholderText="Select Date" className="datepicstl" />) : null}
            </div>
            <div className="Submit_Data">
              <Button as="input" type="submit" value="Submit" className="button_submit" onClick={Submit_Process} />{' '}
            </div>
            <div className="Reset_Data">
              <Button as="input" type="submit" value="Reset" className="reset_submit" onClick={handleReset} />{' '}
            </div>
          </div>
          <div>{select}</div>
        </div>)}
      {/* <div>
<div className="kpi_align">
  <div ><h3>KPI Dashboard</h3></div>
  <div >
  <div style={{display:"flex",justifyContent:"space-between"}}>
  {selected_Dropdown ==2?null:(<div style={{marginLeft:"100px"}}>
    <select
      value={selected_kpiYear}
      onChange={e=> {
      const selectedIndex = [e.target.selectedIndex];
      setselected_kpiYear(selectedIndex);
      const options = [...e.target.selectedOptions];
      const year = options.map(option => option.value);
      setselected_kpiYear(year);
  }}
    >
    {year_drop.map((option) => (
      <option key={option.value}>
        {option.value}
      </option>
    ))}
  </select>
  </div>)}

<div style={{marginLeft:"35px"}}>
 <select
      value={typesof_dropdown}
      onChange={e=> {
      const selectedIndex = [e.target.selectedIndex];
     
      setselected_Dropdown(selectedIndex)
      const Typesof_drop = [...e.target.selectedOptions];
      const user = Typesof_drop.map(option => option.value);
   
      settypesof_dropdown(user);
     
  }}
    >
    {Typesof_Kpidrop.map((option) => (
      <option key={option.value}>
        {option.value}
    </option>
    ))}
   
  </select>
 
</div>
<div style={{marginLeft:"35px"}} >
  {selected_Dropdown ==0 ?(<select
      value={MonthKpi}
      onChange={e=> {
      const selectedIndex = [e.target.selectedIndex];
      setshow_KpiMonth(selectedIndex);
      const options = [...e.target.selectedOptions];
      const values = options.map(option => option.value);
      setMonthKpi(values)
   
      }
      }
    >
    {options.map((option,index) => (
      <option key={option.value}>
        {option.label}
      </option>
    ))}
  </select>):null}

</div>
<div className="weekly_kpi">
  {selected_Dropdown ==2?(<div>  
    <DatePicker
            placeholder='Week picker'
            isoWeek
            showWeekNumbers
            value={objWeek.date}
            onChange={onChange}
            renderValue={renderValue}
            className="Date_pickerStyle"
            style={{ width: 500 }}
            disabledDate={disabledDate}
        />

     </div>):null}
     </div>
    </div>
  </div>

<div className="kpidata_submit">
 <Button as="input" type="submit" value="Submit"  className="button_submit" onClick={Kpi_submit}/>{' '}
</div>

<div className="Reset_Kpi">
 <Button as="input" type="submit" value="Reset"  className="reset_submit" onClick={Handle_resetKpi}/>{' '}
</div>


</div>
<div style={{marginTop:"0px"}}>
{loading ?(<div animation="border"  className="loader_kpi"/>):(<div>
  <div className="kpi-box">
  <div className="Title_style01"></div>
<div className="logo-container">

<img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="logo_users"></img>
</div>

  <h2 className="kpi-title">{title}</h2>
 
  <div className="kpi-value">
  <p >{firstNames[0]}</p>
  <p >{firstNames[1]}</p>
  <p >{firstNames[2]}</p>
  </div>
</div>

<div className="kpi-2box">
<div className="Title_style02"></div>
<div className="logo-container2">
<img src={logo} className="logo_users"></img>

</div>
      <h2 className="kpi-title2">{Abset_title}</h2>
      <div className="kpi-value">
      <p >{top_Absent[0]}</p>
      <p >{top_Absent[1]}</p>
      <p >{top_Absent[2]}</p>
      </div>
</div>
<div className="kpi-3box">
<div className="Title_style03"></div>
<div className="logo-3box">
<img src= "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" className="logo_users"></img>
</div>
      <h2 className="kpi-title3">{Present_date}</h2>
      <p className="kpi-value3">{MostPre_days[0]}</p>
      <p className="kpi-value3">{Present_dayname[0]}</p>
</div>
<div className="kpi-4box">
<div className="Title_style04"></div>
<div className="logo-4box">
<img src="https://static.vecteezy.com/system/resources/previews/014/441/184/original/colorful-blank-calendar-illustration-icon-square-calendar-template-png.png" className="logo_users"></img>
</div>
      <h2 className="kpi-title4">{Absent_date}</h2>
      <p className="kpi-value4">{Mostabsent_days[0]}</p>
      <p className="kpi-value4">{Absent_dayname[0]}</p>
</div>
</div>)}

</div>
</div> */}

    </div>
  );
};
export default AttendanceChart;
