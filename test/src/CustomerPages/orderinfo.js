import React, { useEffect, Fragment, useState } from "react";
import "../components/pizzabuilder.css"
import translateText from "../translate";
function NewlineText(props) {
    const text = props.text;
    const newText = text.split('~').map(str => <p className="orderDisplay">{str}</p >);
    return newText;
}

function OrderInformation(props) {
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

    const [test, setTest] = useState(response);
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
    return (
        <Fragment>
            <div id="orderplz"> <NewlineText text={test[0]} /></div>


        </Fragment >
    );
}

export default OrderInformation;