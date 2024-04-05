import React from 'react';
import './cloud_webpage.css';
import img1 from './cloud_1img.jpeg';
import img2 from './cloud_img2.jpeg'
import Button from 'react-bootstrap/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cloud_webpage = () => {
  return (
    <div className="cloud_mainlayout">
      <img src={img1} />
      <div className='Header_content'>
      <h4>
    Making your multi-cloud operation <br /> more  
    <span style={{ color: '#d97649' }}> visible</span>
    <span style={{ color: '#d97649' }}> efficient</span>
    <span style={{ color: '#d97649' }}> and</span>,
    <span style={{ color: '#d97649' }}> simple</span>
  </h4>       <br/>
   <h2 className='underlined'>CloudShifu.Ai</h2><br/><br/>
   <Button variant="secondary" className='Try_for'>   Try for free  <i className="bi bi-arrow-right" style={{ color: 'white' }}></i></Button>{' '}

      </div>
      <div className='SIgnupin_btn'>
      <Button variant="outline-secondary" className='Signin'>SIGN IN</Button>{' '}&nbsp;&nbsp;&nbsp;
      <Button variant="secondary" className='SignUp'>SIGN UP</Button>{' '}
    
      </div>
      <div className='cloud_frontimg1'>
        <img src={img2}/>
      </div>
   


   
    </div>
  );
};

export default Cloud_webpage;
