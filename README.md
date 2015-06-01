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

* Worldname: At least two non-whitespace characters.
* North/South Position: Non-negative integer or decimal ending in N/n or S/s.
* East/West Position: Non-negative integer or decimal ending in E/e or W/w.
* Altitude: Positive or negative integer or decimal ending in A/a.
* Direction: Non-negative integers from 0 to 360.

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

## Tests

    npm test

## Contributing

Add unit tests for any new or changed functionality.

## Release History

* 0.3.0 Added support for negative altitude, decimals in positions.
* 0.2.0 Added validate() method.
* 0.1.0 Initial release with find() method.
