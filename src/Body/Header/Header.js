import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header d-flex col-md-12 bg-light pl-5" >
            <div className="col-md-2 d-flex justify-content-around ml-5">
                <a href="https://twitter.com/"><i className="fab fa-twitter"></i> </a>
                <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i> </a>
                <a href="https://web.facebook.com/"><i className="fab fa-facebook-f"></i> </a>
                <a href="https://github.com/"><i className="fab fa-github"></i> </a>
                <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i> </a>
            </div>
            <div className="col-md-9 "></div>
    </div>
  )
}
export default Header;