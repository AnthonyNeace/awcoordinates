
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('lib/awlocation.js', [3,5,11,17,32,47,72,83,98,106,7,13,21,22,23,25,26,27,36,37,38,40,41,42,50,51,54,55,57,61,62,74,75,78,79,84,85,86,88,89,90,91,92,93,95,99], {"6_7_19":0,"12_7_19":0,"18_7_19":0,"33_7_19":0,"48_7_27":0,"49_11_35":0,"73_7_27":0}, ["// awLocation - builder for a normalized location object","","var awLocation = {};","","var buildDescription = function(location, str) {","    if(str !== 'undefined') {    ","        location.description = str;","    }","};","","var buildWorldName = function(location, str) {","    if(str !== 'undefined') {    ","        location.worldname = str;","    }","};","","var buildZPosition = function(location, str) {","    if(str !== 'undefined') {    ","        switch (str.slice(-1).toLowerCase()) {","            case \"n\":","                location.stringParts.nsposition = str;","                location.sdkParts.z = str.slice(0,-1) * 100;","                break;","            case \"s\":","                location.stringParts.nsposition = str;","                location.sdkParts.z = str.slice(0,-1) * -100;","                break;    ","        }","    }","};","","var buildXPosition = function(location, str) {","    if(str !== 'undefined') {    ","        switch (str.slice(-1).toLowerCase()) {","            case \"w\":","                location.stringParts.ewposition = str;","                location.sdkParts.x = str.slice(0,-1) * 100;","                break;","            case \"e\":","                location.stringParts.ewposition = str;","                location.sdkParts.x = str.slice(0,-1) * -100;","                break;    ","        }","    }        ","};","","var buildYPosition = function(location, str) {","    if(typeof(str) !== 'undefined') {","        if(str.slice(-1).toLowerCase() === \"a\") {","            location.stringParts.altitude = str;","            location.sdkParts.y = str.slice(0,-1) * 100;","        }","        else {","            location.stringParts.altitude = '0a';","            location.sdkParts.y = 0;    ","        ","            buildDirection(location, str);","        }","    }","    else {","        location.stringParts.altitude = '0a';","        location.sdkParts.y = 0;    ","    }    ","};","","/* From http://wiki.activeworlds.com/index.php?title=AW_AVATAR_YAW","This is the value set for AW_MY_YAW when the user called aw_state_change. It is given in units of one tenth of a degree and should not be assumed to be in the range of 0 to 3599.","- For positive values of yaw modulo 3600: A yaw of 0 is facing directly north, 900 is facing west, 1800 is facing south, and 2700 is facing east.","- For negative values of yaw modulo 3600: A yaw of 0 is facing directly north, -2700 is facing west, -1800 is facing south, and -900 is facing east. ","TODO: support decimal places in plaintext coordinate.  This conversion appears to exist to support the tenth decimal place.","*/","var buildDirection = function(location, str) {","    if(typeof(str) !== 'undefined') {","        location.stringParts.direction = str;","        location.sdkParts.yaw = str * 10;","    }","    else {","        location.stringParts.direction = '0';","        location.sdkParts.yaw = 0;    ","    }","};","","awLocation.buildAwLocation = function(coordinateParts) {","    var location = {};","    location.stringParts = {};","    location.sdkParts = {};","    ","    buildDescription(location, coordinateParts[0]);","    buildWorldName(location, coordinateParts[1]);","    buildZPosition(location, coordinateParts[2]);","    buildXPosition(location, coordinateParts[3]);","    buildYPosition(location, coordinateParts[4]);","    buildDirection(location, coordinateParts[5]);","    ","    return location;","};","","awLocation.buildCoordinatesString = function(location, whitespaceChar) {","    return location.worldname + whitespaceChar + ","        location.stringParts.nsposition + whitespaceChar +","        location.stringParts.ewposition + whitespaceChar + ","        location.stringParts.altitude + whitespaceChar +","        location.stringParts.direction;","};","","module.exports = awLocation;"]);
// awLocation - builder for a normalized location object
_$jscmd("lib/awlocation.js", "line", 3);

var awLocation = {};

_$jscmd("lib/awlocation.js", "line", 5);

var buildDescription = function(location, str) {
    if (_$jscmd("lib/awlocation.js", "cond", "6_7_19", str !== "undefined")) {
        _$jscmd("lib/awlocation.js", "line", 7);
        location.description = str;
    }
};

_$jscmd("lib/awlocation.js", "line", 11);

var buildWorldName = function(location, str) {
    if (_$jscmd("lib/awlocation.js", "cond", "12_7_19", str !== "undefined")) {
        _$jscmd("lib/awlocation.js", "line", 13);
        location.worldname = str;
    }
};

_$jscmd("lib/awlocation.js", "line", 17);

var buildZPosition = function(location, str) {
    if (_$jscmd("lib/awlocation.js", "cond", "18_7_19", str !== "undefined")) {
        switch (str.slice(-1).toLowerCase()) {
          case "n":
            _$jscmd("lib/awlocation.js", "line", 21);
            location.stringParts.nsposition = str;
            _$jscmd("lib/awlocation.js", "line", 22);
            location.sdkParts.z = str.slice(0, -1) * 100;
            _$jscmd("lib/awlocation.js", "line", 23);
            break;

          case "s":
            _$jscmd("lib/awlocation.js", "line", 25);
            location.stringParts.nsposition = str;
            _$jscmd("lib/awlocation.js", "line", 26);
            location.sdkParts.z = str.slice(0, -1) * -100;
            _$jscmd("lib/awlocation.js", "line", 27);
            break;
        }
    }
};

_$jscmd("lib/awlocation.js", "line", 32);

var buildXPosition = function(location, str) {
    if (_$jscmd("lib/awlocation.js", "cond", "33_7_19", str !== "undefined")) {
        switch (str.slice(-1).toLowerCase()) {
          case "w":
            _$jscmd("lib/awlocation.js", "line", 36);
            location.stringParts.ewposition = str;
            _$jscmd("lib/awlocation.js", "line", 37);
            location.sdkParts.x = str.slice(0, -1) * 100;
            _$jscmd("lib/awlocation.js", "line", 38);
            break;

          case "e":
            _$jscmd("lib/awlocation.js", "line", 40);
            location.stringParts.ewposition = str;
            _$jscmd("lib/awlocation.js", "line", 41);
            location.sdkParts.x = str.slice(0, -1) * -100;
            _$jscmd("lib/awlocation.js", "line", 42);
            break;
        }
    }
};

_$jscmd("lib/awlocation.js", "line", 47);

var buildYPosition = function(location, str) {
    if (_$jscmd("lib/awlocation.js", "cond", "48_7_27", typeof str !== "undefined")) {
        if (_$jscmd("lib/awlocation.js", "cond", "49_11_35", str.slice(-1).toLowerCase() === "a")) {
            _$jscmd("lib/awlocation.js", "line", 50);
            location.stringParts.altitude = str;
            _$jscmd("lib/awlocation.js", "line", 51);
            location.sdkParts.y = str.slice(0, -1) * 100;
        } else {
            _$jscmd("lib/awlocation.js", "line", 54);
            location.stringParts.altitude = "0a";
            _$jscmd("lib/awlocation.js", "line", 55);
            location.sdkParts.y = 0;
            _$jscmd("lib/awlocation.js", "line", 57);
            buildDirection(location, str);
        }
    } else {
        _$jscmd("lib/awlocation.js", "line", 61);
        location.stringParts.altitude = "0a";
        _$jscmd("lib/awlocation.js", "line", 62);
        location.sdkParts.y = 0;
    }
};

_$jscmd("lib/awlocation.js", "line", 72);

/* From http://wiki.activeworlds.com/index.php?title=AW_AVATAR_YAW
This is the value set for AW_MY_YAW when the user called aw_state_change. It is given in units of one tenth of a degree and should not be assumed to be in the range of 0 to 3599.
- For positive values of yaw modulo 3600: A yaw of 0 is facing directly north, 900 is facing west, 1800 is facing south, and 2700 is facing east.
- For negative values of yaw modulo 3600: A yaw of 0 is facing directly north, -2700 is facing west, -1800 is facing south, and -900 is facing east. 
TODO: support decimal places in plaintext coordinate.  This conversion appears to exist to support the tenth decimal place.
*/
var buildDirection = function(location, str) {
    if (_$jscmd("lib/awlocation.js", "cond", "73_7_27", typeof str !== "undefined")) {
        _$jscmd("lib/awlocation.js", "line", 74);
        location.stringParts.direction = str;
        _$jscmd("lib/awlocation.js", "line", 75);
        location.sdkParts.yaw = str * 10;
    } else {
        _$jscmd("lib/awlocation.js", "line", 78);
        location.stringParts.direction = "0";
        _$jscmd("lib/awlocation.js", "line", 79);
        location.sdkParts.yaw = 0;
    }
};

_$jscmd("lib/awlocation.js", "line", 83);

awLocation.buildAwLocation = function(coordinateParts) {
    _$jscmd("lib/awlocation.js", "line", 84);
    var location = {};
    _$jscmd("lib/awlocation.js", "line", 85);
    location.stringParts = {};
    _$jscmd("lib/awlocation.js", "line", 86);
    location.sdkParts = {};
    _$jscmd("lib/awlocation.js", "line", 88);
    buildDescription(location, coordinateParts[0]);
    _$jscmd("lib/awlocation.js", "line", 89);
    buildWorldName(location, coordinateParts[1]);
    _$jscmd("lib/awlocation.js", "line", 90);
    buildZPosition(location, coordinateParts[2]);
    _$jscmd("lib/awlocation.js", "line", 91);
    buildXPosition(location, coordinateParts[3]);
    _$jscmd("lib/awlocation.js", "line", 92);
    buildYPosition(location, coordinateParts[4]);
    _$jscmd("lib/awlocation.js", "line", 93);
    buildDirection(location, coordinateParts[5]);
    _$jscmd("lib/awlocation.js", "line", 95);
    return location;
};

_$jscmd("lib/awlocation.js", "line", 98);

awLocation.buildCoordinatesString = function(location, whitespaceChar) {
    _$jscmd("lib/awlocation.js", "line", 99);
    return location.worldname + whitespaceChar + location.stringParts.nsposition + whitespaceChar + location.stringParts.ewposition + whitespaceChar + location.stringParts.altitude + whitespaceChar + location.stringParts.direction;
};

_$jscmd("lib/awlocation.js", "line", 106);

module.exports = awLocation;