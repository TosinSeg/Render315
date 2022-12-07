import React, { Component, useEffect, useState } from 'react';
import Table from "../components/table.jsx";
import Navbar from './navbar';
import translateText from '../translate.js';

function Inventory(props) {

    const [inventory, setInventory] = useState([]);
    const [test, setTest] = useState(["Inventory", "View the current inventory"])

    const getInventory = async () => {
        const response = await fetch("https://spinapi.onrender.com/inventory");
        const jsonData = await response.json();
        setInventory(jsonData)
    }
  
    useEffect(() => {
        (async () => {
            getInventory();
            console.log(props.lang);
            let temp = []
            for (let i = 0; i<test.length; ++i){
                await translateText(test[i], props.lang).then(res => temp.push(res));
            }
            setTest(temp);
        })();

    }, [props.lang])
    
    return (
        
        <React.Fragment>
        <Navbar lang={props.lang}/>    
        <div class='heading'>
            <h1>{test[0]}</h1>
            <p>{test[1]}</p>
            <hr></hr>
        </div> 

         <Table data={inventory} column={props.column}/> 
         <br></br><br></br><br></br>

        </React.Fragment>
         
    );
}

export default Inventory;