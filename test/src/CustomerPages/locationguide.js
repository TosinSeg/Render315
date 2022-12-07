import React, { useEffect, Fragment, useState } from "react";
import MapsAPI from "./directions.js";
import LOGO from "../PizzaToppings/logo.png";
import translateText from "../translate";
function LocationGuide(props) {

    let component = <MapsAPI />
    const [test, setTest] = useState(["Here's our nearest Location: ", "Back to Home Screen"]);
    useEffect(() => {
        (async () => {
            console.log(props.lang);
            let temp = [];
            for (let i = 0; i < test.length; ++i) {
                await translateText(test[i], props.lang).then(res => temp.push(res));
            }
            setTest(temp);
        })();
    }, [props.lang])
    return (<Fragment>
        <img alt="Spin N Stone Logo" className="logo1" src={LOGO} />
        <h1 className="mapTitle">{test[0]}</h1>
        <div className="mapdisplay">{component}</div>
        <a href="/pizzatype">
            <button className="backButton" >{test[1]}</button>
        </a>
    </Fragment>);
}

export default LocationGuide;