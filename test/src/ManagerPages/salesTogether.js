import React, { Component , useState, useEffect } from 'react';
import Table from '../components/table';
import Navbar from './navbar';
import translateText from '../translate';


function SalesTogether(props) {

    const [togetherTable, setTogetherTable] = useState([]);
    const [beginDate, setBeginDate] = useState('Start');
    const [endDate, setEndDate] = useState('End');
    const [test, setTest] = useState(["Sales Together Report", "See the top selling item pairs over a specific time period", "Generate Report", "Enter a start and end date to generate a report for that period" ,"Start Date:", "End Date:", "Submit"]);

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
    
    const salesTogether = async (e) => {

        
        e.preventDefault();
        let salesTogether1 = []
        const response = await fetch(`http://localhost:5001/salesTogether/${beginDate}/${endDate}`);
        const jsonData = await response.json();
        
        console.log(jsonData);

        var hasCheese=false;
        var hasPepperoni=false;
        var hasOneTop=false;
        var hasMultiTop=false;
        var hasFountain=false;
        var hasEnergy=false;
        var hasWater=false;
        var hasTea=false;

        var cnp = 0;
        var cno = 0;
        var cnm = 0;
        var cnf = 0;
        var cne = 0;
        var cnw = 0;
        var cnt = 0;
        var pno = 0;
        var pnm = 0;
        var pnf = 0;
        var pne = 0;
        var pnw = 0;
        var pnt = 0;
        var onm = 0;
        var onf = 0;
        var one = 0;
        var onw = 0;
        var ont = 0;
        var mnf = 0;
        var mne = 0;
        var mnw = 0;
        var mnt = 0;
        var fne = 0;
        var fnw = 0;
        var fnt = 0;
        var enw = 0;
        var ent = 0;
        var wnt = 0;

        for (let x of jsonData){
            if(hasCheese && hasPepperoni){
                cnp++;
            }if(hasCheese && hasOneTop){
                cno++;
            }if(hasCheese && hasMultiTop){
                cnm++;
            }if(hasCheese && hasFountain){
                cnf++;
            }if(hasCheese && hasEnergy){
                cne++;
            }if(hasCheese && hasWater){
                cnw++;
            }if(hasCheese && hasTea){
                cnt++;
            }if(hasPepperoni && hasOneTop){
                pno++;
            }if(hasPepperoni && hasMultiTop){
                pnm++;
            }if(hasPepperoni && hasFountain){
                pnf++;
            }if(hasPepperoni && hasEnergy){
                pne++;
            }if(hasPepperoni && hasWater){
                pnw++;
            }if(hasPepperoni && hasTea){
                pnt++;
            }if(hasOneTop && hasMultiTop){
                onm++;
            }if(hasOneTop && hasFountain){
                onf++;
            }if(hasOneTop && hasEnergy){
                one++;
            }if(hasOneTop && hasWater){
                onw++;
            }if(hasOneTop && hasTea){
                ont++;
            }if(hasMultiTop && hasFountain){
                mnf++;
            }if(hasMultiTop && hasEnergy){
                mne++;
            }if(hasMultiTop && hasWater){
                mnw++;
            }if(hasMultiTop && hasTea){
                mnt++;
            }if(hasFountain && hasEnergy){
                fne++;
            }if(hasFountain && hasWater){
                fnw++;
            }if(hasFountain && hasTea){
                fnt++;
            }if(hasEnergy && hasWater){
                enw++;
            }if(hasEnergy && hasTea){
                ent++;
            }if(hasWater && hasTea){
                wnt++;
            }
            hasCheese=false;
            hasPepperoni=false;
            hasOneTop=false;
            hasMultiTop=false;
            hasFountain=false;
            hasEnergy=false;
            hasWater=false;
            hasTea=false;

            if(x["pizzaname"] == "Cheese"){
            hasCheese=true;
            }if(x["pizzaname"]== "Pepperoni"){
            hasPepperoni=true;
            }if(x["pizzaname"]== "One Topping"){
            hasOneTop=true;
            }if(x["pizzaname"]== "2-4 Topping"){
            hasMultiTop=true;
            }if(x["drinkname"]== "fountain"){
            hasFountain=true;
            }if(x["drinkname"]== "bottledEnergyDrink"){
            hasEnergy=true;
            }if(x["drinkname"]== "bottledWater"){
            hasWater=true;
            }if(x["drinkname"]== "bottledTea"){
            hasTea=true;
            }
        }

        let temp = {"item1":"Cheese","item2":"Pepperoni","count": cnp};
        let temp2 = {"item1":"Cheese","item2": "One Topping","count":cno};
        let temp3 = {"item1":"Cheese","item2":"2-4 Topping","count":cnm};
        let temp4 = {"item1":"Cheese","item2":"fountain","count":cnf};
        let temp5 = {"item1":"Cheese","item2":"bottledEnergyDrink","count":cne};
        let temp6 = {"item1":"Cheese","item2":"bottledWater","count":cnw};
        let temp7 = {"item1":"Cheese","item2":"bottledTea","count":cnt};
        let temp8 = {"item1":"Pepperoni","item2":"One Topping","count":pno};
        let temp9 = {"item1":"Pepperoni","item2":"2-4 Topping","count":pnm};
        let temp10 = {"item1":"Pepperoni","item2":"fountain","count":pnf};
        let temp11 = {"item1":"Pepperoni","item2":"bottledEnergyDrink","count":pne};
        let temp12 = {"item1":"Pepperoni","item2":"bottledWater","count":pnw};
        let temp13 = {"item1":"Pepperoni","item2":"bottledTea","count":pnt};
        let temp14 = {"item1":"One Topping","item2":"2-4 Topping","count":onm};
        let temp15 = {"item1":"One Topping","item2":"fountain","count":onf};
        let temp16 = {"item1":"One Topping","item2":"bottledEnergyDrink","count":one};
        let temp17 = {"item1":"One Topping","item2":"bottledWater","count":onw};
        let temp18 = {"item1":"One Topping","item2":"bottledTea","count":ont};
        let temp19 = {"item1":"2-4 Topping","item2":"fountain","count":mnf};
        let temp20 = {"item1":"2-4 Topping","item2":"bottledEnergyDrink","count":mne};
        let temp21 = {"item1":"2-4 Topping","item2":"bottledWater","count":mnw};
        let temp22 = {"item1":"2-4 Topping","item2":"bottledTea","count":mnt};
        let temp23 = {"item1":"fountain","item2":"bottledEnergyDrink","count":fne};
        let temp24 = {"item1":"fountain","item2":"bottledWater","count":fnw};
        let temp25 = {"item1":"fountain","item2":"bottledTea","count":fnt};
        let temp26 = {"item1":"bottledEnergyDrink","item2":"bottledWater","count":enw};
        let temp27 = {"item1":"bottledEnergyDrink","item2":"bottledTea","count":ent};
        let temp28 = {"item1":"bottledWater","item2":"bottledTea","count":wnt};
        salesTogether1.push(temp); salesTogether1.push(temp2); salesTogether1.push(temp3); salesTogether1.push(temp4); salesTogether1.push(temp5); salesTogether1.push(temp6);
        salesTogether1.push(temp7); salesTogether1.push(temp8); salesTogether1.push(temp9);
        salesTogether1.push(temp10); salesTogether1.push(temp11); salesTogether1.push(temp12); salesTogether1.push(temp13); salesTogether1.push(temp14); salesTogether1.push(temp15); salesTogether1.push(temp16); salesTogether1.push(temp17); salesTogether1.push(temp18); salesTogether1.push(temp19); salesTogether1.push(temp20); salesTogether1.push(temp21); salesTogether1.push(temp22); salesTogether1.push(temp23); salesTogether1.push(temp24); salesTogether1.push(temp25); salesTogether1.push(temp26); salesTogether1.push(temp27); salesTogether1.push(temp28);

        for (let i = 0; i< salesTogether1.length-1; ++i){
            for (let j= 0; j< salesTogether1.length - i - 1; ++j){
                if (salesTogether1[j]["count"] < salesTogether1[j + 1]["count"]){
                    let temp = salesTogether1[j];
                    salesTogether1[j] = salesTogether1[j+1];
                    salesTogether1[j+1] = temp;
                }
            }
        }

        setTogetherTable(salesTogether1);

    }


    return ( 
        <React.Fragment>
            <Navbar lang={props.lang}/>
            <div class='heading'>
                <h1>{test[0]}</h1>
                <p>{test[1]}</p><hr></hr>
            </div>
            <br></br>
            <Table data={togetherTable} column={props.column}/>
            <br></br><br></br>
            <h1>{test[2]}</h1>
            <p>{test[3]}</p>
            <form onSubmit={console.log('submit')}>
                <label for="beginDate">{test[4]}</label>
                <input type="text" className='form-control1' id='beginDate' value={beginDate} onChange={e => setBeginDate(e.target.value)}/>
                <label for="endDate">{test[5]}</label>
                <input type="text" className='form-control1' id='endDate' value={endDate} onChange={e => setEndDate(e.target.value)}/>
                <br></br><br></br>
                <button onClick={salesTogether} class='button'>{test[6]}</button>
            </form>
        </React.Fragment>

    );
}

export default SalesTogether;