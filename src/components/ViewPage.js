// import React from 'react'
// import { useParams } from 'react-router-dom';
// import "./viewPage.css";
// import axios from "axios";
// function ShowPage() {
//     const { id } = useParams();
// 
//   return (
//     <div>
//         <div className='leavetop'>
   
//    <div  className='view_head'>  <h4 className="leavehead">Leave Details</h4></div>
  
//    <div className='ComponentHide'>
//    <PrintComponent/>
//    </div>
  
// {mainViewData.map((item,index) => {
//    return <div className="container">
//    <label className="label">Employee     <span className='centerview'> :</span>  <span className="value">{item.firstname}</span></label><br/><br/>
//    {/* <label className="label">Employee ID     <span className='centerview'> :</span>    <span className="value">{item.employeeID}</span></label><br/><br/> */}
//    <label className="label">Email         <span className='centerview'> :</span>    <span className="value">{item.email}</span></label><br/><br/>
//    <label className="label">Mobile Number <span className='centerview'> :</span>   <span className="value">{item.mobileno}</span></label><br/><br/>
//    <label className="label">Leave Type      <span className='centerview'> :</span>   <span className="value">{item.leave_type}</span></label><br/><br/>
//    <label className="label">Start Date         <span className='centerview'> :</span>   <span className="value">{item.firstday}</span></label><br/><br/>
//    <label className="label">End Date        <span className='centerview'> :</span>   <span className="value">{item.lastday}</span></label><br/><br/>
//    <label className="label">Reason <span className='centerview'> :</span>   <span className="value">{item.comments}</span></label><br/><br/>
//    <label className="label">Status <span className='centerview'> :</span>   <span className="value">{item.Active_status}</span></label>

//    </div>
   
// })}

// </div>
// </div>

// export default ShowPage;