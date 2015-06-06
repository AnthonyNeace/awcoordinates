// awcoordinates by Anthony Neace

var awRegex = require('./awregex');
var awLocation = require('./awlocation');

// If pSize is not specified, set '32750' -- the maximum pSize allowed by AW 
// software.
var setPSize = function(pSize) {
    return (typeof pSize) === 'number' 
        ? pSize 
        : 32750;
};

var setWhitespaceChar = function(whiteSpaceChar) {
    return (typeof whiteSpaceChar) !== 'undefined' 
        ? whiteSpaceChar 
        : ' ';
};

// If worldname is not specified, set 'aw' as the default.
var setWorldName = function(worldName) {
    return (typeof worldName) !== 'undefined' 
        ? worldName 
        : 'aw';
};

function randomFloat (low, high) {
    return (Math.random() * (high - low) + low).toFixed(1);
}

function chooseAxis(option1, option2) {
    return (Math.floor(Math.random() * 2) == 0) 
        ? option1 
        : option2;
}

var find = function(str, whitespaceChar) {
    whitespaceChar = setWhitespaceChar(whitespaceChar);
  
    // This regex captures a collection of all strings matching ActiveWorlds 
    // plaintext coordinate syntax.
    var coordinateRegex = new RegExp('(' + 
        awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + 
        ')+', 'gi');
    
    var m = [];
    var output = [];  
  
    if(str !== null)
    {    
        while ((m = coordinateRegex.exec(str)) !== null) {
            
            if (m.index === coordinateRegex.lastIndex) {
                coordinateRegex.lastIndex++;
            }
            
            // Sanity check to make sure value isn't null. If not, push to 
            // output collection.
            if(m[0] !== null)
            {
                // Push to output, and cleanup some edge cases that the 
                // regex doesn't get.
                output.push(m[0].trim());
            }
        }       
    } 
  
    return output;
};

var validate = function(str, whitespaceChar) {
    whitespaceChar = setWhitespaceChar(whitespaceChar);
  
    // This regex captures a collection of all strings matching ActiveWorlds 
    // plaintext coordinate syntax. 
    var regex = new RegExp('^(' + 
        awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + 
        ')+$', 'i');

    return regex.test(str.trim());
};

var normalize = function(str, whitespaceChar) {
    whitespaceChar = setWhitespaceChar(whitespaceChar);

    if(validate(str, whitespaceChar) == false)
    {
        throw new Error('Invalid coordinates.');
    }
    
    var coordinateRegex = new RegExp(
        awRegex.buildAwCoordinatePartsMatchingRegex(whitespaceChar), 'i');
      
    var m;
     
    if ((m = coordinateRegex.exec(str)) !== null) {
        if (m.index === coordinateRegex.lastIndex) {
            coordinateRegex.lastIndex++;
        }
    }
    
    var coords = awLocation.toAwLocation(m);
    
    return JSON.stringify(coords);
};

var teleport = function(str, whitespaceChar) {
    whitespaceChar = setWhitespaceChar(whitespaceChar);
    
    var coordinatesString = awLocation.toCoordinatesString(
        JSON.parse(normalize(str, whitespaceChar)), ' ');    
    
    return 'teleport '+coordinatesString+'\r\n';
};

var random = function(worldName, pSize, whitespaceChar) {
    worldName = setWorldName(worldName);
    whitespaceChar = setWhitespaceChar(whitespaceChar);   
    pSize = setPSize(pSize);
    return awLocation.buildCoordinatesString(worldName, 
        randomFloat(0, pSize)+chooseAxis('n','s'),
        randomFloat(0, pSize)+chooseAxis('e','w'),
        '0a',
        randomFloat(0,360),
        whitespaceChar);
};

module.exports = {
  /**
   * Find aw coordinates in a given, arbitrary string.
   *
   * @param  {String} str - Arbitrary string content.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will 
   *                                   be set to ' ' by default.   
   * @return {String[]} Collection of identified aw coordinates.
   */
  find: find,
  /**
   * Validate a string exactly as aw coordinates. Trims whitespace before 
   * attempting validation.
   *
   * @param  {String} str - Input string intended for validation.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will 
   *                                   be set to ' ' by default.   
   * @return {bool} True/False depending on result.
   */
  validate: validate,
  /**
   * Return a normalized object.
   *
   * @param  {String} str - Input string intended for normalization.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will
   *                                   be set to ' ' by default.   
   * @return {object} returns an object.
   */  
  normalize: normalize,
  /**
   * Return a teleport command string. The AW browser can read this command 
   * from a file (for example, a file downloaded from a URL) to teleport 
   * the user to the given location.
   *
   * @param  {String} str - Input string of the intended teleport destination.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will
   *                                   be set to ' ' by default.   
   * @return {String} returns the teleport command.
   */    
  teleport: teleport,
  /**
   * Return a random position and direction as a teleport string.
   *
   * @param  {String} worldName - Input string of the intended teleport 
   *                              destination.
   * @param  {String} pSize - The world's pSize -- the maximum coordinate in 
   *                          any cardinal direction that can be built upon. 
   *                          This is effectively the 'edge' of the world, 
   *                          although there is no hardware limitation to keep 
   *                          you from running out past the world limit. 
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   
   * @return {String} returns the teleport command.
   */      
  random: random,
  //translate: translate
};