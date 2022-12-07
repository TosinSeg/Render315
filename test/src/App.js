/* global google */
import React, { useEffect, useState } from "react";
import Table from './components/table.jsx'
import Navbar from "./navbar.js";
import Menu from "./ManagerPages/menu.js";
import Restock from "./ManagerPages/restock.js";
import Inventory from "./ManagerPages/inventory.js";
import Trends from "./ManagerPages/trends.js";
import ManagerHome from "./ManagerPages/home.js";
import RestockReport from "./ManagerPages/restockReport.js";
import ExcessReport from "./ManagerPages/excessReport.js";
import SalesTogether from "./ManagerPages/salesTogether.js";
import Employee from "./ManagerPages/employeeReport.js";
import Checkout from "./CustomerPages/checkout.js";
import Drizzle from "./CustomerPages/drizzle.js";
import Meats from "./CustomerPages/meats.js";
import Pizzatype from "./CustomerPages/pizzatype.js";
import PizzatypeCancel from "./CustomerPages/pizzatypeCanceled";
import Pizzatypediff from "./CustomerPages/pizzatypediff";
import Sauce from "./CustomerPages/sauce.js";
import Seasonal from "./CustomerPages/seasonal.js";
import ToppingOne from "./CustomerPages/topping-one.js";
import Topping from "./CustomerPages/topping.js";
import ToppingMulti from "./CustomerPages/topping-multi.js";
import Veggies from "./CustomerPages/veggies.js";
import LocationGuide from "./CustomerPages/locationguide"
import Directions from "./CustomerPages/directions.js";
import ServerHome from "./ServerPages/ServerHome.js";
import jwt_decode from "jwt-decode";
import NavbarAuth from "./auth/navbarAuth.js";
//import LangSelect from "./components/langSelect.js";
//import { response } from "express";
import translateText from "./translate.js";
//const database = require("./database");


function App() {
    const [show, setShow] = useState(true);
    const [language, setLanguage] = useState('en');
    const [ user, setUser ] = useState({});
    const [inventoryTable, setInventoryTable] = useState([1,1,1,1,1,1,1,1,1]);
    const [restockTable, setRestockTable] = useState([]);
    const [excessTable, setExcessTable] = useState([]);
    const [menuTable, setMenuTable] = useState([1, 1, 1, 1, 1, 1, 1]);
    const [togetherTable, setTogetherTable] = useState([]);
    const [salesTrendsTable, setSalesTrendsTable] = useState([]);
    const [employeeTable, setEmployeeTable] = useState([]);
    

    const langs = {'English':'en', 'Spanish':'es', 'Italian':'it', 'Chinese':'zh-CN', 'German':'de'};

    function handleCallbackResponse(response){
        console.log("Encoded JWT Id token " + response.credential);
        var userObject = jwt_decode(response.credential);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true; 
    }
    
    useEffect(() => {
        const googleScript = document.getElementById("googleA");
        const interval = setInterval(() => {
            setUser({});
            if (window.google){
                clearInterval(interval);
                google.accounts.id.initialize({
                    client_id: "1014333270008-g8ajq98lbek1dip8pmv3q1er4k91apjk.apps.googleusercontent.com",
                    callback: handleCallbackResponse,
                });
        
                google.accounts.id.renderButton(document.getElementById("signInDiv"),
                    {theme: "outline", size: "large"}
                );
        
                //google.accounts.id.prompt();
            }
    
            googleScript.addEventListener('load', () => {
                // Patiently waiting to do the thing 
            });
        }, 500);
        // while (!window.google) {
        //     interval = ;
        // }
        
        
        return () => clearInterval(interval);
    }, [])

    function handleSignOut(e) {
        setUser({});
        console.log("signed out");
        document.getElementById("signInDiv").hidden = false;
    }



    const handleClick = (e) => {
        e.preventDefault();
        setLanguage(langs[e.target.value]);
        console.log("here");
        console.log(e.target.value);
    }

    const invColumn = [
        { heading: 'ID', key: 1, value: "id" },
        { heading: 'Name', key: 2, value: "name" },
        { heading: 'Item Type', key: 4, value: "itemtype" },
        { heading: 'Cost', key: 3, value: "cost" },
        { heading: 'Count', key: 4, value: "count" },

    ];

    const toColumn = [
        { heading: 'ID', key: 5, value: "item1" },
        { heading: 'Name', key: 6, value: "item2" },
        { heading: 'Count', key: 7, value: "count" },
    ];

    const restockReportCols = [
        { heading: 'Name', key: 10, value: "name" },
        { heading: 'Count', key: 12, value: "count" },
        { heading: 'Amount', key: 11, value: "amount" },
    ];

    const menuColumn = [
        { heading: 'ID', key: 13, value: "id" },
        { heading: 'Name', key: 14, value: "name" },
        { heading: 'Cost', key: 15, value: "price" },
    ];

    const excessCols = [
        { heading: 'ID', key: 16, value: "id" },
        { heading: 'Name', key: 17, value: "name" },
        { heading: 'Count', key: 18, value: "count" },
    ];

    const salesTrendsCols = [ //TODO
        { heading: 'Name', key: 19, value: "name" },
        { heading: 'Units Sold', key: 20, value: "count" },
    ];

    const employeeCols = [
        { heading: 'ID', key: 21, value: "id" },
        { heading: 'Name', key: 22, value: "employeename" },
        { heading: 'Num Sales', key: 24, value: "numsales" },
        { heading: 'Total Sales', key: 23, value: "totalsales" },

    ];




    let component
    switch (window.location.pathname) {
        case "/":
            component = (Object.keys(user).length==0 ? <Navbar/> : <NavbarAuth/>)
            break
        case "/manager":
            component = <ManagerHome />
            break
        case "/customer":
            component = <Pizzatype />
            break
        case "/server":
            component = <ServerHome />
            break
        case "/server":
            component = <ManagerHome />
            break
        case "/menu":
            component = <Menu data={menuTable} column={menuColumn} lang={language}/>
            break
        case "/restock":
            component = <Restock data={inventoryTable} column={invColumn} />
            break
        case "/inventory":
            component = <Inventory data={inventoryTable} column={invColumn} />
            break
        case "/trends":
            component = <Trends data={salesTrendsTable} column={salesTrendsCols} />
            break
        case "/restockReport":
            component = <RestockReport data={restockTable} column={restockReportCols} />
            break
        case "/excessReport":
            component = <ExcessReport data={excessTable} column={excessCols} />
            break
        case "/salesTogether":
            component = <SalesTogether data={togetherTable} column={toColumn} />
            break
        case "/employeeReport":
            component = <Employee data={employeeTable} column={employeeCols} />
            break
        case "/pizzatype":
            component = <Pizzatype />
            break
        case "/topping":
            component = <Topping />
            break
        case "/pizzatypeCanceled":
            component = <PizzatypeCancel />
            break
        case "/pizzatypediff":
            component = <Pizzatypediff />
            break
        case "/topping-multi":
            component = <ToppingMulti />
            break
        case "/topping-one":
            component = <ToppingOne />
            break
        case "/veggies":
            component = <Veggies />
            break
        case "/drizzle":
            component = <Drizzle />
            break
        case "/meats":
            component = <Meats />
            break
        case "/sauce":
            component = <Sauce />
            break
        case "/seasonal":
            component = <Seasonal />
            break
        case "/checkout":
            component = <Checkout />
            break
        case "/locationguide":
            component = <LocationGuide />
            break
    }
    return (
        <React.Fragment>
            <div id="signInDiv"></div>
            <div className='dropdown'>
                Choose Language

                {show && <select onChange={(e) => handleClick(e)}>
                    {Object.keys(langs).map((lang, val) => <option>{lang}</option>)}
                </select>}
            </div> 
            {Object.keys(user).length != 0 &&  <button onClick={(e) => handleSignOut(e)}>Sign Out</button>}
            {user && <h3>{user.name}</h3>}
            {component}
        </React.Fragment>

    );
}
export default App;