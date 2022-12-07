import React, { Component, useState, useEffect, Fragment } from 'react';
import Table from '../components/table';
import Navbar from './navbar';
import translateText from '../translate';

function Menu(props) {
    const [menu, setMenu] = useState([]);
    const [test, setTest] = useState("test");
    const [id, setId] = useState(0);
    const [count, setCount] = useState(0);
    const [newCost, setNewCost] = useState(0);
    const [ingName, setIngName] = useState('ingredient name');
    const [name, setName] = useState('Ingredient');
    const [price, setPrice] = useState(0);
    

    const getMenu = async () => {
        const response = await fetch("http://localhost:5001/menu");
        const jsonData = await response.json();
        setMenu(jsonData)
    }

    const addNewIngredient = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5001/inventory");
        const jsonData = await response.json();
        let n = jsonData.length;
        console.log(n);
        const body = {"name": ingName, "count": count, "cost": newCost, "num": n};
        const respone = await fetch("http://localhost:5001/addIngredient", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
    }
    const addNewItem = async (e) => {
        e.preventDefault();
        const body = {"id": id, "name": name, "price": price};
        const respone = await fetch("http://localhost:5001/addItem", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        await getMenu();
    }

    const changePrice = async (e) => {
        e.preventDefault();
        const body = {"id": id, "newPrice": price};
        const respone = await fetch("http://localhost:5001/updatePrice", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });
        
        await getMenu();
    }

    useEffect(() => {
        getMenu();
        console.log(props.lang);
        translateText(test, props.lang).then(res => setTest(res));
    }, [props.lang])

    return (
        <Fragment> 
            <Navbar/>
            <div class='heading'>
                <h1>{test}</h1>
                <h1>Menu</h1>
                <p>Add new seasonal ingredients, add a new item to the menu, or change the price of a current menu item</p>
                <hr></hr>
            </div>
            <Table data={menu} column={props.column}/><br></br><br></br>
            <div class='new-ingr'>
                <h1>Add a New Ingredient</h1>
                <p>Add a new ingredient to the inventory by entering the name, amount to add to the inventory, and the cost of the new ingredient</p><br></br><br></br>
                <form onSubmit={getMenu}>
                    <label for="ingrName">Ingredient Name:</label>
                    <input type="text" className='form-control1' id='ingrName' value={ingName} onChange={e => setIngName(e.target.value)}/>
                    <label for="addAmount">Amount to Add:</label>
                    <input type="text" className='form-control1' id='addAmount' value={count} onChange={e => setCount(e.target.value)}/>
                    <label for="ingrCost">Ingredient Cost:</label>
                    <input type="text" className='form-control1' id='ingrCost' value={newCost} onChange={e => setNewCost(e.target.value)}/>
                    <br></br><br></br><br></br>
                    <button onClick={addNewIngredient} class="button">Submit</button>
                </form>
            </div>
            <hr></hr>
            <div class='new-item'>
                <h1>Add a New Item</h1>
                <p>Add a new item to the menu by entering the item's ID, name, and price</p>
                <br></br><br></br>
                <form>
                    <label for="itemId">Item ID:</label>
                    <input type="text" className='form-control1' id='itemId' value={id} onChange={e => setId(e.target.value)}/>
                    <label for="itemName">Item Name:</label>
                    <input type="text" className='form-control1' id='itemName' value={name} onChange={e => setName(e.target.value)}/>
                    <label for="itemPrice">Item Price:</label>
                    <input type="text" className='form-control1' id='itemPrice' value={price} onChange={e => setPrice(e.target.value)}/>
                    <br></br><br></br><br></br>
                    <button onClick={addNewItem} class="button">Submit</button>
                </form>   
            </div>
            <hr></hr>
            <div class='price-change'>
                <h1>Change a price</h1>
                <p>Change the price of an item currently on the menu from the table above</p>
                <br></br><br></br>
                <form>
                    <label for="changeID">Item ID:</label>
                    <input type="text" className='form-control1' id='changeID' value={id} onChange={e => setId(e.target.value)}/>
                    <label for="newPrice">new Price:</label>
                    <input type="text" className='form-control1' id='newPrice' value={price} onChange={e => setPrice(e.target.value)}/>
                    <br></br><br></br><br></br>
                    <button onClick={changePrice} class="button">Submit</button>
                    <br></br><br></br>
                </form>   
            </div>
          
        </Fragment>
        );
}


export default Menu;