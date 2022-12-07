import React, { Component, useState, useEffect } from 'react';
import Table from '../components/table';
import Navbar from './navbar';
import translateText from '../translate';

function Trends(props) {
    console.log(window.location.pathname);
    const [trendsTable, setTrendsTable] = useState([1,1,1]);
    const [beginDate, setBeginDate] = useState('MM-DD-YYYY');
    const [endDate, setEndDate] = useState('MM-DD-YYYY');
    const [test, setTest] = useState(["Sales Trends", "Generate itemized sales report over period of time", "Generate Report Over Specific Time Period", "Enter a start and end date for the period to be searched", "Start Date:", "End Date:", "Generate Report"]);

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

    const getTrendsData = async (e) => {
        e.preventDefault();
        //console.log(beginDate);
        let itemNames = [];
        let itemCounts = [];
        
        let rData = []
        // var url = new Url('https://spinapi.onrender.com/excessReport');
        // var params = {"beginDate": beginDate, "endDate": endDate};
        // url.search = new URLSearchParams(params).toString();
        const menuResponse = await fetch("https://spinapi.onrender.com/menu");
        const menuJsonData = await menuResponse.json();

        for(let i = 0; i < menuJsonData.length; i++) {
            itemNames.push(menuJsonData[i]["name"]);
        }
        
        for(let i of itemNames) {
            console.log(i)
            const drinkResponse = await fetch(`https://spinapi.onrender.com/drinks/${i}`);
            const drinkJsonData = await drinkResponse.json();

            const pizzaResponse = await fetch(`https://spinapi.onrender.com/pizza/${i}`);
            const pizzaJsonData = await pizzaResponse.json();

            let itemCount = 0;
            let pizzaCount = 0;
            let drinkCount = 0;
            let temp1 = beginDate.replace("-","");
            let temp2 = endDate.replace("-","");
            temp1 = temp1.replace("-", "");
            temp2 = temp2.replace("-","");
            

            for(let pizza of pizzaJsonData) {
                
                if(temp1.charAt(0) == '1' || temp2.charAt(0) == '1') {
                    
                    let idCheck = (pizza["id"].toString()).substring(0,4);
                    let finalCheck = idCheck;
                    if(idCheck.charAt(0) != '1') {
                        finalCheck = '0' + idCheck.substring(0,3);
                    }
                    
                    if(parseInt(finalCheck,10) >= parseInt(temp1.substring(0,4), 10) && parseInt(finalCheck, 10) <= parseInt(temp2.substring(0,4), 10)) {
                        pizzaCount++;
                      }
                }
                
                else {
                    let idCheck = (pizza["id"].toString()).substring(0,3);
                    if(parseInt(idCheck, 10) >= parseInt(temp1.substring(1,4), 10) && parseInt(idCheck, 10) <= parseInt(temp2.substring(1,4), 10)) {
                      pizzaCount++;
                    }
                }
            }
            for(let drink of drinkJsonData) {
                if(temp1.charAt(0) == '1' || temp2.charAt(0) == '1') {
                    
                    let idCheck = (drink["id"].toString()).substring(0,4);
                    let finalCheck = idCheck;
                    if(idCheck.charAt(0) != '1') {
                        finalCheck = '0' + idCheck.substring(0,3);
                    }
                    
                    if(parseInt(finalCheck,10) >= parseInt(temp1.substring(0,4), 10) && parseInt(finalCheck, 10) <= parseInt(temp2.substring(0,4), 10)) {
                        drinkCount++;
                      }
                }
                
                else {
                    let idCheck = (drink["id"].toString()).substring(0,3);
                    if(parseInt(idCheck, 10) >= parseInt(temp1.substring(1,4), 10) && parseInt(idCheck, 10) <= parseInt(temp2.substring(1,4), 10)) {
                      drinkCount++;
                    }
                }
            }
            console.log(" ", pizzaCount, drinkCount, "\n")
            itemCount = Math.max(pizzaCount, drinkCount);
            itemCounts.push({'name':i, 'count':itemCount})
            
        }
        
        setTrendsTable(itemCounts);
    }
    return (
        <React.Fragment>
            <Navbar lang={props.lang}/>
            <div class="heading">
                <h1>{test[0]}</h1>
                <p>{test[1]}</p>
                <hr></hr>
            </div>
            <Table data={trendsTable} column={props.column}></Table>
            <br></br><br></br>
            <h1>{test[2]}</h1>
            <p>{test[3]}</p><br></br>
            <form>
                <label for="beginDate">{test[4]}</label>
                <input type="text" className='form-control1' id='beginDate'  value={beginDate} onChange={e => setBeginDate(e.target.value)}/>
                <label for="endDate">{test[5]}</label>
                <input type="text" className='form-control1' id='endDate' value={endDate} onChange={e => setEndDate(e.target.value)}/>
                <br></br><br></br><br></br>
                <button onClick={getTrendsData} class='button'>{test[6]}</button>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </form> 
        
        </React.Fragment>
    );
}

export default Trends;