import React, { useEffect, Fragment, useState } from "react";
import OrderInformation from "./orderinfo";
import LOGO from "../PizzaToppings/logo.png";
import translateText from "../translate";
const Finishorder = async (e) => {
    e.preventDefault();
    const response =
        await fetch(`http://localhost:5001/checkoutServ`, {
            method: "PUT",
        });
    await fetch(`http://localhost:5001/cancelOrder`);
    window.location.assign("/locationguide");
}

function Checkout(props) {


    const Addtoorder = async () => {
        await fetch(`http://localhost:5001/addToOrder`);
        await fetch(`http://localhost:5001/deletePizza`);
    }
    const [price, setPrice] = useState("");
    const PriceInfo = async () => {
        let order = await fetch("http://localhost:5001/calculatePrice").then((response) => response.text());
        order = order.replace(/\"/g, "");

        setPrice(order);
    }


    useEffect(() => {
        Addtoorder();
    }, [])

    useEffect(() => {
        PriceInfo();
    }, [price])
    const [test, setTest] = useState(["Select Payment Type:", "Cash", "Card", "Dining Dollars", "Or: ", "Add another Item", " Cancel Order", "Total Cost: $"]);
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

    return (<Fragment>
        <img alt="Spin N Stone Logo" className="logo1" src={LOGO} />
        <h1 className="pageTitle-checkout">{test[0]}</h1>
        <div className="grid-container-topping3">
            <button className="grid-item-topping3" onClick={Finishorder}>{test[1]}</button>
            <button className="grid-item-topping3" onClick={Finishorder}>{test[2]}</button>
            <button className="grid-item-topping3" onClick={Finishorder}>{test[3]}</button>
        </div>
        <h1 className="or">{test[4]}</h1>
        <div className="grid-container-checkout">
            <a href="/pizzatype">
                <button className="grid-item-topping3">{test[5]}</button>
            </a >
            <a href="/pizzatypeCanceled">
                <button className="grid-item-topping3" >{test[6]}</button>
            </a>
        </div>

        <div className="order-container">
            <OrderInformation />
        </div>
        <p className="priceDisplay">{test[7]}{price}</p>
    </Fragment>);
}

export default Checkout;