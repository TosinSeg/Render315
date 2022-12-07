import React, { useEffect, Fragment, useState } from "react";
import Pizzabuilder from "./pizzabuilder";
const Removetopping = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/removeLastTopping`)
    window.location.reload();

}

function Seasonal() {
    const [isLoading, setLoading] = useState(true);
    const [response, setResponse] = useState("");
    const OrderInfo = async () => {
        let order = await fetch("http://localhost:5001/currentPizza").then((response) => response.text());
        order = order.replace(/\"/g, "");
        setResponse(order);

    }

    const [season, setSeason] = useState("");
    const Seasonalinfo = async () => {
        let order = await fetch("http://localhost:5001/seasonalMenu").then((response) => response.text());
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
            let text = document.createTextNode(myArray[i]);
            button.appendChild(text);
            button.id = myArray[i];
            button.onclick = async function (e) {
                e.preventDefault();
                if (await fetch(`http://localhost:5001/addTopping/${myArray[i]}`)
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

    }, [])
    setTimeout(() => { console.log("Waiting"); }, 3000);
    let pizza = <Pizzabuilder />
    return (<Fragment><h1 className="pageTitle-topping">Select Seasonal Toppings:</h1>

        <div className="grid-container-topping3" id="seasonalButtons"><button className="grid-item-topping3" onClick={Removetopping}>Remove Last Topping</button></div>
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
        <p className="pizzaInfo">{response}</p>
        <p className="disclaimer">*Note: Seasonal Toppings Will Not Appear On Pizza*</p>
        <p className="pizzaBuilder">{pizza}</p>
    </Fragment>);
}

export default Seasonal;