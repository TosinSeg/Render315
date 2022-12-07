import React, { useEffect } from "react";
import Base from "../PizzaToppings/Pizza.png";
import Top1 from "../PizzaToppings/bacon.png";
import Top2 from "../PizzaToppings/Banana_Peppers.png";
import Top3 from "../PizzaToppings/Black_Forest_Ham.png";
import Top4 from "../PizzaToppings/Black_Olives.png";
import Top5 from "../PizzaToppings/brocolli.png";
import Top6 from "../PizzaToppings/Caramelized_Onion.png";
import Top7 from "../PizzaToppings/Cherry_Tomato.png";
import Top8 from "../PizzaToppings/garlic.png";
import Top9 from "../PizzaToppings/Green_Peppers.png";
import Top10 from "../PizzaToppings/Italian_Sausage.png";
import Top11 from "../PizzaToppings/jalapenos.png";
import Top12 from "../PizzaToppings/Kalmata_Olives.png";
import Top13 from "../PizzaToppings/Meatball.png";
import Top14 from "../PizzaToppings/mushrooms.png";
import Top15 from "../PizzaToppings/Pepperoni.png";
import Top16 from "../PizzaToppings/Red_Onions.png";
import Top17 from "../PizzaToppings/Red_Potatoes.png";
import Top18 from "../PizzaToppings/Red_Peppers.png";
import Top19 from "../PizzaToppings/salami.png";
import Top20 from "../PizzaToppings/Smoked_Chicken.png";
import Top21 from "../PizzaToppings/spinach.png";
import "../components/pizzabuilder.css"


function Pizzabuilder() {
    function Settransparency() {
        // document.getElementById("Top1").style.opacity = "0";
        // document.getElementById("Top2").style.opacity = "0";
        // document.getElementById("Top3").style.opacity = "0";
        // document.getElementById("Top4").style.opacity = "0";
        // document.getElementById("Top5").style.opacity = "0";
        // document.getElementById("Top6").style.opacity = "0";
        // document.getElementById("Top7").style.opacity = "0";
        // document.getElementById("Top8").style.opacity = "0";
        // document.getElementById("Top9").style.opacity = "0";
        // document.getElementById("Top10").style.opacity = "0";
        // document.getElementById("Top11").style.opacity = "0";
        // document.getElementById("Top12").style.opacity = "0";
        // document.getElementById("Top13").style.opacity = "0";
        // document.getElementById("Top14").style.opacity = "0";
        // document.getElementById("Top15").style.opacity = "0";
        // document.getElementById("Top16").style.opacity = "0";
        // document.getElementById("Top17").style.opacity = "0";
        // document.getElementById("Top18").style.opacity = "0";
        // document.getElementById("Top19").style.opacity = "0";
        // document.getElementById("Top20").style.opacity = "0";
        // document.getElementById("Top21").style.opacity = "0";
    }
    const Showtoppings = async () => {
        let order = await fetch("http://localhost:5001/currentToppings").then((response) => response.text());
        order = order.replace(/\"/g, "");
        let orderarry = order.split(",");
        orderarry = orderarry.slice(0, -1);
        for (let i = 0; i < orderarry.length; i++) {
            if (orderarry[i] === "Bacon") {
                document.getElementById("Top1").style.opacity = "1";
            } else if (orderarry[i] === "Banana Peppers") {
                document.getElementById("Top2").style.opacity = "1";
            } else if (orderarry[i] === "Ham") {
                document.getElementById("Top3").style.opacity = "1";
            } else if (orderarry[i] === "Sausage") {
                document.getElementById("Top10").style.opacity = "1";
            } else if (orderarry[i] === "Meatballs") {
                document.getElementById("Top13").style.opacity = "1";
            } else if (orderarry[i] === "Salami") {
                document.getElementById("Top19").style.opacity = "1";
            } else if (orderarry[i] === "Chicken") {
                document.getElementById("Top20").style.opacity = "1";
            } else if (orderarry[i] === "Green Peppers") {
                document.getElementById("Top9").style.opacity = "1";
            } else if (orderarry[i] === "Red Peppers") {
                document.getElementById("Top18").style.opacity = "1";
            } else if (orderarry[i] === "Black Olives") {
                document.getElementById("Top4").style.opacity = "1";
            } else if (orderarry[i] === "Kalmata Olives") {
                document.getElementById("Top12").style.opacity = "1";
            } else if (orderarry[i] === "Cherry Tomatoes") {
                document.getElementById("Top7").style.opacity = "1";
            } else if (orderarry[i] === "Red Onions") {
                document.getElementById("Top16").style.opacity = "1";
            } else if (orderarry[i] === "Spinach") {
                document.getElementById("Top21").style.opacity = "1";
            } else if (orderarry[i] === "Brocolli") {
                document.getElementById("Top5").style.opacity = "1";
            } else if (orderarry[i] === "Caramelized Onions") {
                document.getElementById("Top6").style.opacity = "1";
            } else if (orderarry[i] === "Garlic") {
                document.getElementById("Top8").style.opacity = "1";
            } else if (orderarry[i] === "Mushrooms") {
                document.getElementById("Top14").style.opacity = "1";
            } else if (orderarry[i] === "Red Potatoes") {
                document.getElementById("Top17").style.opacity = "1";
            } else if (orderarry[i] === "Jalapenos") {
                document.getElementById("Top11").style.opacity = "1";
            } else if (orderarry[i] === "Pepperoni") {
                document.getElementById("Top15").style.opacity = "1";
            }
        }
    }
    useEffect(() => {
        Settransparency();
        Showtoppings();
    }, [])
    return (
        <>
            <div className="toggle-wrapper">
                <img alt="topping" className="base" src={Base} />
                <img alt="topping" id="Top1" className="top1" src={Top1} />
                <img alt="topping" id="Top2" className="top2" src={Top2} />
                <img alt="topping" id="Top3" className="top3" src={Top3} />
                <img alt="topping" id="Top4" className="top4" src={Top4} />
                <img alt="topping" id="Top5" className="top5" src={Top5} />
                <img alt="topping" id="Top6" className="top6" src={Top6} />
                <img alt="topping" id="Top7" className="top7" src={Top7} />
                <img alt="topping" id="Top8" className="top8" src={Top8} />
                <img alt="topping" id="Top9" className="top9" src={Top9} />
                <img alt="topping" id="Top10" className="top10" src={Top10} />
                <img alt="topping" id="Top11" className="top11" src={Top11} />
                <img alt="topping" id="Top12" className="top12" src={Top12} />
                <img alt="topping" id="Top13" className="top13" src={Top13} />
                <img alt="topping" id="Top14" className="top14" src={Top14} />
                <img alt="topping" id="Top15" className="top15" src={Top15} />
                <img alt="topping" id="Top16" className="top16" src={Top16} />
                <img alt="topping" id="Top17" className="top17" src={Top17} />
                <img alt="topping" id="Top18" className="top18" src={Top18} />
                <img alt="topping" id="Top19" className="top19" src={Top19} />
                <img alt="topping" id="Top20" className="top20" src={Top20} />
                <img alt="topping" id="Top21" className="top21" src={Top21} />
            </div>
        </>
    );
}

export default Pizzabuilder;