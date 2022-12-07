import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import translateText from "../translate";
const Pepperoni = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Pepperoni"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }

}


const Ham = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Ham"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Sausage = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Sausage"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Meatballs = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Meatballs"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Salami = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Salami"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Bacon = async (e) => {
    e.preventDefault();
    //stringify the reply if needed, see what it is first
    if (await fetch(`https://spinapi.onrender.com/addTopping/${'Bacon'}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }

}

const Chicken = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Chicken"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}
const Removetopping = async (e) => {
    e.preventDefault();
    await fetch(`https://spinapi.onrender.com/removeLastTopping`)
    window.location.reload();

}


function Meats(props) {
    const [isLoading, setLoading] = useState(true);
    const [response, setResponse] = useState("");
    const OrderInfo = async () => {
        let order = await fetch("https://spinapi.onrender.com/currentPizza").then((response) => response.text());
        order = order.replace(/\"/g, "");
        setResponse(order);
    }

    useEffect(() => {
        OrderInfo();
        setLoading(false);

    }, [response])
    const [test, setTest] = useState(["Select Meats: ", "Pepperoni", "Black Forest Ham", "Italian Sausage", "Meatballs", "Salami", "Bacon", "Smoked Chicken", "Remove Last Topping", "Back To Menu", " Add More Toppings", "Next", "Your Current Pizza:"]);
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
        <div className="grid-container-toppingitems">
            <button className="grid-item-toppingitems" onClick={Pepperoni}>{test[1]}</button>
            <button className="grid-item-toppingitems" onClick={Ham}>{test[2]}</button>
            <button className="grid-item-toppingitems" onClick={Sausage}>{test[3]}</button>
            <button className="grid-item-toppingitems" onClick={Meatballs}>{test[4]}</button>
            <button className="grid-item-toppingitems" onClick={Salami}>{test[5]}</button>
            <button className="grid-item-toppingitems" onClick={Bacon}>{test[6]}</button>
            <button className="grid-item-toppingitems" onClick={Chicken}>{test[7]}</button>
            <button className="grid-item-toppingitems" onClick={Removetopping}>{test[8]}</button>
        </div>
        <div>
            <a href="/pizzatypediff">
                <button className="backButton">{test[9]}</button>
            </a>
            <a href="/topping">
                <button className="backButton2"> {test[10]}</button>
            </a>

            <a href="/sauce">
                <button className="nextButton">{test[11]}</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">{test[12]}</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}

export default Meats;