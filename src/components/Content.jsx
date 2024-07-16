import React from 'react'

function Content(props) {
  return (
    <div className="col-lg-9 col-md-9" >
        {props.children}
    </div>
  )
}

export default Content