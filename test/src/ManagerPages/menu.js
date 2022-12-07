import React, { Component, useState, useEffect, Fragment } from 'react';
import Table from '../components/table';
import Navbar from './navbar';
import translateText from '../translate';

function Menu(props) {
    const [menu, setMenu] = useState([]);
    const [test, setTest] = useState(["Menu", "Add new seasonal ingredients, add a new item to the menu, or change the price of a current menu item", "Add a New Ingredient", "Add a new ingredient to the inventory by entering the name, amount to add to the inventory, and the cost of the new ingredient", "Ingredient Name:", "Amount to Add:", "Ingredient Cost:", "Submit", "Add a New Item", "Add a new item to the menu by entering the item's ID, name, and price", "Item ID:", "Item Name:", "Item Price:", "Submit", "Change a price", "Change the price of an item currently on the menu from the table above", "new Price:"]);
    
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
        (async () => {
            getMenu();
            console.log(props.lang);
            let temp = []
            for (let i = 0; i<test.length; ++i){
                await translateText(test[i], props.lang).then(res => temp.push(res));
            }
            setTest(temp);
        })();
        
    }, [props.lang])

    return (
        <Fragment> 
            <Navbar/>
            <div class='heading'>
                <h1>{test[0]}</h1>
                <p>{test[1]}</p>
                <hr></hr>
            </div>
            <Table data={menu} column={props.column}/><br></br><br></br>
            <div class='new-ingr'>
                <h1>{test[2]}</h1>
                <p>{test[3]}</p><br></br><br></br>
                <form onSubmit={getMenu}>
                    <label for="ingrName">{test[4]}</label>
                    <input type="text" className='form-control1' id='ingrName' value={ingName} onChange={e => setIngName(e.target.value)}/>
                    <label for="addAmount">{test[5]}</label>
                    <input type="text" className='form-control1' id='addAmount' value={count} onChange={e => setCount(e.target.value)}/>
                    <label for="ingrCost">{test[6]}</label>
                    <input type="text" className='form-control1' id='ingrCost' value={newCost} onChange={e => setNewCost(e.target.value)}/>
                    <br></br><br></br><br></br>
                    <button onClick={addNewIngredient} class="button">{test[7]}</button>
                </form>
            </div>
            <hr></hr>
            <div class='new-item'>
                <h1>{test[8]}</h1>
                <p>{test[9]}</p>
                <br></br><br></br>
                <form>
                    <label for="itemId">{test[10]}</label>
                    <input type="text" className='form-control1' id='itemId' value={id} onChange={e => setId(e.target.value)}/>
                    <label for="itemName">{test[11]}</label>
                    <input type="text" className='form-control1' id='itemName' value={name} onChange={e => setName(e.target.value)}/>
                    <label for="itemPrice">{test[12]}</label>
                    <input type="text" className='form-control1' id='itemPrice' value={price} onChange={e => setPrice(e.target.value)}/>
                    <br></br><br></br><br></br>
                    <button onClick={addNewItem} class="button">{test[13]}</button>
                </form>   
            </div>
            <hr></hr>
            <div class='price-change'>
                <h1>{test[14]}</h1>
                <p>{test[15]}</p>
                <br></br><br></br>
                <form>
                    <label for="changeID">{test[10]}</label>
                    <input type="text" className='form-control1' id='changeID' value={id} onChange={e => setId(e.target.value)}/>
                    <label for="newPrice">{test[16]}</label>
                    <input type="text" className='form-control1' id='newPrice' value={price} onChange={e => setPrice(e.target.value)}/>
                    <br></br><br></br><br></br>
                    <button onClick={changePrice} class="button">{test[13]}</button>
                    <br></br><br></br>
                </form>   
            </div>
          
        </Fragment>
        );
}


export default Menu;