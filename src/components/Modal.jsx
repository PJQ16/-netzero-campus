import React from 'react'

export default function Modal(props) {
  return (
    <div className="modal fade" id={props.id} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">{props.title}</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        {props.children}
          </div>
      </div>
    </div>
  </div>
  )
}
