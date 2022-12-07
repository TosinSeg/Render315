import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import translateText from "../translate";
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
function Sauce(props) {
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


    const [test, setTest] = useState(["Select Sauce and Crust: ", "Red Sauce", "Regular Crust", "Add a Drink to Your Pizza?", "Zesty Red Sauce", "Cauliflower Crust", "Remove Added Drink", "White Sauce", "Back", "Next", "Your Current Pizza:"]);
    useEffect(() => {
        (async () => {
            console.log(props.lang);
            let temp = [];
            for (let i = 0; i < test.length; ++i) {
                await translateText(test[i], props.lang).then(res => temp.push(res));
            }
            setTest(temp);
        })();
    }, [props.lang])

    let pizza = <Pizzabuilder lang={props.lang} />
    return (<Fragment><h1 className="pageTitle-topping">{test[0]}</h1>
        <div className="grid-container-sauces">

            <button className="grid-item-sauce" onClick={Red}>{test[1]}</button>
            <button className="grid-item-sauce" onClick={Regular}>{test[2]}</button>
            <button className="grid-item-sauce" onClick={MakeCombo}>{test[3]}</button>
            <button className="grid-item-sauce" onClick={Zestyred}>{test[4]}</button>
            <button className="grid-item-sauce" onClick={Cauliflour}>{test[5]}</button>
            <button className="grid-item-sauce" onClick={UndoCombo}>{test[6]}</button>
            <button className="grid-item-sauce" onClick={White}>{test[7]}</button>






        </div>
        <div>
            <a href="/topping">
                <button className="backButton"> {test[8]}</button>
            </a>

            <a href="/checkout">
                <button className="nextButton">{test[9]}</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">{test[10]}</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="pizzaBuilder">{pizza}</p>

    </Fragment>);
}

export default Sauce;