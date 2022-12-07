import React from "react";
function Navbar() {

    return (<nav className='nav'>
        <a href='/' className='site-title'>Pizza</a>
        <ul>
            <li>
                <CustomLink href="/pizzatype">Pizza</CustomLink>
            </li>
            <li>
                <CustomLink href='/topping'>Toppings</CustomLink>
            </li>
            <li>
                <CustomLink href='/veggies'>Vegetables</CustomLink>
            </li>
            <li>
                <CustomLink href='/meats'>Meats</CustomLink>
            </li>
            <li>
                <CustomLink href='/drizzle'>Drizzles</CustomLink>
            </li>
            <li>
                <CustomLink href='/seasonal'>Seasonal Toppings</CustomLink>
            </li>
            <li>
                <CustomLink href='/checkout'>Checkout</CustomLink>
            </li>
        </ul>
    </nav>);
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