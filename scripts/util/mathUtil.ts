// Source - https://stackoverflow.com/a/365853
// Posted by cletus, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-26, License - CC BY-SA 4.0

function degreesToRadians(degrees : number) {
    return degrees * Math.PI / 180;
}

function distanceInMBetweenEarthCoordinates(lat1 : number, lon1 : number, lat2 : number, lon2 : number) {
    var earthRadiusM = 6371000;
    
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
    
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusM * c;
}