import React from 'react';
import "./PrintComponent.css"

class PrintComponent extends React.Component {
  render() {
    return (
      <div>
      <div className='Hidehead'>
      
   
      
      <img src="https://www.tigmatech.com/assets/img/sticky-logo.png"/>
 
      </div>
      <div className='SocialMedia' >
      <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png"  style={{width: "30px"}}/>&nbsp;&nbsp;
      <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/twitter.png" style={{width: "30px"}}/>&nbsp;&nbsp;
      <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" style={{width: "30px"}} />&nbsp;&nbsp;
      <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" style={{width: "30px"}}/>&nbsp;&nbsp;
      </div>
      <div className='CopyRights'>
      <p>Copyright © 2019 - 2025 Tigma Technologies Inc. All Rights Reserved.</p>
      </div>
        </div>
    );
  }
}

export default PrintComponent;
