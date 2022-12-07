import React, { Component, Fragment, useEffect } from 'react';
import { useState } from 'react';
import Table from '../components/table';
import Navbar from './navbar';
import translateText from '../translate';

function Restock(props) {
    const [id, setID] = useState('ID');
    const [newAmount, setNewAmount] = useState(0);
    const [inventory, setInventory] = useState([]);
    const [test, setTest] = useState(["Restock", "View and restock the inventory by each item or restock all items to the recommended amount", "Restock Single Item", "Restock a single item by entering the item ID and the amount to order", "Item ID:", "Order Amount:", "Submit", "Restock All", "Restock all ingredients in the inventory by the recommended amount", "Restock Suggested Amount"]);

    const getInventory = async () => {
        const response = await fetch("https://spinapi.onrender.com/inventory");
        const jsonData = await response.json();
        console.log(jsonData);
        setInventory(jsonData)
    }

    useEffect(() => {
        getInventory();
        (async () => {
            console.log(props.lang);
            let temp = []
            for (let i = 0; i<test.length; ++i){
                await translateText(test[i], props.lang).then(res => temp.push(res));
            }
            setTest(temp);
        })();

    }, [props.lang, newAmount, id])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        //console.log("clicked");
        const body = {"id": id, "newAmount": newAmount};
        console.log(body);
        const respone = await fetch("https://spinapi.onrender.com/updateAmount", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        await getInventory();
    } 

    const restockSuggested = async (e) => {
        e.preventDefault();
        console.log(inventory.length)
        for (let i = 1; i<=inventory.length; ++i){
            let amt = Math.floor(Math.random() * 200) + 100;
            console.log(amt);
            const body = {"id": i, "newAmount": amt};
            const respone = await fetch("https://spinapi.onrender.com/updateAmount", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });
        }
        await getInventory();
    }

    return (
        <Fragment>
            <Navbar lang={props.lang}/>
            <div class='heading'>
                <h1>{test[0]}</h1>
                <p>{test[1]}</p>
                <hr></hr>
            </div>
            <Table data={inventory} column={props.column}/>
            <br></br><br></br>
            <h1>{test[2]}</h1>
            <p>{test[3]}</p><br></br><br></br>
            <form onSubmit={onSubmitForm}>
                <label for="itemId">{test[4]}</label>
                <input type="text" className="form-control1" id='itemID' value={id} onChange={e => setID(e.target.value)}/>
                <label for="newAmount">{test[5]}</label>
                <input type="text" className="form-control1" id='newAmount'value={newAmount} onChange={e => setNewAmount(e.target.value)}/>
                <br></br><br></br><br></br>
                <button onClick={onSubmitForm} class='button'>{test[6]}</button>
                <hr></hr>
            </form>
            <h1>{test[7]}</h1>
            <p>{test[8]}</p><br></br><br></br>
            <button onClick={restockSuggested}class='button'>{test[9]}</button>
            <br></br><br></br>
            
        </Fragment>
        
        );
}

export default Restock;