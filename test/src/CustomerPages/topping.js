import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import "../components/customer.css"
import translateText from "../translate";

function Topping(props) {
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
    const [test, setTest] = useState(["Select Toppings:", "Meats", "Vegetables", "Drizzles", "Seasonal Toppings", "Select Different Pizza Type", "Next", "Your Current Pizza:"]);
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
        <div className="grid-container-topping">
            <a href="/meats">
                <button className="grid-item-topping">{test[1]}</button>
            </a>
            <a href="/veggies">
                <button className="grid-item-topping">{test[2]}</button>
            </a>
            <a href="/drizzle">
                <button className="grid-item-topping">{test[3]}</button>
            </a>
            <a href="/seasonal">
                <button className="grid-item-topping">{test[4]}</button>
            </a>
        </div>
        <div>
            <a href="/pizzatypediff">
                <button className="backButton">{test[5]}</button>
            </a>
            <a href="/sauce">
                <button className="nextButton">{test[6]}</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">{test[7]}</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}


export default Topping;