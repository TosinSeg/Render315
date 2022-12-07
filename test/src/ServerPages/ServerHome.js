// import {NavLink} from "./components/MainButtonMenu";
import React, { useState } from "react";
import Order from "../components/Order";
import MainButtonMenu from "../components/MainButtonMenu";
import "../components/style.css";



function ServerHome() {
  const [order, sendOrder] = useState('');
  // const translate = require('google-translate-api');


  const [newOrderItem, addOrder] = useState('');
  const receiveOrder = (orderAddOn) => {
    if (orderAddOn !== undefined) {
      if (orderAddOn === "Dining Dollars" || orderAddOn === "Cash" || orderAddOn === "Credit") {
        // alert("received " + orderAddOn);
        checkout(order);
      } else {
        sendOrder(order + "" + orderAddOn);
      }
    }
    // alert(order);
  }

  const checkout = async (order) => {
    alert("order: " + order);
    const response = await fetch("http://localhost:5001/serverCheckout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "order": order
      })
    })
    sendOrder("")
  }

  return (
    <div id="background">

      <div id="logo">
        <h3 id="logo-words">Spin 'N Stone</h3>
      </div>

      <div id="main-body">
        <div id="menu-panel" className="main-body-container">
          <MainButtonMenu onSubmit={receiveOrder} />
        </div>
        <div id="order-panel" className="main-body-container">
          <Order sendToOrderPanel={order} />
        </div>
      </div>
    </div>
  );
}

export default ServerHome;