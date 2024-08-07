import React from 'react'
import PropTypes from 'prop-types'

export default function Card({ p,col, cols, color, icon, title, body,bgColor,subTitle }) {
  return (
    <div>
      <div className={`card bg-${bgColor} mb-3 p-${p}`} style={{ maxWidth: '540px', backgroundColor: color }}>
        <div className="row g-0">
          <div className={`col-md-${col}`}>
            {icon}
          </div>
          <div className={`col-md-${cols}`}>
            <div className="card-body">
              <h5 className="card-title text-white">{title}</h5>
              <small className='text-white'>{subTitle}</small>
              <h5 className="card-title text-white" dangerouslySetInnerHTML={{ __html: body }}></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  col: PropTypes.number,
  cols: PropTypes.number,
  color: PropTypes.string,
  icon: PropTypes.element,
  title: PropTypes.string,
  body: PropTypes.string,
}
