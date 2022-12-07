import React, { useEffect, Fragment, useState } from "react";
import "../components/pizzabuilder.css"

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('~').map(str => <p className="orderDisplay">{str}</p >);
    return newText;
}

function OrderInformation() {
    const [response, setResponse] = useState("");
    const OrderInfo = async () => {
        let order = await fetch("http://localhost:5001/checkoutScreen").then((response) => response.text());
        order = order.replace(/\"/g, "");
        order = order.replace(/\\/g, "");
        setResponse(order);
    }
    useEffect(() => {

        OrderInfo();

    }, [response])
    return (
        <Fragment>
            <div id="orderplz"> <NewlineText text={response} /></div>

        </Fragment >
    );
}

export default OrderInformation;