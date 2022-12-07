import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
import translateText from "../translate";
const Removetopping = async (e) => {
    e.preventDefault();
    await fetch(`https://spinapi.onrender.com/removeLastTopping`)
    window.location.reload();

}

function Seasonal(props) {
    const [isLoading, setLoading] = useState(true);
    const [response, setResponse] = useState("");
    const OrderInfo = async () => {
        let order = await fetch("https://spinapi.onrender.com/currentPizza").then((response) => response.text());
        order = order.replace(/\"/g, "");
        setResponse(order);

    }

    const [season, setSeason] = useState("");
    const Seasonalinfo = async () => {
        let order = await fetch("https://spinapi.onrender.com/seasonalMenu").then((response) => response.text());
        order = order.replace(/name/g, "");
        order = order.replace(/\[/g, "");
        order = order.replace(/]/g, "");
        order = order.replace(/{/g, "");
        order = order.replace(/}/g, "");
        order = order.replace(/\"/g, "");
        order = order.replace(/:/g, "");
        const myArray = order.split(",");
        for (let i = 0; i < myArray.length; i++) {
            let myDiv = document.getElementById("seasonalButtons");
            let button = document.createElement('BUTTON');
            button.className = "grid-item-topping3";
            let text1 = myArray[i]
            text1 = text1.replace(/\_/g, " ");
            let text = document.createTextNode(text1);

            button.appendChild(text);
            button.id = myArray[i];
            button.onclick = async function (e) {
                e.preventDefault();
                if (await fetch(`https://spinapi.onrender.com/addTopping/${myArray[i]}`)
                    .then((response) => response.text()) === "\"false\"") {
                    alert("Too many toppings");
                } else {
                    window.location.reload();
                }
            };
            myDiv.appendChild(button);
        }

    }



    useEffect(() => {
        Seasonalinfo();
    }, [])
    useEffect(() => {
        OrderInfo();

    }, [response])
    const [test, setTest] = useState(["Select Seasonal Toppings: ", "Remove Last Topping", "Back To Menu", "Add More Toppings", "Next", "*Note: Seasonal Toppings Will Not Appear On Pizza*"]);
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
    let pizza = <Pizzabuilder />
    return (<Fragment><h1 className="pageTitle-topping">{test[0]}</h1>

        <div className="grid-container-topping3" id="seasonalButtons"><button className="grid-item-topping3" onClick={Removetopping}>{test[1]}</button></div>
        <div>
            <a href="/pizzatypediff">
                <button className="backButton">{test[2]}</button>
            </a>
            <a href="/topping">
                <button className="backButton2"> {test[3]}</button>
            </a>

            <a href="/sauce">
                <button className="nextButton">{test[4]}</button>
            </a>
        </div>
        <p className="pizzaInfo">{response}</p>
        <p className="disclaimer">{test[5]}</p>
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}

export default Seasonal;