import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import translateText from "../translate";
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

function Drizzle(props) {
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
    const [test, setTest] = useState(["Select Drizzle Type:", "Balsamic Glaze", "Basil Pesto", "BBQ Sauce", "Olive Oil", "Oregano", " Sriracha", "Remove Last Topping", "Back To Menu", "Add More Toppings", "Next", "Your Current Pizza:", "*Note: Drizzles Will Not Appear On Pizza*"]);
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
    return (<Fragment>
        <h1 className="pageTitle-topping">{test[0]}</h1>
        <div className="grid-container-toppingitems">
            <button className="grid-item-toppingitems" onClick={Balsamic}>{test[1]}</button>
            <button className="grid-item-toppingitems" onClick={Basilpesto}>{test[2]}</button>
            <button className="grid-item-toppingitems" onClick={Bbqsauce}>{test[3]}</button>
            <button className="grid-item-toppingitems" onClick={Oliveoil}>{test[4]}</button>
            <button className="grid-item-toppingitems" onClick={Oregano}>{test[5]}</button>
            <button className="grid-item-toppingitems" onClick={Sriracha}>{test[6]}</button>
            <button className="grid-item-toppingitems" onClick={Removetopping}>{test[7]}</button>
        </div>
        <div>
            <a href="/pizzatypediff">
                <button className="backButton">{test[7]}</button>
            </a>
            <a href="/topping">
                <button className="backButton2">{test[8]}</button>
            </a>

            <a href="/sauce">
                <button className="nextButton">{test[9]}</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">{test[10]}</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="disclaimer">{test[11]}</p>
        <p className="pizzaBuilder">{pizza}</p>

    </Fragment>);
}

export default Drizzle;