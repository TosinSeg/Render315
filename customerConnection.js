const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})
app.listen(3001);

app.use(express.static('public'));

var pizza = {
    pizzaName: "",
    sauce: 'Red',
    drinkName: "",
    numToppings: 1,
    currToppings: 1,
    toppings: ['Pepperoni'],
    isCauly: false,
    isCombo: false
}
var pizzaList = []

var numDrinks = 0;

const createPizza = async () => {
    // pizza.pizzaName = name;
    // pizza.numToppings = pizzaType;
    // window.location.href = "cus-topping.html";
    const body = {
        "isCauly": true,
        "numToppings": []
    }
    const response = await fetch("http://localhost:5001/checkout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    alert("Database updated");
}

function drinkPizza(nameDrink) {
    if (nameDrink != "") {
        numDrinks++;
    }
    else {
        drinkList.push = nameDrink;
    }
    pizza.drinkName = nameDrink;
}
function addTopping(passedToping) {
    if (pizza.currToppings == pizza.numToppings) {
        return false;
    }
    else {
        pizza.currToppings++;
        pizza.toppings.push(passedTopping);
        return true;
    }
}
function addToOrder() {
    pizzaList.push(pizza);
    numPizzas++;
    refreshPizza();
}
function addSauce(sauce) {
    pizza.sauce = sauce;
}
function crustType(caulyCrust) {
    pizza.isCauly = caulyCrust;
}
function comboMeal(drinkCombo) {
    pizza.isCombo = drinkCombo;
}

function calculatePrice() {
    var price = 0;
    for (let i = 0; i < pizzaList.length(); i++) {
        var currentPizza = pizzaList[i];
        if (currentPizza.numToppings == -1) {
            price += 2.45;
        }
        else if (currentPizza.numToppings == 0 || (currentPizza.numToppings == 1 && currentPizza.toppings[0] == 'Pepperoni')) {
            if (currentPizza.isCombo) {
                price += 7.99;
            }
            else {
                price += 6.79;
            }
        }
        else if (currentPizza.numToppings == 1) {
            if (currentPizza.isCombo) {
                price += 10.24;
            }
            else {
                price += 7.79;
            }
        }
        else {
            if (currentPizza.isCombo) {
                price += 11.44;
            }
            else {
                price += 8.99;
            }
        }
        if (currentPizza.isCauly) {
            price += 2.99;
        }
    }
    return price;
}

function cancelOrder() {
    pizza.pizzaName = "";
    pizza.sauce = '';
    pizza.drinkName = "";
    pizza.numToppings = 0;
    pizza.currToppings = 0;
    pizza.toppings = [];
    pizza.isCauly = false;
    pizza.isCombo = false;
    pizzaList = [];
    numDrinks = 0;
    numPizzas = 0;
}
function clearSelection() {
    pizzaList.pop();
}

function refreshPizza() {
    pizza.pizzaName = "";
    pizza.sauce = 'Red';
    pizza.drinkName = "";
    pizza.numToppings = 0;
    pizza.currToppings = 0;
    pizza.toppings = [];
    pizza.isCauly = false;
    pizza.isCombo = false;
}

function checkoutScreen() {
    let completeOrder = 'Order Info: \n';
    for (let i = 0; i < pizzaList.length(); i++) {
        completeOrder += pizza.name;
        completeOrder += "- ";
        for (let j = 0; i < pizza.toppings.length(); j++) {
            completeOrder += pizza.toppings[j];
            completeOrder += " ";
        }
        completeOrder += ("\n");
    }
    return completeOrder;
}

function updateTable() {
    //Declare pool, dotenv
    const { Pool } = require('pg');
    const dotenv = require('dotenv').config();
    const port = 3000;
    // Create pool
    console.log(process.env.PSQL_USER);
    //using info from.env
    const pool = new Pool({
        user: process.env.PSQL_USER,
        host: process.env.PSQL_HOST,
        database: process.env.PSQL_DATABASE,
        password: process.env.PSQL_PASSWORD,
        port: process.env.PSQL_PORT,
        ssl: { rejectUnauthorized: false }
    });
    pool.connect()
        .then(client => {
            client.query('UPDATE inventory SET count = count-1 WHERE name = \'' + pizza.sauce + '\'', function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");

            })
            client.query('UPDATE inventory SET count = count-1 WHERE name = \'House_Blend\'', function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");

            })
            if (pizza.isCauly) {
                client.query('UPDATE inventory SET count = count-1 WHERE name = \'Cauliflour\'', function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");

                })
            }
            else {
                client.query('UPDATE inventory SET count = count-1 WHERE name = \'Dough\'', function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");

                })
            }
            for (let i = 0; i < pizza.numToppings; i++) {
                client.query('UPDATE inventory SET count = count-1 WHERE name = \'' + pizza.toppings[i] + '\'', function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");

                })
            }
            cancelOrder()
        })
    //exit gracefully
    process.on('SIGINT', function () {
        pool.end();
        console.log('Application successfully shutdown');
        process.exit(0);
    });

}



module.exports = { createPizza };
