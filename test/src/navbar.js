import React, { Component } from 'react';
function Navbar() {
    
    return ( <nav className='nav'>
        <ul>
            <li>
              <CustomLink href='/customer'>Customer</CustomLink>
            </li>
        </ul>
        
        <div class='home-body'>
          
          <br></br>

        </div>
        <div class = "home-image">
            <img src={require('./images/spinLogo.png')} class ="home-logo"/>
            <div class='home-text'>
              <h1 style={{ color: 'rgb(253,219,58)', fontSize: '100px'}}>Pizza<br></br>Your<br></br>Way</h1>
            </div>
        </div>
        <div class ='home-body'>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
        </div>

    </nav> );
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props} >{children}</a> 
        </li>
    )
}

export default Navbar;