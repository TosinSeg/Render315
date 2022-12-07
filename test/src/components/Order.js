
import React from 'react'

import "./style.css";

function Order({ sendToOrderPanel }) {

    const spanColor = {
        color: '#FDDB3A',
        position: 'absolute',
        right: 30
    }
    const spanBottom = {
        'font-size': '36px',
        color: '#e12301',
        position: 'absolute',
        right: 30
    };

    function moneyFormat(num) {
        let val = (Math.round(num * 100) / 100).toFixed(2);
        return "$" + val;
    }

    function processOrder() {
        // alert(sendToOrderPanel)
        let orders = sendToOrderPanel.split("|");
        for (let i = 0; i < orders.length; i++) {
            orders[i] = orders[i].split("*");
        }
        window.totalCost = 0;
        window.orderLength = 0
        if (orders.length !== undefined)
            window.orderLength = orders.length;
        for (let i = 0; i < orders.length; i++) {
            let cost = 0.0;
            let s = orders[i]
            let type = s[0];
            if (type === "Cheese" || type === "Pepperoni") {
                cost = 6.79;
                s[1] = <p class="serverOrder">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Sauce: {s[1]}</p>;
                if (s[3] === "no_drink") {
                    s.pop();
                } else {
                    s[3] = <p class="serverOrder">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Drink: {s[3]}</p>;
                    cost += 1.20;
                }
                if (s[2] === "Regular Crust") {
                    delete s[2];
                } else {
                    s[2] = <p class="serverOrder">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Crust: {s[2]}</p>;
                    cost += 2.99;
                }
                if (type === "Cheese") {
                    s[0] = <p class="serverOrder">&emsp;&emsp;&emsp;{s[0]}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <span style={spanColor} >{moneyFormat(cost)}</span></p>
                } else {
                    s[0] = <p class="serverOrder">&emsp;&emsp;&emsp;{s[0]}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span style={spanColor} >{moneyFormat(cost)}</span></p>
                }
            } else if (type === "Drink") {
                cost = 2.45;
                s[1] = <p class="serverOrder">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Size: {s[1]}</p>;
                s[0] = <p class="serverOrder">&emsp;&emsp;&emsp;{s[0]}&emsp;&emsp;&emsp;&emsp;<span style={spanColor} >{moneyFormat(cost)}</span></p>

            } else if (type !== "") {
                s[1] = <p class="serverOrder">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Sauce: {s[1]}</p>;
                cost = 7.79;
                if (s[3] !== "undefined") {
                    s[3] = s[3].split(",");
                    // s[3].splice(0,0,<p>&emsp;&emsp;Toppings:</p>);
                    for (let j = 1; j < s[3].length; j++) {
                        // s[3][j] = <p>&emsp;&emsp;&emsp; {s[3][j]}</p>;
                        cost = 8.99;
                        s[3][j] = " " + s[3][j];
                    }
                    s[3] = <p class="serverOrder">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Toppings:&emsp;&emsp;{s[3].toString()}</p>
                } else {
                    delete s[3];
                }
                if (s[2] === "Regular Crust") {
                    delete s[2];
                } else {
                    cost += 2.99;
                    s[2] = <p class="serverOrder">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Crust: {s[2]}</p>;
                }
                if (type === "One Topping") {
                    s[0] = <p class="serverOrder">&emsp;&emsp;&emsp;{s[0]}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span style={spanColor} >{moneyFormat(cost)}</span></p>
                } else {
                    s[0] = <p class="serverOrder">&emsp;&emsp;&emsp;{s[0]}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  <span style={spanColor} >{moneyFormat(cost)}</span></p>
                }
            }
            window.totalCost += cost;

        }
        return orders;
    }

    return (
        <div>
            <div class="serverOrder">
                <p class="serverOrder">Order:</p>
                {processOrder()}
                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{<span style={spanBottom} >{moneyFormat(window.totalCost)}</span>}</p>
            </div>
        </div>
    )
}


export default Order;