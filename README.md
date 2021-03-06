awcoordinates
=========

[![Build Status](https://travis-ci.org/AnthonyNeace/awcoordinates.svg?branch=master)](https://travis-ci.org/AnthonyNeace/awcoordinates)
[![NPM version](https://badge.fury.io/js/awcoordinates.svg)](https://www.npmjs.com/package/awcoordinates)
[![Coverage Status](https://coveralls.io/repos/AnthonyNeace/awcoordinates/badge.svg)](https://coveralls.io/r/AnthonyNeace/awcoordinates)

A library containing utility methods to manage ActiveWorlds coordinates as strings. 

## Installation

    npm install awcoordinates --save

## AW Coordinates Syntax

This library deals with strings of the format:

    <WORLDNAME> <NORTH/SOUTH POSITION> <EAST/WEST POSITION> <ALTITUDE> <DIRECTION>
    
Valid syntax breakdown:

* Worldname: Non-whitespace characters. 
  * Min. length 2, max. length 16. 
  * To enforce this length, worldname should be preceded by a [word boundary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-word-boundary).
* North/South Position: Non-negative integer or decimal ending in N/n or S/s.
  * Defined in coordinates.  1 Coordinate = 10 meters
  * AW SDK Documentation: [AW_MY_Z](http://wiki.activeworlds.com/index.php?title=AW_MY_Z)
* East/West Position: Non-negative integer or decimal ending in E/e or W/w.
  * Defined in coordinates.  1 Coordinate = 10 meters
  * AW SDK Documentation: [AW_MY_X](http://wiki.activeworlds.com/index.php?title=AW_MY_X)
* Altitude: Positive or negative integer or decimal ending in A/a.
  * Defined in coordinates.  1 Coordinate = 10 meters
  * AW SDK Documentation: [AW_MY_Y](http://wiki.activeworlds.com/index.php?title=AW_MY_Y)
* Direction: Non-negative integers or decimals. 
  * Defined in degrees.
  * AW SDK Documentation: [AW_MY_YAW](http://wiki.activeworlds.com/index.php?title=AW_MY_YAW)
  * Values are mapped to the range 0-359 via modulus. The AW SDK documentation inparticular notes the operation (yaw % 3600) on yaw values in tenths of a degree.

## Usage

### Find

Find returns an array of matched results.

```javascript
var awcoordinates = require('awcoordinates'),
  find = awcoordinates.find;

var result = find('We will start by visiting AW 100s 100e 0.1a 180, then AWTeen 2500s 500e 180, and finally COFMeta 1000.5s 1000.5e -10a 270!');
```

Output:
```javascript
[ 'AW 100s 100e 0.1a 180', 'AWTeen 2500s 500e 180', 'COFMeta 1000.5s 1000.5e -10a 270' ]
```
    
### Validate

Validate checks if a string matches AW coordinates syntax exactly.

```javascript
var awcoordinates = require('awcoordinates'),
  validate = awcoordinates.validate;

validate('AW 50.5N 30.3E');                   // Returns true

validate('AWTeen 100s 100e 0.1a 180');        // Returns true

validate('AlphaWorld is a cool place!');      // Returns false
```
    
### Normalize

Normalize breaks a coordinate string down into human and machine ([AW SDK](http://wiki.activeworlds.com/index.php?title=SDK)) readable parts. Returns as a JSON string.

```javascript
var awcoordinates = require('awcoordinates'),
  normalize = awcoordinates.normalize;      
  
var result = normalize('aw 5000.0n 5000.5w -50.5a 123');
```

Output:
    
```json
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
    "yaw": 1230,
    "pitch": 0,
    "roll": 0
  },
  "description": "aw 5000.0n 5000.5w -50.5a 123",
  "worldname": "aw"
}      
```
    
### Teleport

Teleport generates a teleport command string, based on the input coordinates string. It also validates that the string is a set of coordinates before returning. The returned string can be saved to a file and opened with AW to teleport to the given location.

```javascript
var awcoordinates = require('awcoordinates'),
  teleport = awcoordinates.teleport;

var result = teleport('AW 100s 100e 0.1a 180');     
```  
    
Output:

```javascript
'teleport aw 100s 100e 0.1a 180\r\n'
```

### Random

Generate a random location as a coordinates string. Callers can pass in the World Name and World "P-Size", the maximum "size" of the world in any given direction.

```javascript
var awcoordinates = require('awcoordinates'),
  random = awcoordinates.random;

var result = random('TestWorld', 10);     
```  
    
Output:

```javascript
'TestWorld 1.3n 7.7e 0a 8.7'
```

## Tests

To reduce the package size, tests are not included in the npm release.  Clone the GitHub repo to get the tests.

To run:

    npm test

## Contributing

Contributions are welcome! Fork this repository to make changes and then submit a pull request.  Add unit tests for any new or changed functionality.

## Release History

* 0.5.5 Added random() method.
* 0.5.0 Added teleport() method.
* 0.4.0 Added normalize() method.
* 0.3.0 Added support for negative altitude, decimals in positions.
* 0.2.0 Added validate() method.
* 0.1.0 Initial release with find() method.
