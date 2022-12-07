import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import "../components/customer.css"


function Topping() {
    const [isLoading, setLoading] = useState(true);
    const [response, setResponse] = useState("");
    const OrderInfo = async () => {
        let order = await fetch("http://localhost:5001/currentPizza").then((response) => response.text());
        order = order.replace(/\"/g, "");
        setResponse(order);
    }

    useEffect(() => {
        OrderInfo();
        setLoading(false);
    }, [response])
    setTimeout(() => { console.log("Waiting"); }, 3000);
    let pizza = <Pizzabuilder />
    return (<Fragment><h1 className="pageTitle-topping">Select Toppings:</h1>
        <div className="grid-container-topping">
            <a href="/meats">
                <button className="grid-item-topping">Meats</button>
            </a>
            <a href="/veggies">
                <button className="grid-item-topping">Vegetables</button>
            </a>
            <a href="/drizzle">
                <button className="grid-item-topping">Drizzles</button>
            </a>
            <a href="/seasonal">
                <button className="grid-item-topping">Seasonal Toppings</button>
            </a>
        </div>
        <div>
            <a href="/pizzatypediff">
                <button className="backButton">Select Different Pizza Type</button>
            </a>
            <a href="/sauce">
                <button className="nextButton">Next</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">Your Current Pizza:</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}

export default Topping;