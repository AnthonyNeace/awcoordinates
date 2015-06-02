// awLocation - builder for a normalized location object

var awLocation = {};

var buildDescription = function(location, str) {
    if(str !== 'undefined')
    {    
        location.description = str;
    }
}

var buildWorldName = function(location, str) {
    if(str !== 'undefined')
    {    
        location.worldname = str;
    }
}

var buildZPosition = function(location, str) {
    if(str !== 'undefined')
    {    
        if(str.slice(-1) === "n" || str.slice(-1) === "N")
        {
            location.stringParts.nsposition = str;
            location.sdkParts.z = str.slice(0,-1) * 100;
        }
        
        if(str.slice(-1) === "s" || str.slice(-1) === "S")
        {
            location.stringParts.nsposition = str;
            location.sdkParts.z = str.slice(0,-1) * -100;
        }    
    }
}

var buildXPosition = function(location, str) {
    if(str !== 'undefined')
    {    
        if(str.slice(-1) === "w" || str.slice(-1) === "W")
        {
            location.stringParts.ewposition = str;
            location.sdkParts.x = str.slice(0,-1) * 100;
        }
        
        if(str.slice(-1) === "e" || str.slice(-1) === "E")
        {
            location.stringParts.ewposition = str;
            location.sdkParts.x = str.slice(0,-1) * -100;
        }    
    }
}

var buildYPosition = function(location, str) {
    if(typeof(str) !== 'undefined')
    {
        if(str.slice(-1) === "a" || str.slice(-1) === "A")
        {
            location.stringParts.altitude = str;
            location.sdkParts.y = str.slice(0,-1) * 100;
        }
        else
        {
            location.stringParts.altitude = '0a';
            location.sdkParts.y = 0;    
        
            buildDirection(location, str);
        }
    }
    else
    {
        location.stringParts.altitude = '0a';
        location.sdkParts.y = 0;    
    }    
}

/* From http://wiki.activeworlds.com/index.php?title=AW_AVATAR_YAW
This is the value set for AW_MY_YAW when the user called aw_state_change. It is given in units of one tenth of a degree and should not be assumed to be in the range of 0 to 3599.
- For positive values of yaw modulo 3600: A yaw of 0 is facing directly north, 900 is facing west, 1800 is facing south, and 2700 is facing east.
- For negative values of yaw modulo 3600: A yaw of 0 is facing directly north, -2700 is facing west, -1800 is facing south, and -900 is facing east. 
TODO: support decimal places in plaintext coordinate.  This conversion appears to exist to support the tenth decimal place.
*/
var buildDirection = function(location, str) {
    if(typeof(str) !== 'undefined')
    {
        location.stringParts.direction = str;
        location.sdkParts.yaw = str * 10;
    }
    else
    {
        location.stringParts.direction = '0';
        location.sdkParts.yaw = 0;    
    }
}

awLocation.buildAwLocation = function(coordinateParts) {
    var location = {};
    location.stringParts = {};
    location.sdkParts = {};
    
    buildDescription(location, coordinateParts[0]);
    buildWorldName(location, coordinateParts[1]);
    buildZPosition(location, coordinateParts[2]);
    buildXPosition(location, coordinateParts[3]);
    buildYPosition(location, coordinateParts[4]);
    buildDirection(location, coordinateParts[5]);
    
    return location;
}

module.exports = awLocation;