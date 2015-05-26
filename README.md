awcoordinates
=========

A library containing utility methods to manage ActiveWorlds coordinates as strings. 

## Installation

    npm install awcoordinates --save

## Usage

    var awcoordinates = require('awcoordinates')
      find = awcoordinates.find;

    // Find returns an array of matched results.
    var myCoords = find('The party is located at AW 100s 100e 0.1a 180, and I want to invite you there!);
    // myCoords[0] = AW 100s 100e 0.1a 180
    console.log(myCoords[0]);

## Tests

    npm test

## Contributing

Add unit tests for any new or changed functionality.

## Release History

* 0.1.0 Initial release with find() method.
