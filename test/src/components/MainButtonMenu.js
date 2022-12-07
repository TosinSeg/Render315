import React, { useState } from 'react'
// import {BrowserRouter, Route, Link} from "react-router-dom";
import ServerCheese from '../ServerPages/ServerCheese';
import ServerDrink from '../ServerPages/ServerDrink';
import ServerMultiTopping from '../ServerPages/ServerMultiTopping';
import ServerOneTopping from '../ServerPages/ServerOneTopping';
import ServerPepperoni from '../ServerPages/ServerPepperoni';
import ServerCheckout from '../ServerPages/ServerCheckout';
import "./style.css";


function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}


export default function MainButtonMenu(props) {
    const [component, setComponent] = useState("");

    const handleSubmit = (e, str) => {

        e.preventDefault();
        props.onSubmit(str);
    }

    return (
        <div id="button-container">
            <form onSubmit={handleSubmit} id="button-panel">
                <button class="main-button-menu" onClick={() => setComponent("Cheese")}>CHEESE</button>
                <button class="main-button-menu" onClick={() => setComponent("Pepperoni")}>PEPPERONI</button>
                <button class="main-button-menu" onClick={() => setComponent("One Topping")}>ONE TOPPING</button>
                <button class="main-button-menu" onClick={() => setComponent("Multi Topping")}>MULTI TOPPING</button>
                <button class="main-button-menu" onClick={() => setComponent("Drink")}>DRINK</button>
                <button class="main-button-menu" onClick={() => setComponent("Checkout")}>CHECKOUT</button>
                {/* <button type="submit">Clicker</button> */}
            </form>
            <div id="changing-buttons">
                {
                    {
                        "Cheese": <ServerCheese onSubmit={handleSubmit} />,
                        "Pepperoni": <ServerPepperoni onSubmit={handleSubmit} />,
                        "One Topping": <ServerOneTopping onSubmit={handleSubmit} />,
                        "Multi Topping": <ServerMultiTopping onSubmit={handleSubmit} />,
                        "Drink": <ServerDrink onSubmit={handleSubmit} />,
                        "Checkout": <ServerCheckout onSubmit={handleSubmit} />
                    }[component]
                }
            </div>
        </div>
    )
}