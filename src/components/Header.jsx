import React from 'react'

export default function Header() {
  return (
    <div>
        <header className="header-area header-sticky">
    <div className="container">
        <div className="row">
            <div className="col-12">
                <nav className="main-nav">
                
                    <a href="index.html" className="logo">
                        <h1>Scholar</h1>
                    </a>
                   
                    <div className="search-input">
                      <form id="search" action="#">
                        <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onkeypress="handle" />
                        <i className="fa fa-search"></i>
                      </form>
                    </div>
                   
                    <ul className="nav">
                      <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                      <li className="scroll-to-section"><a href="#services">Services</a></li>
                      <li className="scroll-to-section"><a href="#courses">Courses</a></li>
                      <li className="scroll-to-section"><a href="#team">Team</a></li>
                      <li className="scroll-to-section"><a href="#events">Events</a></li>
                      <li className="scroll-to-section"><a href="#contact">Register Now!</a></li>
                  </ul>   
                    <a className='menu-trigger'>
                        <span>Menu</span>
                    </a>
                    
                </nav>
            </div>
        </div>
    </div>
  </header>
    </div>
  )
}
