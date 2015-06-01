var awRegex = {}

// worldname is a required value.  It can be letters, numbers, or special characters. It must have at least two characters.
awRegex.worldname = '\\S{2,}'

// ns position is a required value.  It must be a nonegative integer or decimal, ending with 'n/N' or 's/S'.
awRegex.nsposition = '\\d{0,}[\\.]?\\d{0,}?(?:n|s)'

// ew position is a required value.  It must be a nonegative integer or decimal, ending with 'e/E' or 'w/W'.
awRegex.ewposition = '\\d{0,}[\\.]?\\d{0,}?(?:e|w)'

// Altitude is an optional value. It must be an integer or a float, ending with 'a'.  It must be preceded by a whitespace value.
awRegex.altitude = function(whitespaceChar) {
	return '(?:' + whitespaceChar + '?-?\\d{0,}[\\,\\.]?\\d{1,}?[a])?'
};
// Direction is an optional value. It must be a nonnegative integer. It must be preceded by a whitespace value.
awRegex.direction = function(whitespaceChar) {
	return '(?:' + whitespaceChar + '?\\d{0,})?'
};

// The minimal regex to find a valid AW coordinate string.
awRegex.coordinatesSyntax = function(whitespaceChar) {
	return awRegex.worldname + 
		   whitespaceChar +
		   awRegex.nsposition +
		   whitespaceChar +
		   awRegex.ewposition +
		   awRegex.altitude(whitespaceChar) +
		   awRegex.direction(whitespaceChar);
}						  
									  
module.exports = awRegex;