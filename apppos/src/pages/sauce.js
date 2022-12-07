import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
const Red = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/addSauce/${"Red"}`);
    window.location.reload();
}

const Zestyred = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/addSauce/${"Zesty_Red"}`);
    window.location.reload();
}

const White = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/addSauce/${"White"}`);
    window.location.reload();
}

const Regular = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/crustType/${false}`);
    window.location.reload();
}

const Cauliflour = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/crustType/${true}`);
    window.location.reload();
}

const MakeCombo = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/comboMeal/${true}`);
    window.location.reload();
}
const UndoCombo = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/comboMeal/${false}`);
    window.location.reload();
}
function Sauce() {
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
    let pizza = <Pizzabuilder />
    return (<Fragment><h1 className="pageTitle-topping">Select Sauce and Crust:</h1>
        <div className="grid-container-sauces">
            <div>
                <button className="grid-item-sauce" onClick={Red}>Red Sauce</button>
                <button className="grid-item-sauce" onClick={Zestyred}>Zesty Red Sauce</button>
                <button className="grid-item-sauce" onClick={White}>White Sauce</button>
            </div>
            <div>
                <button className="grid-item-sauce" onClick={Regular}>Regular Crust</button>
                <button className="grid-item-sauce" onClick={Cauliflour}>Cauliflower Crust</button>
            </div>
            <div>
                <button className="grid-item-sauce" onClick={MakeCombo}>Add a Drink to Your Pizza?</button>
                <button className="grid-item-sauce" onClick={UndoCombo}>Remove Added Drink</button>
            </div>
        </div>
        <div>
            <a href="/topping">
                <button className="backButton"> Back</button>
            </a>

            <a href="/checkout">
                <button className="nextButton">Next</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">Your Current Pizza:</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="pizzaBuilder">{pizza}</p>

    </Fragment>);
}

export default Sauce;