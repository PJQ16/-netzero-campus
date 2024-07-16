import React from 'react';

const Accordion = ({ id, title, expanded, children }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className={`accordion-button ${expanded ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded={expanded} aria-controls={id}>
          {title}
        </button>
      </h2>
      <div id={id} className={`accordion-collapse collapse ${expanded ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div className="accordion-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
