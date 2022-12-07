import React, { useState, useEffect } from 'react';
import Table from "../components/table.jsx";
import Navbar from './navbar';
import translateText from '../translate.js';
const {Url} = require('url');


function ExcessReport(props) {
    const [excessTable, setExcessTable] = useState([1,1,1]);
    const [beginDate, setBeginDate] = useState('YYYY-MM-DD');
    const [endDate, setEndDate] = useState('YYYY-MM-DD');
    const [test, setTest] = useState(["Excess Report", "View the items in the inventory that were excess over a time period", "Generate Report", "Enter start and end date for desired time period.", "Start Date:", "End Date:"]);
    
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

    const getExcessData = async (e) => {
        e.preventDefault();
        let rData = []
        var url = new Url('https://spinapi.onrender.com/excessReport');
        var params = {"beginDate": beginDate, "endDate": endDate};
        url.search = new URLSearchParams(params).toString();
        const response = await fetch(`https://spinapi.onrender.com/excessReport/${beginDate}/${endDate}`);
        const jsonData = await response.json();
        var data = new Set()
        for (let i = 0; i<jsonData.length; ++i){
            if ((jsonData[i]["id"]-901001 >= 7 && jsonData[i]["id"]-901001 <= 33) || i % 33 == 0) {
                data.add(jsonData[i]["id"]%33+20);
            }
        }
        console.log(data);
        
        for (let x of data){
            const response2 = await fetch(`https://spinapi.onrender.com/id/${x}`).then((res) => {
                res.json().then((jsonData2) => {
                    console.log(jsonData2)
                    rData.push({"id": jsonData2[0]["id"], "name": jsonData2[0]["name"], "count": jsonData2[0]["count"]});
                    console.log(rData);
                });
            });
                    
            
            
        }
        setExcessTable(rData);
    }

    return ( 
        <React.Fragment>
            <Navbar lang={props.lang}/>
            <div class='heading'>
                <h1>{test[0]}</h1>
                <p>{test[1]}</p>
                <hr></hr>
                <br></br><br></br>
            </div>
            <Table data={excessTable} column={props.column}></Table> 
            <br></br><br></br>
            <h1>{test[2]}</h1>
            <p>{test[3]}</p>
            <br></br>
            <form>
                <label for="start">{test[4]}</label>
                <input type="text" className='form-control1' id='start' value={beginDate} onChange={e => setBeginDate(e.target.value)}/>
                <label for="end">{test[5]}</label>
                <input type="text" className='form-control1' id='end' value={endDate} onChange={e => setEndDate(e.target.value)}/>
                <br></br><br></br><br></br>
                <button onClick={getExcessData} class='button'>{test[2]}</button>
            </form>
        </React.Fragment>
        
    );
}
export default ExcessReport;