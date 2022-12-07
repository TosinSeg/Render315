import React, { useEffect, Fragment, useState } from "react";
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
const Removelast = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/clearSelection`);
    window.location.assign("/pizzatype");
}
function NewlineText(props) {
    const text = props.text;
    const newText = text.split('~').map(str => <p className="orderDisplay">{str}</p>);
    return newText;
}
function PizzatypeCancel() {
    const [isLoading, setLoading] = useState(true);
    const CancelOrder = async () => {
        await fetch(`http://localhost:5001/cancelOrder`);
    }

    const [response, setResponse] = useState("");
    const OrderInfo = async () => {
        let order = await fetch("http://localhost:5001/checkoutScreen").then((response) => response.text());
        order = order.replace(/\"/g, "");
        order = order.replace(/\//g, "");
        order = order.replace(/\\/g, "");
        setResponse(order);
    }

    const [price, setPrice] = useState("");
    const PriceInfo = async () => {
        let order = await fetch("http://localhost:5001/calculatePrice").then((response) => response.text());
        order = order.replace(/\"/g, "");

        setPrice(order);
    }

    useEffect(() => {
        CancelOrder();

    }, [])
    useEffect(() => {
        PriceInfo();

    }, [price])
    setTimeout(() => { console.log("Waiting"); }, 3000);

    return (
        <Fragment>
            <h1 className="pageTitle">Select Pizza Type:</h1>
            <div className="grid-container">
                <button className="grid-item" onClick={HandleClickPep}>Pepperoni Pizza</button>
                <button className="grid-item" onClick={CheeseZa}>Cheese</button>
                <a href="/topping-one">
                    <button className="grid-item">One Topping</button>
                </a>
                <a href="/topping-multi">
                    <button className="grid-item" >2-4 Topping</button>
                </a>
                <button className="grid-item" onClick={Drinks}>Add A Fountain Drink</button>
                <button className="grid-item" onClick={Removelast}>Remove Last Item</button>
            </div>
            <div>

                <a href="/pizzatypeCanceled">
                    <button className="backButton"> Cancel Order</button>
                </a>
                <a href="/checkout">
                    <button className="nextButton"> Complete Order</button>
                </a>
                {/* remove me after testing */}

            </div>
            <div className="order-container">
                <OrderInformation />
            </div>
            <p className="priceDisplay">Total Cost: ${price}</p>
        </Fragment >
    );
}




export default PizzatypeCancel;