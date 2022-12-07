import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
const Balsamic = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Balsamic Glaze"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Basilpesto = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Basil Pesto"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Bbqsauce = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"BBQ Sauce"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Oliveoil = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Olive Oil"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Oregano = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Oregano"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Sriracha = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Sriracha"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }

}
const Removetopping = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/removeLastTopping`)
    window.location.reload();

}

function Drizzle() {
    const [isLoading, setLoading] = useState(true);
    const [response, setResponse] = useState("");
    const OrderInfo = async () => {
        let order = await fetch("http://localhost:5001/currentPizza").then((response) => response.text());
        order = order.replace(/\"/g, "");
        setResponse(order);
    }

    useEffect(() => {
        OrderInfo();

    }, [response])

    setTimeout(() => { console.log("Waiting"); }, 3000);
    let pizza = <Pizzabuilder />
    return (<Fragment>
        <h1 className="pageTitle-topping">Select Drizzle Type:</h1>
        <div className="grid-container-toppingitems">
            <button className="grid-item-toppingitems" onClick={Balsamic}>Balsamic Glaze</button>
            <button className="grid-item-toppingitems" onClick={Basilpesto}>Basil Pesto</button>
            <button className="grid-item-toppingitems" onClick={Bbqsauce}>BBQ Sauce</button>
            <button className="grid-item-toppingitems" onClick={Oliveoil}>Olive Oil</button>
            <button className="grid-item-toppingitems" onClick={Oregano}>Oregano</button>
            <button className="grid-item-toppingitems" onClick={Sriracha}>Sriracha</button>
            <button className="grid-item-toppingitems" onClick={Removetopping}>Remove Last Topping</button>
        </div>
        <div>
            <a href="/pizzatypediff">
                <button className="backButton">Back To Menu</button>
            </a>
            <a href="/topping">
                <button className="backButton2"> Add More Toppings</button>
            </a>

            <a href="/sauce">
                <button className="nextButton">Next</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">Your Current Pizza:</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="disclaimer">*Note: Drizzles Will Not Appear On Pizza*</p>
        <p className="pizzaBuilder">{pizza}</p>

    </Fragment>);
}

export default Drizzle;