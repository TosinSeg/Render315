import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import translateText from "../translate";
const Pepperoni = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Pepperoni"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }

}


const Ham = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Ham"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Sausage = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Sausage"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Meatballs = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Meatballs"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Salami = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Salami"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Bacon = async (e) => {
    e.preventDefault();
    //stringify the reply if needed, see what it is first
    if (await fetch(`http://localhost:5001/addTopping/${'Bacon'}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }

}

const Chicken = async (e) => {
    e.preventDefault();
    if (await fetch(`http://localhost:5001/addTopping/${"Chicken"}`)
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


function Meats(props) {
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
    return (<Fragment><h1 className="pageTitle-topping">Select Meats:</h1>
        <div className="grid-container-toppingitems">
            <button className="grid-item-toppingitems" onClick={Pepperoni}>Pepperoni</button>
            <button className="grid-item-toppingitems" onClick={Ham}>Black Forest Ham</button>
            <button className="grid-item-toppingitems" onClick={Sausage}>Italian Sausage</button>
            <button className="grid-item-toppingitems" onClick={Meatballs}>Meatballs</button>
            <button className="grid-item-toppingitems" onClick={Salami}>Salami</button>
            <button className="grid-item-toppingitems" onClick={Bacon}>Bacon</button>
            <button className="grid-item-toppingitems" onClick={Chicken}>Smoked Chicken</button>
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
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}

export default Meats;