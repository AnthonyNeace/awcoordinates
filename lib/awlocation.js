// awLocation - builder for a normalized location object

var awLocation = {};

var buildDescription = function(location, str) {
    if(str !== 'undefined') {    
        location.description = str;
    }
};

var buildWorldName = function(location, str) {
    if(str !== 'undefined') {    
        location.worldname = str;
    }
};

var buildZPosition = function(location, str) {
    if(str !== 'undefined') {    
        switch (str.slice(-1).toLowerCase()) {
            case "n":
                location.stringParts.nsposition = str;
                location.sdkParts.z = str.slice(0,-1) * 100;
                break;
            case "s":
                location.stringParts.nsposition = str;
                location.sdkParts.z = str.slice(0,-1) * -100;
                break;    
        }
    }
};

var buildXPosition = function(location, str) {
    if(str !== 'undefined') {    
        switch (str.slice(-1).toLowerCase()) {
            case "w":
                location.stringParts.ewposition = str;
                location.sdkParts.x = str.slice(0,-1) * 100;
                break;
            case "e":
                location.stringParts.ewposition = str;
                location.sdkParts.x = str.slice(0,-1) * -100;
                break;    
        }
    }        
};

var buildYPosition = function(location, str) {
    if(typeof(str) !== 'undefined') {
        if(str.slice(-1).toLowerCase() === "a") {
            location.stringParts.altitude = str;
            location.sdkParts.y = str.slice(0,-1) * 100;
        }
        else {
            location.stringParts.altitude = '0a';
            location.sdkParts.y = 0;    
        
            buildYaw(location, str);
        }
    }
    else {
        location.stringParts.altitude = '0a';
        location.sdkParts.y = 0;    
    }    
};

var buildYaw = function(location, str) {
    if(typeof(str) !== 'undefined') {
        location.stringParts.direction = str;
        location.sdkParts.yaw = str * 10;
    }
    else {
        location.stringParts.direction = '0';
        location.sdkParts.yaw = 0;    
    }
};

var buildPitch = function(location) {
    location.sdkParts.pitch = 0; 
};

var buildRoll = function(location) {
    location.sdkParts.roll = 0; 
};

var buildAwLocation = function(worldname, nsPosition, ewPosition, altitude, direction, whitespaceChar)
{
    var location = {};
    location.stringParts = {};
    location.sdkParts = {};
    
    buildDescription(buildCoordinatesString(worldname, nsPosition, ewPosition, altitude, direction, whitespaceChar));
    buildWorldName(location, worldname);
    buildZPosition(location, nsPosition);
    buildXPosition(location, ewPosition);
    buildYPosition(location, altitude);
    buildYaw(location, direction);
    buildPitch(location);
    buildRoll(location);
    
    return location;
};

var buildCoordinatesString = function(worldname, nsPosition, ewPosition, altitude, direction, whitespaceChar) {
    return worldname + whitespaceChar + 
        nsPosition + whitespaceChar +
        ewPosition + whitespaceChar + 
        altitude + whitespaceChar +
        direction;
};

var toAwLocation = function(coordinateParts) {
    var location = buildAwLocation(coordinateParts[1], coordinateParts[2], coordinateParts[3], coordinateParts[4], coordinateParts[5], ' ');
    
    buildDescription(location, coordinateParts[0]);
    
    return location;
}; 

var toCoordinateString = function(location, whitespaceChar) {
    return buildCoordinatesString(location.worldname, 
        location.stringParts.nsposition,
        location.stringParts.ewposition,
        location.stringParts.altitude,
        location.stringParts.direction,
        whitespaceChar);
};

module.exports = {
    toAwLocation: toAwLocation,
    toCoordinatesString: toCoordinateString,
    buildAwLocation: buildAwLocation,
    buildCoordinatesString: buildCoordinatesString
};