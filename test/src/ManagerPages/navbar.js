import React, { Component, useState, useEffect } from 'react';
import translateText from '../translate';

function Navbar(props) {
    const [test, setTest] = useState(["Log Out", "Manager Home", "Trends", "Inventory", "Menu", "Restock", "Restock Report", "Excess Report", "Sales Together", "Manage Staff"]);

    useEffect(() => {
      (async () => {
          console.log(props.lang);
          let temp = []
          for (let i = 0; i<test.length; ++i){
              await translateText(test[i], props.lang).then(res => temp.push(res));
          }
          setTest(temp);
      })();

  }, [props.lang])
    return ( <nav className='nav'>
        <ul>
            <li>
              <CustomLink href="/" className='site-title'>{test[0]}</CustomLink> 
            </li>
            <li>
              <CustomLink href="/manager">{test[1]}</CustomLink> 
            </li>
            <li>
              <CustomLink href="/trends">{test[2]}</CustomLink> 
            </li>
            <li>
              <CustomLink href='/inventory'>{test[3]}</CustomLink>
            </li>
            <li>
              <CustomLink href='/menu'>{test[4]}</CustomLink>
            </li>
            <li>
              <CustomLink href='/restock'>{test[5]}</CustomLink>
            </li>
            <li>
              <CustomLink href='/restockReport'>{test[6]}</CustomLink>
            </li>
            <li>
              <CustomLink href='/excessReport'>{test[7]}</CustomLink>
            </li>
            <li>
              <CustomLink href='/salesTogether'>{test[8]}</CustomLink>
            </li>
            <li>
              <CustomLink href='/employeeReport'>{test[9]}</CustomLink>
            </li>
        </ul>
    </nav> );
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;
    console.log(path);
    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props} >{children}</a> 
        </li>
    )
}

export default Navbar;