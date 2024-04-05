import "./LeaveSection.css";
import React, { useState, useEffect} from "react";
import axios from "axios";
function LeaveSection() {
  let AllowAccess=sessionStorage.getItem('Access_Level') 
  const[pendingKpi,setPendingKpi]=useState();
  const[RequestKpi,setRequestKpi]=useState();
  const[passtoL1Kpi,setpasstoL1Kpi]=useState();
  const getdata=async()=>{
    const data = await axios.get(`http://localhost:5000/kpi_leave/${AllowAccess}`).then(res => {

        setPendingKpi(res.data.count)
        setRequestKpi(res.data.Request)
        setpasstoL1Kpi(res.data.passtol1)
        
  })}

  useEffect(()=>{
    getdata();
  })
  return (
   
    <div className='Leave-section'>
       <div className="Leavesummary">
        <h3 className="summaryHead">Leave Summary</h3>
     {AllowAccess =='L3' ?(<>
        <div className="kpi-boxleave">
    <div className="Title_styleleave"></div>
    <div className="logo-container">
    <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="img_logo"></img>
    </div>
    <h2 className="kpi-titleLeave">Pending Requested</h2>
    <div className="kpi-valueleave">
    <p >{pendingKpi}</p>
    </div>
    </div></>) :AllowAccess =='L2' ?(<>
        <div className="kpi-boxleave">
    <div className="Title_styleleave"></div>
    <div className="logo-container">
    <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="img_logo"></img>
    </div>
    <h2 className="kpi-titleLeave">Pending Requested</h2>
    <div className="kpi-valueleave">
    <p >{pendingKpi}</p>
    </div>
    </div>
    <div className="kpi-boxleave2">
    <div className="Title_styleleave2"></div>
    <div className="lealogo2">
    <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="img_logo2"></img>
    </div>
    <h2 className="kpi-titleLeave2">L3 Pending</h2>
    <div className="kpi-valueleave2">
    <p >{RequestKpi}</p>
    </div>
    </div></>):AllowAccess =='L1' ?(<>
        <div className="kpi-boxleave">
    <div className="Title_styleleave"></div>
    <div className="logo-container">
    <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="img_logo"></img>
    </div>
    <h2 className="kpi-titleLeave">Pending Requested</h2>
    <div className="kpi-valueleave">
    <p >{pendingKpi}</p>
    </div>
    </div>
    <div className="kpi-boxleave5">
    <div className="Title_styleleave5"></div>
    <div className="logo-container5">
    <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="img_logo5"></img>
    </div>
    <h2 className="kpi-titleLeave5">L2 Pending</h2>
    <div className="kpi-valueleave5">
    <p >{RequestKpi}</p>
    </div>
    </div>
    <div className="kpi-boxleave3">
    <div className="Title_styleleave3"></div>
    <div className="logo-container3">
    <img src="https://blockchain-expo.com/northamerica/wp-content/uploads/2020/09/multiple-users-silhouette.png" className="img_logo3"></img>
    </div>
    <h2 className="kpi-titleLeave3">Pass To L1</h2>
    <div className="kpi-valueleave3">
    <p >{passtoL1Kpi}</p>
    </div>

    </div></>):(<></>)  }   
     
   
    </div>
    
    </div>
  )
}

export default LeaveSection