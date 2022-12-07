// //Black magic API testing
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: { lat: 30.61234195012257, lng: -96.34153287461642 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
});
directionsRenderer.setMap(map);
var request = {
    origin: "125 Spence St, College Station, Texas",
    destination: { lat: 30.61234195012257, lng: -96.34153287461642 },
    travelMode: 'DRIVING'
};
directionsService.route(request, function (result, status) {
    if (status == 'OK') {
        directionsRenderer({
            suppressMarkers: true,
            directions: result,
            map: map,
        });

    }
});