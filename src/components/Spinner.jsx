// Spinner.js
import React from 'react';
import { DotLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
    <div className="spinner-container">
      <DotLoader color="#0DB09B" size={300} />
        <small>Loading...</small>
      </div>
    </div>
  );
};

export default Spinner;
