import React, { useEffect, Fragment, useState } from "react";
import MapsAPI from "./directions.js";

function LocationGuide() {
    let component = <MapsAPI />
    return (<Fragment>
        <h1 className="mapTitle">Here's our nearest Location: </h1>
        <div className="mapdisplay">{component}</div>
        <a href="/pizzatype">
            <button className="backButton" >Back to Home Screen</button>
        </a>
    </Fragment>);
}

export default LocationGuide;