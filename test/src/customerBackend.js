// import structuredClone from '@ungap/structured-clone';

const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create express app
const app = express();
const port = 3000;
const cors = require('cors');
const { receiveMessageOnPort } = require('worker_threads');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
const { json } = require('stream/consumers');
const { Console } = require('console');


app.use(cors());
app.use(express.json());

app.listen(5001, () => {
    console.log("Server is listening in on port 5001");
})

let pizza = {
    pizzaName: "",
    sauce: 'Red',
    drinkName: "",
    numToppings: 0,
    currToppings: 0,
    toppings: [],
    isCauly: "false",
    isCombo: "false",
    price: 0
}

var pizzaList = [];
var numDrinks = 0;

app.get('/currentToppings', function (req, res) {
    var allToppings = "";
    for (let i = 0; i < pizza.currToppings; i++) {
        allToppings += pizza.toppings[i];
        allToppings += ",";
    }
    res.json(allToppings);
});

app.get('/createPizza/:numToppings/:pizzaName', function (req, res) {
    newPizzaName = req.params.pizzaName;
    pizza.pizzaName = newPizzaName;
    pizza.numToppings = req.params.numToppings;
    if (pizza.price == 0) {
        if (pizza.numToppings == 0 || pizza.numToppings == 1) {
            pizza.price += 6.79;
        } else {
            pizza.price += 8.99;
        }
    }
    console.log(pizza.pizzaName);
    res.json(JSON.stringify(true));
});

app.get('/createSetPizza/:numToppings/:pizzaName', function (req, res) {
    console.log("CreatingPizza")
    newPizzaName = JSON.stringify(req.params.pizzaName);
    pizza.pizzaName = newPizzaName;
    pizza.numToppings = req.params.numToppings;
    pizza.price = 6.79;
    if (req.params.numToppings == "1") {
        pizza.toppings.push("Pepperoni");
    }
    console.log(pizza.toppings[0]);
    const pushPizza = structuredClone(pizza);
    pizzaList.push(pushPizza);
    refreshPizza();
    res.json(JSON.stringify(true));
});

app.get('/addTopping/:toppingName', function (req, res) {

    if (pizza.currToppings == pizza.numToppings) {
        console.log("false");
        res.json("false");
    } else if (pizza.numToppings == 1 && req.params.toppingName == 'Pepperoni') {
        pizza.toppings.push(req.params.toppingName);
        pizza.currToppings++;
        pizza.price = 6.79
        res.json("true");
    }
    else if (pizza.numToppings == 1) {
        if (req.params.toppingName.length == 0) {
            pizza.price = 6.79;
            res.json("true");
        }
        pizza.price = 7.79;
        pizza.toppings.push(req.params.toppingName);
        pizza.currToppings++;
        res.json("true");
    }
    else {
        pizza.toppings.push(req.params.toppingName);
        pizza.currToppings++;
        res.json("true");
    }
});

app.get('/removeLastTopping', function (req, res) {
    if (pizza.currToppings != 0) {
        pizza.currToppings--;
        pizza.toppings.pop();
        if (pizza.numToppings == 1 || pizza.numToppings == 0) {
            pizza.price = 6.79;
        }

    }
    res.json(JSON.stringify(true));
});

app.get('/addToOrder', function (req, res) {
    const pushPizza = structuredClone(pizza);
    if (pizza.pizzaName != "") {
        pizzaList.push(pushPizza);
        refreshPizza();
    }
    res.json(JSON.stringify(true));
});

app.get('/addSauce/:sauceName', function (req, res) {
    pizza.sauce = req.params.sauceName;
    console.log(pizza.sauce);
    res.json(JSON.stringify(true));
});

app.get('/crustType/:crustToggle', function (req, res) {
    pizza.isCauly = req.params.crustToggle;
    res.json(JSON.stringify(true));
});

app.get('/comboMeal/:thisCombo', function (req, res) {
    pizza.isCombo = req.params.thisCombo;
    res.json("true");
});

app.get("/soloDrink", function (req, res) {
    numDrinks++;
    res.json("true");
});

app.get('/calculatePrice', function (req, res) {
    var price = 0;
    for (let i = 0; i < pizzaList.length; i++) {
        var currentPizza = pizzaList[i];
        if (currentPizza.numToppings == -1) {
            price += 2.45;
        }
        else if (currentPizza.numToppings == 0 || (currentPizza.numToppings == 1 && currentPizza.toppings[0] == 'Pepperoni')
            || (currentPizza.numToppings == 1 && currentPizza.toppings.length == 0)
            || (currentPizza.numToppings == 1 && currentPizza.toppings.length == 0)) {
            if (currentPizza.isCombo == "true" == "true") {
                price += 7.99;
            }
            else {
                price += 6.79;
            }
        }
        else if (currentPizza.numToppings == 1) {
            if (currentPizza.isCombo == "true") {
                price += 10.24;
            }
            else {
                price += 7.79;
            }
        }
        else {
            if (currentPizza.isCombo == "true") {
                price += 11.44;
            }
            else {
                price += 8.99;
            }
        }
        if (currentPizza.isCauly == "true") {
            price += 2.99;
        }
    }
    price += (numDrinks * 2.45);
    price = price.toFixed(2);
    res.json(price);
});

app.get('/cancelOrder', function (req, res) {
    refreshPizza();
    pizzaList = [];
    numDrinks = 0;
    res.json(true);
});
app.get('/clearSelection', function (req, res) {
    pizzaList.pop();
    res.json(true);
});

app.get('/deletePizza', function (req, res) {
    pizza.pizzaName = "";
    pizza.sauce = 'Red';
    pizza.drinkName = "";
    pizza.numToppings = 0;
    pizza.currToppings = 0;
    pizza.toppings = [];
    pizza.isCauly = false;
    pizza.isCombo = false;
    pizza.price = 0;
});

function refreshPizza() {
    pizza.pizzaName = "";
    pizza.sauce = 'Red';
    pizza.drinkName = "";
    pizza.numToppings = 0;
    pizza.currToppings = 0;
    pizza.toppings = [];
    pizza.isCauly = false;
    pizza.isCombo = false;
    pizza.price = 0;
}

app.get('/checkoutScreen', function (req, res) {
    var completeOrder = "";
    completeOrder += "Order Info: ";
    for (let i = 0; i < pizzaList.length; i++) {
        tempPizza = pizzaList[i]
        completeOrder += "~Pizza Type: " + tempPizza.pizzaName;
        let price = tempPizza.price
        if (tempPizza.isCombo == "true") {
            completeOrder += "~With added fountain drink"
            if (tempPizza.numToppings == 1 && tempPizza.toppings[0] == "Pepperoni" || tempPizza.numToppings == 1 && tempPizza.toppings.length == 0) {
                price += 1.20
            }
            else {
                price += 2.45
            }
        }
        for (let j = -1; j < tempPizza.toppings.length; j++) {
            if (j == -1) {
                completeOrder = completeOrder + "~Sauce: " + tempPizza.sauce + "~Cheese: House Blend "
                if (tempPizza.isCauly == "true") {
                    completeOrder += "~Crust: Cauliflower ";
                }
                else {
                    completeOrder += "~Crust: Standard Dough ";
                }
                completeOrder += "~Toppings: "
            } else {
                completeOrder += tempPizza.toppings[j];
            }
            completeOrder += " ";
        }


        if (tempPizza.isCauly == "true") {
            price += 2.99;
        }

        completeOrder += ("~Price: $");
        price = price.toFixed(2);
        completeOrder += price;

    }

    if (numDrinks > 0) {
        completeOrder += "~" + numDrinks + " Added Fountain Drinks: "
        let price = (numDrinks * 2.45);
        price = price.toFixed(2);
        completeOrder += String(price) + " total";
    }
    //MIGHT have to stringify this
    res.json(completeOrder)
});

app.get('/currentPizza', function (req, res) {
    let thisPizza = 'Pizza Info: ';
    makePizza = pizza;
    thisPizza += makePizza.pizzaName;
    thisPizza += " ";
    thisPizza = thisPizza + " Sauce: " + makePizza.sauce + " ";
    if (makePizza.isCauly == "true") {
        thisPizza += "Crust: Cauliflower ";
    }
    else {
        thisPizza += "Crust: Standard Dough ";
    }
    thisPizza += "Toppings: House Blend Cheese, "
    for (let i = 0; i < makePizza.currToppings; i++) {
        thisPizza = thisPizza + makePizza.toppings[i] + " ";
    }
    thisPizza += " | "
    var price = makePizza.price;
    if (makePizza.isCauly == "true") {
        price += 2.99;
    }
    if (makePizza.isCombo == "true") {
        thisPizza += " With Added Fountain Drink. | "
        if (makePizza.numToppings == 0 || (makePizza.numToppings == 1 && makePizza.toppings[0] == "Pepperoni") ||
            (makePizza.toppings.length == 0 && makePizza.numToppings == 1)) {
            price += 1.20;
        }
        else {
            price += 2.45;
        }
    }

    thisPizza += ("Price: $");
    price = price.toFixed(2);
    thisPizza += price;
    res.json(thisPizza);
});

//Make the pool for later use
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

app.put("/checkoutServ", async (req, res) => {

    var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'House_Blend\'');
    if (pizza.isCauly) {
        serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Cauliflour\'')
    }
    else {
        serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Dough\'')
    }
    // console.log(req.body.numToppings);
    for (let i = 0; i < pizzaList.length; i++) {
        var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'' + pizzaList[i].sauce + '\'');
        for (let j = 0; j < pizzaList[i].toppings.length; j++) {
            serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'' + pizzaList[i].toppings[j] + '\'');
        }
    }
    res.json(serverReply.rows);
})

app.get("/seasonalMenu", async (req, res) => {
    var seasonalReply = await pool.query('SELECT name FROM INVENTORY WHERE id > 48');
    return res.json(seasonalReply.rows);
})

//exit gracefully
process.on('SIGINT', function () {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

module.exports = {};