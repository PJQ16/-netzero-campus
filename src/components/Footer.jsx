import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/style.css';

let currentYear = new Date().getFullYear();

export default function Footer() {
  const location = useLocation();

  // Define the path for which the footer should be displayed normally
  const normalFooterPath = '/';

  // Determine the class for the footer
  const footerClass = location.pathname === normalFooterPath ? 'bg-body-light text-center' : ' bg-body-light text-center';

  return (
    <div>
      <footer
      
        className={`${footerClass}`}
      >
        <div className="text-center p-1 ">
          <p className="text-body-light">
            Copyright ©{currentYear} Energy Research and Development Institute - Nakornping (ERDI), Chiang Mai
            University. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
