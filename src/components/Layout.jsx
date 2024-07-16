import React from 'react'

function Layout(props) {
  return (
    <div className='row'>
        {props.children}
    </div>
  )
}

export default Layout