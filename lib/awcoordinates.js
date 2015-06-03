// awcoordinates by Anthony Neace

var awRegex = require('./awregex');
var awLocation = require('./awlocation');

var find = function(str, whitespaceChar) {
  
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';
  
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax.
    var coordinateRegex = new RegExp('(' + awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + ')+', 'gi');
    
    var m = [];
    var output = [];  
  
    if(str !== null)
    {    
        while ((m = coordinateRegex.exec(str)) !== null) {
            
            if (m.index === coordinateRegex.lastIndex) {
                coordinateRegex.lastIndex++;
            }
            
            // Sanity check to make sure value isn't null. If not, push to output collection.
            if(m[0] !== null)
            {
                // Push to output, and cleanup some edge cases that the regex doesn't get.
                output.push(m[0].trim());
            }
        }       
    } 
  
    return output;
};

var validate = function(str, whitespaceChar) {
  
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';
  
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax. 
    var coordinateRegex = new RegExp('^(' + awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + ')+$', 'i');

    return coordinateRegex.test(str.trim());
};

var normalize = function(str, whitespaceChar) {

    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';

    if(validate(str, whitespaceChar) == false)
    {
        throw new Error("Invalid coordinates.");
    }
    
    var coordinateRegex = new RegExp(awRegex.buildAwCoordinatePartsMatchingRegex(whitespaceChar), 'i');
      
    var m;
     
    if ((m = coordinateRegex.exec(str)) !== null) {
        if (m.index === coordinateRegex.lastIndex) {
            coordinateRegex.lastIndex++;
        }
    }
    
    var coords = awLocation.buildAwLocation(m);
    
    return JSON.stringify(coords);
};

var teleport = function(str, whitespaceChar) {
 
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';
    
    // normalize and write output into awt
    validate(str, whitespaceChar);
    
    var coordinatesString = awLocation.buildCoordinatesString(JSON.parse(normalize(str, whitespaceChar)), ' ');    
    
    return 'teleport '+coordinatesString+'\r\n';
};

module.exports = {
  /**
   * Find aw coordinates in a given, arbitrary string.
   *
   * @param  {String} str - Arbitrary string content.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   
   * @return {String[]} Collection of identified aw coordinates.
   */
  find: find,
  /**
   * Validate a string exactly as aw coordinates. Trims whitespace before attempting validation.
   *
   * @param  {String} str - Input string intended for validation.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   
   * @return {bool} True/False depending on result.
   */
  validate: validate,
  /**
   * Return a normalized object.
   *
   * @param  {String} str - Input string intended for normalization.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   
   * @return {object} returns an object.
   */  
  normalize: normalize,
  /**
   * Return a teleport command string. The AW browser can read this command from a file (for example, a file downloaded from a URL) to teleport the user to the given location.
   *
   * @param  {String} str - Input string of the intended teleport destination.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   
   * @return {String} returns the teleport command.
   */    
  teleport: teleport
};