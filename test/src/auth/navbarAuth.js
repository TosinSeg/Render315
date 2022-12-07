import React, { Component } from 'react';
function NavbarAuth() {
    
    return ( <nav className='nav'>
        <ul>
            <li>
              <CustomLink href="/manager">Manager</CustomLink> 
            </li>
            <li>
              <CustomLink href='/server'>Server</CustomLink>
            </li>
        </ul>
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

export default NavbarAuth;