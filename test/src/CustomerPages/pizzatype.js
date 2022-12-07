import React, { useEffect, Fragment, useState } from "react";
//import "../components/pizzabuilder.css"
import LOGO from "../PizzaToppings/logo.png";
import translateText from "../translate";

import OrderInformation from "./orderinfo";
const HandleClickPep = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/createSetPizza/${1}/${"Pepperoni"}`);
    window.location.assign("/pizzatype");
}
const CheeseZa = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/createSetPizza/${0}/${"Cheese"}`);
    window.location.assign("/pizzatype");
}
const Drinks = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/soloDrink`);
    window.location.assign("/pizzatype");
}

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('~').map(str => <p className="orderDisplay">{str}</p>);
    return newText;
}
const Removelast = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/clearSelection`);
    window.location.assign("/pizzatype");
}



function Pizzatype(props) {
    const [price, setPrice] = useState("");
    const PriceInfo = async () => {
        let order = await fetch("http://localhost:5001/calculatePrice").then((response) => response.text());
        order = order.replace(/\"/g, "");

        setPrice(order);
    }
    useEffect(() => {
        PriceInfo();
    }, [price])

    const [test, setTest] = useState(["Select Pizza Type: ", "Pepperoni Pizza", "Cheese", "One Topping", "2-4 Topping", "Add A Fountain Drink", "Remove Last Item", "Cancel Order", "Complete Order", "Total Cost: $"]);
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

    return (
        <Fragment>
            <img alt="Spin N Stone Logo" className="logo1" src={LOGO} />
            <h1 className="pageTitle">{test[0]}</h1>
            <div className="grid-container">
                <button className="grid-item" onClick={HandleClickPep}>{test[1]}</button>
                <button className="grid-item" onClick={CheeseZa}>{test[2]}</button>
                <a href="/topping-one">
                    <button className="grid-item">{test[3]}</button>
                </a>
                <a href="/topping-multi">
                    <button className="grid-item" >{test[4]}</button>
                </a>
                <button className="grid-item" onClick={Drinks}>{test[5]}</button>
                <button className="grid-item" onClick={Removelast}>{test[6]}</button>
            </div>
            <div>

                <a href="/pizzatypeCanceled">
                    <button className="backButton">{test[7]}</button>
                </a>
                <a href="/checkout">
                    <button className="nextButton">{test[8]}</button>
                </a>

            </div>
            <div className="order-container">
                <OrderInformation lang={props.lang} />
            </div>
            <p className="priceDisplay">{test[9]}{price}</p>

        </Fragment >
    );
}




export default Pizzatype;