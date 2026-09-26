var map = L.map('map').setView([37.2712248,-76.7161386], 14.5);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

var marker;

function onMapClick(e){
    console.log("click");
        if (typeof marker == 'undefined'){
            marker = L.marker();
            marker.addTo(map);
        }
        marker
            .setLatLng(e.latlng);
    }

map.on('click', onMapClick);