import React, { useEffect, useState } from "react";
import Table from "../components/table.jsx";
import Navbar from "./navbar.js";
import Menu from "./menu.js";
import Restock from "./restock.js";
import Inventory from "./inventory.js";
import Trends from "./trends.js";
//import ManagerHome from "./home.js";
import RestockReport from "./restockReport.js";
import ExcessReport from "./excessReport.js";
import SalesTogether from "./salesTogether.js";
import translateText from "../translate.js";

function ManagerHome(props) {
    const [test, setTest] = useState(["Welcome"]);
    let component
    switch(window.location.pathname) {
        case "/manager":
            component = <Navbar lang={props.lang}/>
            break
    }

    useEffect(() => {
        (async () => {
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
            {component}
            <div class ="heading">
                <h1>{test[0]}</h1>
                <hr></hr>
            </div>
            <div class = "pizza-image">
                <img src={require('../images/spinLogo.png')} class ="pizza-logo"/>
            </div>
            
        </React.Fragment>
        
    );
}
export default ManagerHome;