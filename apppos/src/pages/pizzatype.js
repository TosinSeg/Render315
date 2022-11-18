import React from 'react';

const handleClickPep = async () => {
    fetch(`http://localhost:5001/createSetPizza/${1}/${"Pepperoni"}`);
    alert("Pizza added to order");
}
const CheeseZa = async () => {
    fetch(`http://localhost:5001/createSetPizza/${1}/${"Cheese"}`);
    alert("Pizza added to order");
}
const oneTopping = async () => {
    fetch(`http://localhost:5001/createPizza/${1}/${"One Topping"}`);
}
const multiTopping = async () => {
    fetch(`http://localhost:5001/createPizza/${4}/${"Multi Topping"}`);
}
const cancelOrder = async () => {
    fetch(`http://localhost:5001/cancelOrder`);
    alert("Order Canceled");
}



function Pizzatype() {
    return (
        <div>
            <button onClick={handleClickPep}>Pepperoni Pizza</button>
            <button onClick={CheeseZa}>Cheese</button>
            <a href="/topping">
                <button onClick={oneTopping}>One Topping</button>
            </a>
            <a href="/topping">
                <button onClick={multiTopping}>2-4 Topping</button>
            </a>
            <div>
                <a href="/pizzatype">
                    <button onClick={cancelOrder}> Cancel Order</button>
                </a>
                <a href="/checkout">
                    <button > Complete Order</button>
                </a>
            </div>
        </div>
    );
}




export default Pizzatype;