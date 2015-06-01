// awcoordinates by Anthony Neace

var awRegex = require('./awregex')

module.exports = {
  /**
   * Find aw coordinates in a given, arbitrary string.
   *
   * @param  {String} str - Arbitrary string content.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   
   * @return {String[]} Collection of identified aw coordinates.
   */
  find: function(str, whitespaceChar) {
  
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';
  
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax.
    var coordinateRegex = new RegExp('(' + awRegex.buildAwCoordinateRegex(whitespaceChar) + ')+', 'gi');
    
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
  },
  /**
   * Validate a string exactly as aw coordinates. Trims whitespace before attempting validation.
   *
   * @param  {String} str - Input string intended for validation.
   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   
   * @return {bool} True/False depending on result.
   */
  validate: function(str, whitespaceChar) {
  
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';
  
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax. 
    var coordinateRegex = new RegExp('^(' + awRegex.buildAwCoordinateRegex(whitespaceChar) + ')+$', 'i');

    return coordinateRegex.test(str.trim());
  }
};