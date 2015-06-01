// awcoordinates by Anthony Neace

var awRegex = require('./awregex')

module.exports = {
  /**
   * Find aw coordinates in a given, arbitrary string.
   *
   * @param  {String} Arbitrary string content.
   * @return {String[]} Collection of identified aw coordinates.
   */
  find: function(str) {
  
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax.
	var coordinateRegex = new RegExp('(' + awRegex.coordinates(' ') + ')+', 'gi');
	
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
   * @param  {String} Input string intended for validation.
   * @return {bool} True/False depending on result.
   */
  validate: function(str) {
  
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax. 
    var coordinateRegex = new RegExp('^(' + awRegex.coordinates(' ') + ')+$', 'i');

    return coordinateRegex.test(str.trim());
  }
};