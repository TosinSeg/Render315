const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
// Create express app
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("server has started on port: " + PORT);
})

// Create pool
/** Const to creat our pool for communicating with the database */
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});
const menuCols = ["ID", "Name", "Price"]
const inventoryCols = ["ID", "Name", "Item Type", "Count", "Cost", "Total Sales"]
const inventory = []
const menu = []
const transactionHistory = []
const salesTogether1 = []
const drinks = []
/** The get inventory function will get the inventory from the SQL database */
app.get("/inventory", async (req, res) => {
    let inv = await pool.query('SELECT * FROM inventory');
    //inventory = inv.rows;
    res.json(inv.rows);
});

/** The get employee report function will get the table of employees from the SQL database and sort them by total sales.*/
app.get("/employeeReport", async (req, res) => {
    let inv = await pool.query('SELECT * FROM employee ORDER BY totalsales DESC');
    //inventory = inv.rows;
    res.json(inv.rows);
});

/** This function will select any item from the ivnentory that matches the passed in id 
 * @param {string} x - Passed in ID.
*/

app.get("/id/:x", async (req, res) => {
    let inv = await pool.query('SELECT * FROM inventory WHERE id = ' + req.params.x);
    //inventory = inv.rows;
    res.json(inv.rows);
});

/** This function will select all drinks that match the given drink name. 
 * @param {string} itemName - Passed in drink name.
*/
app.get("/drinks/:itemName", async (req, res) => {
    let inv = await pool.query("SELECT id FROM drinks WHERE drinkname = '" + req.params.itemName + "'");
    //inventory = inv.rows;
    res.json(inv.rows);
});

/** This function will return the id of the pizza you input
 * @param {string} itemName - Passed in Pizza Name.
*/
app.get("/pizza/:itemName", async (req, res) => {

    let inv = await pool.query("SELECT id FROM pizza WHERE pizzaname = '" + req.params.itemName.replace("_", " ") + "'");
    //inventory = inv.rows;
    res.json(inv.rows);
});

/** This function will return the entire menu. */
app.get("/menu", async (req, res) => {
    let inv = await pool.query('SELECT * FROM menu');
    res.json(inv.rows);

});
/** This function will return a list of all the items that need restocking */
app.get("/restockReport", async (req, res) => {
    let inv = await pool.query('SELECT * FROM inventory WHERE count < 100');
    res.json(inv.rows);

});

/** This function will generate the excess report between two given dates 
 * @param {date} beginDate - Passed in first day.
 * @param {date} endDate - Passed in final day
*/
app.get("/excessReport/:beginDate/:endDate", async (req, res) => {
    //console.log(req.params);
    let inv = await pool.query("SELECT id FROM customerinfo WHERE orderdate BETWEEN '" + req.params.beginDate + "' and '" + req.params.endDate + "'");
    res.json(inv.rows);

});

/** This function will add a new ingredient to our inventory database.*/
app.post("/addIngredient", async (req, res) => {
    console.log(inventory.length);
    let inv = await pool.query("INSERT INTO inventory VALUES (" + req.body.num + ", '" + req.body.name + "', " + "'Seasonal', " + req.body.count + ", " + req.body.cost + ", 0)");
    res.json(inv.rows[0]);

});
//TODO: GATHER TEXT INPUTS FOR ADDING MENU ITEMS TO THE MENU, ITEMS TO INVENTORY, AND SEASONAL ITEMS, AND TO CHANGE PRICE

/** This function will add a new item to our menu*/
app.post("/addItem", async (req, res) => {
    let inv = await pool.query("INSERT INTO menu VALUES(" + req.body.id + ",'" + req.body.name + "'," + req.body.price + ")");
    res.json(inv.rows[0]);

});

app.post("/addEmployee", async (req, res) => {
    let inv = await pool.query("INSERT INTO employee VALUES(" + req.body.id + ", '" + req.body.employeename + "', " + "0, " + "0)");
    res.json(inv.rows[0]);

});

/** This function will update the price of a specific item */
app.put("/updatePrice", async (req, res) => {
    let inv = await pool.query("UPDATE menu SET price = " + req.body.newPrice + " WHERE id =" + req.body.id);
    res.json(inv.rows[0]);

});

/** This function will update the inventory of a specific item */
app.put("/updateAmount", async (req, res) => {
    var id1 = req.body.id;
    var newAmount = req.body.newAmount;
    let inv = await pool.query("UPDATE inventory SET count = count+" + newAmount + " WHERE id ="
        + id1 + "RETURNING *");
    res.json(inv.rows[0]);

});

/** This function will generate the the best combination sales report between two given dates 
 * @param {date} beginDate - Passed in first day.
 * @param {date} endDate - Passed in final day.
*/
app.get("/salesTogether/:beginDate/:endDate", async (req, res) => {
    let inv = await pool.query("SELECT customerinfo.id,customerinfo.orderdate,pizza.pizzaname,drinks.drinkname FROM customerinfo INNER JOIN drinks ON customerinfo.id=drinks.id INNER JOIN pizza ON customerinfo.id=pizza.id WHERE orderdate BETWEEN '" + req.params.beginDate + "' and '" + req.params.endDate + "'");
    res.json(inv.rows);

});

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

/** This function will return the toppings on your pizza */
app.get('/currentToppings', function (req, res) {
    var allToppings = "";
    for (let i = 0; i < pizza.currToppings; i++) {
        allToppings += pizza.toppings[i];
        allToppings += ",";
    }
    res.json(allToppings);
});

/** This function will create a pizza based on the passed in parameter, 
 * @param {string} numToppings - The number of toppings based on pizza type
 * @param {string} pizzaName - Passed in pizza type
*/
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

/** This function will create one of the two set pizzas (pepperoni or cheese) quickly
 * @param {string} numToppings - The number of toppings based on pizza type
 * @param {string} pizzaName - Passed in pizza type
*/
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
    const pushPizza = JSON.parse(JSON.stringify(pizza));
    pizzaList.push(pushPizza);
    refreshPizza();
    res.json(JSON.stringify(true));
});

/** This function will add a specific topping on your pizza 
 * @param {string} toppingName - the passed in topping
*/
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

/** This function will remove whatever the last topping added to your pizza was*/
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

/** This function will add the pizza to your order, essentially adding an item to your cart */
app.get('/addToOrder', function (req, res) {
    const pushPizza = JSON.parse(JSON.stringify(pizza));
    if (pizza.pizzaName != "") {
        pizzaList.push(pushPizza);
        refreshPizza();
    }
    res.json(JSON.stringify(true));
});

/** This function will change the sauce on your pizza if you wish to do so
 * @param {string} sauceName - Passed in desired sauce
*/
app.get('/addSauce/:sauceName', function (req, res) {
    pizza.sauce = req.params.sauceName;
    console.log(pizza.sauce);
    res.json(JSON.stringify(true));
});

/** This function will change the pizza crust from standard dough to cauliflower (or back)*/
app.get('/crustType/:crustToggle', function (req, res) {
    pizza.isCauly = req.params.crustToggle;
    res.json(JSON.stringify(true));
});

/** This function will set your meal to a combo (includes drink)*/
app.get('/comboMeal/:thisCombo', function (req, res) {
    pizza.isCombo = req.params.thisCombo;
    res.json("true");
});

/** This function will allow you to add a drink seperately from a pizza (extra drink, drink but no pizza)*/
app.get("/soloDrink", function (req, res) {
    numDrinks++;
    res.json("true");
});

/** This function will calculate the price of the entire order*/
app.get('/calculatePrice', function (req, res) {
    var price = 0;
    for (let i = 0; i < pizzaList.length; i++) {
        var currentPizza = pizzaList[i];
        if (currentPizza.numToppings == -1) {
            price += 2.45;
        }
        else if (currentPizza.numToppings == 0 || (currentPizza.numToppings == 1 && currentPizza.toppings[0] == 'Pepperoni')
            || (currentPizza.numToppings == 1 && currentPizza.toppings.length == 0)) {
            if (currentPizza.isCombo == "true") {
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

/** This function will cancel your order*/
app.get('/cancelOrder', function (req, res) {
    refreshPizza();
    pizzaList = [];
    numDrinks = 0;
    res.json(true);
});

/** This function will remove the last added pizza*/
app.get('/clearSelection', function (req, res) {
    pizzaList.pop();
    res.json(true);
});

/** This function will delete all saved variables for the current pizza (used for frontend)*/
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

/** This function will delete all saved variables for the current pizza (used for backend) */
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

/** This function will generate all your order details in the checkout screen.*/
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

/** This function return the current pizza info*/
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

/** This function will communicate and update inventory on the database*/
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

app.post("/serverCheckout", async (req, res) => {
    var orders = req.body.order.split("|");
    for (let i = 0; i < orders.length; i++) {
        orders[i] = orders[i].split("*");
    }
    for (let i = 0; i < orders.length; i++) {
        let s = orders[i]
        console.log(i)
        let type = s[0];
        serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'House_Blend\'');
        if (type === "Cheese" || type === "Pepperoni") {
            if (s[1] == "Red Sauce")
                var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Red\'');
            else if (s[1] == "White Sauce")
                var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'White\'');
            else if (s[1] == "Zesty Red Sauce")
                var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Zesty_Red\'');
            if (s[3] === "no_drink") {
                s.pop();
            } else {
                var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'' + s[3] + '_Cups\'');
            }
            if (s[2] === "Regular Crust") {
                serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Dough\'')
            } else {
                serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Cauliflour\'')
            }
            if (type === "Cheese") {
            } else {
                serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Pepperoni\'')
            }
        } else if (type === "Drink") {
            var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'' + s[3] + '_Cups\'');
        } else if (type !== "") {
            if (s[1] == "Red Sauce")
                var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Red\'');
            else if (s[1] == "White Sauce")
                var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'White\'');
            else if (s[1] == "Zesty Red Sauce")
                var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Zesty_Red\'');
            if (s[3] !== "undefined") {
                s[3] = s[3].split(",");
                // s[3].splice(0,0,<p>&emsp;&emsp;Toppings:</p>);
                for (let j = 1; j < s[3].length; j++) {
                    // s[3][j] = <p>&emsp;&emsp;&emsp; {s[3][j]}</p>;
                    s[3] = s[3][j].replace(" ", "_")
                    var serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'' + s[3][j] + '\'');
                }
            } else {
                delete s[3];
            }
            if (s[2] === "Regular Crust") {
                serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Dough\'')
            } else {
                serverReply = await pool.query('UPDATE inventory SET count = count-1 WHERE name = \'Cauliflour\'')
            }
        }

    }
    console.log("here")
    res.json(serverReply.rows);
})


/** This function will Display the seasonal menu */
app.get("/seasonalMenu", async (req, res) => {
    var seasonalReply = await pool.query('SELECT name FROM INVENTORY WHERE id > 48');
    return res.json(seasonalReply.rows);
})

/** Exit gracefully */
//exit gracefully
process.on('SIGINT', function () {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

module.exports = {};