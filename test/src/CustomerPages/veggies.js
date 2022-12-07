import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import translateText from "../translate";
const Bananapep = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Banana Peppers"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Grepep = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Green Peppers"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Redpep = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Red Peppers"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Blackoli = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Black Olives"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Kalmataoli = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Kalmata Olives"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Cherrytoma = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Cherry Tomatoes"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Redonion = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Red Onions"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Spinach = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Spinach"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Brocolli = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Brocolli"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Caraonion = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Caramelized Onions"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Garlic = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Garlic"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Mushrooms = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Mushrooms"}`)
        .then((response) => response.text()) === "\"false\"") {
        alert("Too many toppings");
    } else {
        window.location.reload();
    }
}

const Redtatoes = async (e) => {
    e.preventDefault();
    if (await fetch(`https://spinapi.onrender.com/addTopping/${"Red Potatoes"}`)
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



function Veggies(props) {
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

    const [test, setTest] = useState(["Select Vegetables:", "Banana Peppers", "Green Peppers", "Red Peppers", "Black Olives", "Kalmata Olives", "Cherry Tomatoes", "Red Onions", "Spinach", "Brocolli", "Caramelized Onions", "Garlic", "Mushrooms", "Red Potatoes", "Remove Last Topping", "Back To Menu", "Add More Toppings", "Next", "Your Current Pizza:"]);
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
        <div className="grid-container-topping3">
            <button className="grid-item-topping3" onClick={Bananapep}>{test[1]}</button>
            <button className="grid-item-topping3" onClick={Grepep}>{test[2]}</button>
            <button className="grid-item-topping3" onClick={Redpep}>{test[3]}</button>
            <button className="grid-item-topping3" onClick={Blackoli}>{test[4]}</button>
            <button className="grid-item-topping3" onClick={Kalmataoli}>{test[5]}</button>
            <button className="grid-item-topping3" onClick={Cherrytoma}>{test[6]}</button>
            <button className="grid-item-topping3" onClick={Redonion}>{test[7]}</button>
            <button className="grid-item-topping3" onClick={Spinach}>{test[8]}</button>
            <button className="grid-item-topping3" onClick={Brocolli}>{test[9]}</button>
            <button className="grid-item-topping3" onClick={Caraonion}>{test[10]}</button>
            <button className="grid-item-topping3" onClick={Garlic}>{test[11]}</button>
            <button className="grid-item-topping3" onClick={Mushrooms}>{test[12]}</button>
            <button className="grid-item-topping3" onClick={Redtatoes}>{test[13]}</button>
            <button className="grid-item-topping3" onClick={Removetopping}>{test[14]}</button>
        </div>
        <div>
            <a href="/pizzatypediff">
                <button className="backButton">{test[15]}</button>
            </a>
            <a href="/topping">
                <button className="backButton2"> {test[16]}</button>
            </a>

            <a href="/sauce">
                <button className="nextButton">{test[17]}</button>
            </a>
        </div>
        <h1 className="pizzaInfoTitle">{test[18]}</h1>
        <p className="pizzaInfo">{response}</p>
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}

export default Veggies;