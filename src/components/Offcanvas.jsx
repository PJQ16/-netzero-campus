import React, { Children } from 'react'
import './css/style.css';

export default function Offcanvas(props) {
  return (
    <div>
    <div
      className={`offcanvas offcanvas-${props.position}`}
      style={{ backgroundColor: 'darkgray' }}
      data-bs-backdrop="static"
      tabIndex="-1"
      id={props.id}
      aria-labelledby={`offcanvas${props.position}Label`}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id={`offcanvas${props.position}Label`}>{props.title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body small">
        {props.children}
      </div>
    </div>
  </div>
  )
}

