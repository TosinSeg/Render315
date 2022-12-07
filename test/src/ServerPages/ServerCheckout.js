import React from 'react'

const ServerCheckout = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(e.currentTarget.id);
        let str = e.currentTarget.id;
        if (str === "Dining Dollars") {
            props.onSubmit(e, str);
        } else if (str === "Cash") {
            props.onSubmit(e, str);
        } else {
            props.onSubmit(e, str);
        }
    }

    return (
        <div>
            <form id="Dining Dollars" onSubmit={handleSubmit}>
                <button type="submit">Dining Dollars</button>
            </form>
            <form id="Cash" onSubmit={handleSubmit}>
                <button type="submit">Cash</button>
            </form>
            <form id="Credit" onSubmit={handleSubmit}>
                <button type="submit">Credit Card</button>
            </form>
        </div>
    )
}


export default ServerCheckout