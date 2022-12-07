import React from "react";
import Checkout from "./pages/checkout.js";
import Drizzle from "./pages/drizzle.js";
import Meats from "./pages/meats.js";
import Pizzatype from "./pages/pizzatype.js";
import PizzatypeCancel from "./pages/pizzatypeCanceled";
import Pizzatypediff from "./pages/pizzatypediff";
import Sauce from "./pages/sauce.js";
import Seasonal from "./pages/seasonal.js";
import ToppingOne from "./pages/topping-one.js";
import Topping from "./pages/topping.js";
import ToppingMulti from "./pages/topping-multi.js";
import Veggies from "./pages/veggies.js";
import LocationGuide from "./pages/locationguide"
//import "./components/customer.css";

function App() {

  let component
  switch (window.location.pathname) {
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
    default:
      component = <Pizzatype />
      break

  }

  return (
    <React.Fragment>
      {component}
    </React.Fragment>

  );
}
export default App;
