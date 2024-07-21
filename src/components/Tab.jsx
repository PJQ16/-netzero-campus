import React from 'react';

export default function Tab({ children }) {
  return (
    <div>
      <ul className="nav nav-tabs mb-2" style={{backgroundColor:'#0E3B43'}} id="pills-tab" role="tablist">
        {React.Children.map(children, (child, index) => (
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${index === 0 ? 'active' : ''}`}
              style={{color:'#A3BBAD'}}
              id={`pills-tab-${index}`}
              data-bs-toggle="pill"
              data-bs-target={`#pills-content-${index}`}
              type="button"
              role="tab"
              aria-controls={`pills-content-${index}`}
              aria-selected={index === 0}
            >
              {child.props.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="pills-tabContent">
        {React.Children.map(children, (child, index) => (
          <div
            className={`tab-pane  ${index === 0 ? 'show active' : ''}`}
            id={`pills-content-${index}`}
            role="tabpanel"
            aria-labelledby={`pills-tab-${index}`}
            tabIndex="0"
            style={{backgroundColor:'#0000'}}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
