awcoordinates
=========

A library containing utility methods to manage ActiveWorlds coordinates as strings. 

## Installation

    npm install awcoordinates --save

## Usage

This library deals with strings of the format:

    <WORLDNAME> <NORTH/SOUTH POSITION> <EAST/WEST POSITION> <ALTITUDE> <DIRECTION>
    
Valid formats:

* Worldname: At least two non-whitespace characters.
* North/South Position: Integers ending in N/n or S/s.
* East/West Position: Integers ending in E/e or W/w.
* Altitude: Integer or decimal ending in A/a.
* Direction: Non-negative integers from 0 to 360.

Example:

    var awcoordinates = require('awcoordinates'),
      find = awcoordinates.find;

    // Find returns an array of matched results.
    var myCoords = find('The party is located at AW 100s 100e 0.1a 180!);
    // This causes myCoords[0] to become "AW 100s 100e 0.1a 180"
    console.log(myCoords[0]);

## Tests

    npm test

## Contributing

Add unit tests for any new or changed functionality.

## Release History

* 0.1.0 Initial release with find() method.
