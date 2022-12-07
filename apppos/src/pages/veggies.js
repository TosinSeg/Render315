import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
const Bananapep = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Banana Peppers"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Grepep = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Green Peppers"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Redpep = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Red Peppers"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Blackoli = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Black Olives"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Kalmataoli = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Kalmata Olives"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Cherrytoma = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Cherry Tomatoes"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Redonion = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Red Onions"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Spinach = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Spinach"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Brocolli = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Brocolli"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Caraonion = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Caramelized Onions"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Garlic = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Garlic"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Mushrooms = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Mushrooms"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Redtatoes = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Red Potatoes"}`)
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



function Veggies() {
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
    return (<Fragment><h1 className="pageTitle-topping">Select Vegetables:</h1>
        <div className="grid-container-topping3">
            <button className="grid-item-topping3" onClick={Bananapep}>Banana Peppers</button>
            <button className="grid-item-topping3" onClick={Grepep}>Green Peppers</button>
            <button className="grid-item-topping3" onClick={Redpep}>Red Peppers</button>
            <button className="grid-item-topping3" onClick={Blackoli}>Black Olives</button>
            <button className="grid-item-topping3" onClick={Kalmataoli}>Kalmata Olives</button>
            <button className="grid-item-topping3" onClick={Cherrytoma}>Cherry Tomatoes</button>
            <button className="grid-item-topping3" onClick={Redonion}>Red Onions</button>
            <button className="grid-item-topping3" onClick={Spinach}>Spinach</button>
            <button className="grid-item-topping3" onClick={Brocolli}>Brocolli</button>
            <button className="grid-item-topping3" onClick={Caraonion}>Caramelized Onions</button>
            <button className="grid-item-topping3" onClick={Garlic}>Garlic</button>
            <button className="grid-item-topping3" onClick={Mushrooms}>Mushrooms</button>
            <button className="grid-item-topping3" onClick={Redtatoes}>Red Potatoes</button>
            <button className="grid-item-topping3" onClick={Removetopping}>Remove Last Topping</button>
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
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}

export default Veggies;