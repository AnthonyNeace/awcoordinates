var awRegex = {}

// worldname is a required value.  It can be letters, numbers, or special characters. 
// It must have at least two characters, and at most 16 characters. 
awRegex.worldname = '(?:\\b|[\\@\\!])\\S{2,16}'

// ns position is a required value.  It must be a nonegative integer or decimal, ending with 'n/N' or 's/S'.
awRegex.nsposition = '\\d{0,}[\\.]?\\d{0,}?(?:n|s)'

// ew position is a required value.  It must be a nonegative integer or decimal, ending with 'e/E' or 'w/W'.
awRegex.ewposition = '\\d{0,}[\\.]?\\d{0,}?(?:e|w)'

// Altitude is an optional value. It must be an integer or a float, ending with 'a'.
awRegex.altitude = '-?\\d{0,}[\\,\\.]?\\d{1,}?[a]'
// When grouped with the rest of the coordinate, it must be preceded by a whitespace.
awRegex.buildAltitudeNonCapturingGroup = function(whitespaceChar) {
    return '(?:' + whitespaceChar + '?' + awRegex.altitude + ')?';
};
// Direction is an optional value. It must be a nonnegative integer.
awRegex.direction = '\\d{0,}'
// When grouped with the rest of the coordinate, it must be preceded by a whitespace.
awRegex.buildDirectionNonCapturingGroup = function(whitespaceChar) {
    return '(?:' + whitespaceChar + '?' + awRegex.direction + ')?';
};

// Capturing Groups
awRegex.buildWorldNameCapturingGroup = function() {
    return '(' + awRegex.worldname + ')';
};

awRegex.buildNsPositionCapturingGroup = function() {
    return '(' + awRegex.nsposition + ')';
};

awRegex.buildEwPositionCapturingGroup = function() {
    return '(' + awRegex.ewposition + ')';
};

awRegex.buildAltitudeCapturingGroup = function() {
    return '(' + awRegex.altitude + ')?';
};

awRegex.buildDirectionCapturingGroup = function() {
    return '(' + awRegex.direction + ')?';
};

// The minimal regex to find a valid AW coordinate string.
awRegex.buildAwCoordinateMatchingRegex = function(whitespaceChar) {
    return awRegex.worldname + 
           whitespaceChar +
           awRegex.nsposition +
           whitespaceChar +
           awRegex.ewposition + 
           awRegex.buildAltitudeNonCapturingGroup(whitespaceChar) +
           awRegex.buildDirectionNonCapturingGroup(whitespaceChar);
}          

// The minimal regex to find a valid AW coordinate string.
awRegex.buildAwCoordinatePartsMatchingRegex = function(whitespaceChar) {
    return awRegex.buildWorldNameCapturingGroup() + 
           whitespaceChar +
           awRegex.buildNsPositionCapturingGroup() +
           whitespaceChar +
           awRegex.buildEwPositionCapturingGroup() + 
           '(?:' + whitespaceChar + '+)?' + 	   
           awRegex.buildAltitudeCapturingGroup() +
           '(?:' + whitespaceChar + '+)?' + 	   
           awRegex.buildDirectionCapturingGroup();
}                       
                                      
module.exports = awRegex;