awcoordinates
=========

A library containing utility methods to manage ActiveWorlds coordinates as strings. 

## Installation

    npm install awcoordinates --save

## Usage

### AW Coordinates Syntax

This library deals with strings of the format:

    <WORLDNAME> <NORTH/SOUTH POSITION> <EAST/WEST POSITION> <ALTITUDE> <DIRECTION>
    
Valid syntax breakdown:

* Worldname: Non-whitespace characters. 
  * Min. length 2, max. length 16. 
  * To enforce this length, worldname should be preceded by a [word boundary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-word-boundary).
* North/South Position: Non-negative integer or decimal ending in N/n or S/s.
  * AW SDK Documentation: [AW_MY_Z](http://wiki.activeworlds.com/index.php?title=AW_MY_Z)
* East/West Position: Non-negative integer or decimal ending in E/e or W/w.
  * AW SDK Documentation: [AW_MY_X](http://wiki.activeworlds.com/index.php?title=AW_MY_X)
* Altitude: Positive or negative integer or decimal ending in A/a.
  * AW SDK Documentation: [AW_MY_Y](http://wiki.activeworlds.com/index.php?title=AW_MY_Y)
* Direction: Non-negative integers or decimals. Maps to degrees.
  * AW SDK Documentation: [AW_MY_YAW](http://wiki.activeworlds.com/index.php?title=AW_MY_YAW)
  * Values are mapped to the range 0-359 via modulus. The AW SDK documentation inparticular notes the operation (yaw % 3600) on yaw values in tenths of a degree.

### Find

Find returns an array of matched results.

    var awcoordinates = require('awcoordinates'),
      find = awcoordinates.find;

    // myCoords gets set to "AW 100s 100e 0.1a 180" 
    var myCoords = find('The party is located at AW 100s 100e 0.1a 180!');
    
### Validate

Validate checks if a string matches AW coordinates syntax exactly.

    var awcoordinates = require('awcoordinates'),
      validate = awcoordinates.validate;

    // Returns true
    validate('AW 100s 100e 0.1a 180');
    
    // Returns false
    validate('AlphaWorld is a cool place!');    
    
### Normalize

Normalize breaks a coordinate string down into human and machine ([AW SDK](http://wiki.activeworlds.com/index.php?title=SDK)) readable parts. Returns as a JSON string.

    var awcoordinates = require('awcoordinates'),
      normalize = awcoordinates.normalize;      
      
    var myCoords = normalize('aw 5000.0n 5000.5w -50.5a 123');
    
    /* var myCoords Output:
    {
      "stringParts": {
        "nsposition": "5000.0n",
        "ewposition": "5000.5w",
        "altitude": "-50.5a",
        "direction": "123"
      },
      "sdkParts": {
        "z": 500000,
        "x": 500050,
        "y": -5050,
        "yaw": 1230
      },
      "description": "aw 5000.0n 5000.5w -50.5a 123",
      "worldname": "aw"
    }      
    */

## Tests

    npm test

## Contributing

Add unit tests for any new or changed functionality.

## Release History

* 0.4.0 Added normalize() method.
* 0.3.0 Added support for negative altitude, decimals in positions.
* 0.2.0 Added validate() method.
* 0.1.0 Initial release with find() method.
