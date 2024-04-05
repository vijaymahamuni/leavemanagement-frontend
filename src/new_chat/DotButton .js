import React from 'react';
import "./DotButton.css";

const DotButton = ({ active }) => {
  const buttonClass = active ? 'active' : '';

  return (
    <button className={`dot-button ${buttonClass}`} />
  );
};

export default DotButton;
