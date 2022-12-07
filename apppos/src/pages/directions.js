import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const google = window.google;

const containerStyle = {
    width: '80%',
    height: '80vh'
};

const center = {
    lat: 30.61234195012257,
    lng: -96.34153287461642
};
function MapsAPI() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAh_4bM5xonPGKrJ49pgcRlmyrY8AR7H68"
    });
    const [map, setMap] = React.useState(null)

    const directionsToPizza = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);

    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            directionsToPizza={directionsToPizza}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */
                <Marker position={center} />
            }
            <></>
        </GoogleMap>

    ) : <></>
}

export default React.memo(MapsAPI)