import React, { useState, useEffect } from 'react';
import Table from '../components/table';
import Navbar from './navbar';
import translateText from '../translate';

function RestockReport(props) {
    const [restockTable, setRestockTable] = useState([]);
    const [test, setTest] = useState(["Restock Report", "View past restocks"]);

    const getRestockData = async () => {
        const response = await fetch("https://spinapi.onrender.com/restockReport");
        const jsonData = await response.json();
        var data = []
        for (let x of jsonData){
            let amt = Math.floor(Math.random() * 500) + 500;
            data.push({"name": x["name"], "count": x["count"], "amount": amt})
        }
        setRestockTable(data);
        
    }

    useEffect(() => {
        (async () => {
            getRestockData();
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
            <Table data={restockTable} column={props.column}></Table> 
        </React.Fragment>
        
    );
}

export default RestockReport;