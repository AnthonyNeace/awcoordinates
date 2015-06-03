
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
})('lib/awcoordinates.js', [3,4,6,37,48,73,86,9,12,14,15,34,22,29,40,43,45,51,58,60,68,70,55,64,76,79,81,83], {"9_61_14":0,"9_78_3":0,"17_7_12":0,"21_16_37":0,"26_15_13":0,"40_61_14":0,"40_78_3":0,"51_61_14":0,"51_78_3":0,"53_7_38":0,"62_8_40":0,"63_12_37":0,"76_61_14":0,"76_78_3":0}, ["// awcoordinates by Anthony Neace","","var awRegex = require('./awregex');","var awLocation = require('./awlocation');","","var find = function(str, whitespaceChar) {","  ","    // Set whitespaceChar default to ' '","    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';","  ","    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax.","    var coordinateRegex = new RegExp('(' + awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + ')+', 'gi');","    ","    var m = [];","    var output = [];  ","  ","    if(str !== null)","    {    ","        while ((m = coordinateRegex.exec(str)) !== null) {","            ","            if (m.index === coordinateRegex.lastIndex) {","                coordinateRegex.lastIndex++;","            }","            ","            // Sanity check to make sure value isn't null. If not, push to output collection.","            if(m[0] !== null)","            {","                // Push to output, and cleanup some edge cases that the regex doesn't get.","                output.push(m[0].trim());","            }","        }       ","    } ","  ","    return output;","};","","var validate = function(str, whitespaceChar) {","  ","    // Set whitespaceChar default to ' '","    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';","  ","    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax. ","    var coordinateRegex = new RegExp('^(' + awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + ')+$', 'i');","","    return coordinateRegex.test(str.trim());","};","","var normalize = function(str, whitespaceChar) {","","    // Set whitespaceChar default to ' '","    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';","","    if(validate(str, whitespaceChar) == false)","    {","        throw new Error(\"Invalid coordinates.\");","    }","    ","    var coordinateRegex = new RegExp(awRegex.buildAwCoordinatePartsMatchingRegex(whitespaceChar), 'i');","      ","    var m;","     ","    if ((m = coordinateRegex.exec(str)) !== null) {","        if (m.index === coordinateRegex.lastIndex) {","            coordinateRegex.lastIndex++;","        }","    }","    ","    var coords = awLocation.buildAwLocation(m);","    ","    return JSON.stringify(coords);","};","","var teleport = function(str, whitespaceChar) {"," ","    // Set whitespaceChar default to ' '","    whitespaceChar = typeof whitespaceChar !== 'undefined' ? whitespaceChar : ' ';","    ","    // normalize and write output into awt","    validate(str, whitespaceChar);","    ","    var coordinatesString = awLocation.buildCoordinatesString(JSON.parse(normalize(str, whitespaceChar)), ' ');    ","    ","    return 'teleport '+coordinatesString+'\\r\\n';","};","","module.exports = {","  /**","   * Find aw coordinates in a given, arbitrary string.","   *","   * @param  {String} str - Arbitrary string content.","   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   ","   * @return {String[]} Collection of identified aw coordinates.","   */","  find: find,","  /**","   * Validate a string exactly as aw coordinates. Trims whitespace before attempting validation.","   *","   * @param  {String} str - Input string intended for validation.","   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   ","   * @return {bool} True/False depending on result.","   */","  validate: validate,","  /**","   * Return a normalized object.","   *","   * @param  {String} str - Input string intended for normalization.","   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   ","   * @return {object} returns an object.","   */  ","  normalize: normalize,","  /**","   * Return a teleport command string. The AW browser can read this command from a file (for example, a file downloaded from a URL) to teleport the user to the given location.","   *","   * @param  {String} str - Input string of the intended teleport destination.","   * @param  {String} whitespaceChar - Whitespace character for the regex. Will be set to ' ' by default.   ","   * @return {String} returns the teleport command.","   */    ","  teleport: teleport","};"]);
// awcoordinates by Anthony Neace
_$jscmd("lib/awcoordinates.js", "line", 3);

var awRegex = require("./awregex");

_$jscmd("lib/awcoordinates.js", "line", 4);

var awLocation = require("./awlocation");

_$jscmd("lib/awcoordinates.js", "line", 6);

var find = function(str, whitespaceChar) {
    _$jscmd("lib/awcoordinates.js", "line", 9);
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== "undefined" ? _$jscmd("lib/awcoordinates.js", "cond", "9_61_14", whitespaceChar) : _$jscmd("lib/awcoordinates.js", "cond", "9_78_3", " ");
    _$jscmd("lib/awcoordinates.js", "line", 12);
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax.
    var coordinateRegex = new RegExp("(" + awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + ")+", "gi");
    _$jscmd("lib/awcoordinates.js", "line", 14);
    var m = [];
    _$jscmd("lib/awcoordinates.js", "line", 15);
    var output = [];
    if (_$jscmd("lib/awcoordinates.js", "cond", "17_7_12", str !== null)) {
        while ((m = coordinateRegex.exec(str)) !== null) {
            if (_$jscmd("lib/awcoordinates.js", "cond", "21_16_37", m.index === coordinateRegex.lastIndex)) {
                _$jscmd("lib/awcoordinates.js", "line", 22);
                coordinateRegex.lastIndex++;
            }
            // Sanity check to make sure value isn't null. If not, push to output collection.
            if (_$jscmd("lib/awcoordinates.js", "cond", "26_15_13", m[0] !== null)) {
                _$jscmd("lib/awcoordinates.js", "line", 29);
                // Push to output, and cleanup some edge cases that the regex doesn't get.
                output.push(m[0].trim());
            }
        }
    }
    _$jscmd("lib/awcoordinates.js", "line", 34);
    return output;
};

_$jscmd("lib/awcoordinates.js", "line", 37);

var validate = function(str, whitespaceChar) {
    _$jscmd("lib/awcoordinates.js", "line", 40);
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== "undefined" ? _$jscmd("lib/awcoordinates.js", "cond", "40_61_14", whitespaceChar) : _$jscmd("lib/awcoordinates.js", "cond", "40_78_3", " ");
    _$jscmd("lib/awcoordinates.js", "line", 43);
    // This regex captures a collection of all strings matching ActiveWorlds plaintext coordinate syntax. 
    var coordinateRegex = new RegExp("^(" + awRegex.buildAwCoordinateMatchingRegex(whitespaceChar) + ")+$", "i");
    _$jscmd("lib/awcoordinates.js", "line", 45);
    return coordinateRegex.test(str.trim());
};

_$jscmd("lib/awcoordinates.js", "line", 48);

var normalize = function(str, whitespaceChar) {
    _$jscmd("lib/awcoordinates.js", "line", 51);
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== "undefined" ? _$jscmd("lib/awcoordinates.js", "cond", "51_61_14", whitespaceChar) : _$jscmd("lib/awcoordinates.js", "cond", "51_78_3", " ");
    if (_$jscmd("lib/awcoordinates.js", "cond", "53_7_38", validate(str, whitespaceChar) == false)) {
        _$jscmd("lib/awcoordinates.js", "line", 55);
        throw new Error("Invalid coordinates.");
    }
    _$jscmd("lib/awcoordinates.js", "line", 58);
    var coordinateRegex = new RegExp(awRegex.buildAwCoordinatePartsMatchingRegex(whitespaceChar), "i");
    _$jscmd("lib/awcoordinates.js", "line", 60);
    var m;
    if (_$jscmd("lib/awcoordinates.js", "cond", "62_8_40", (m = coordinateRegex.exec(str)) !== null)) {
        if (_$jscmd("lib/awcoordinates.js", "cond", "63_12_37", m.index === coordinateRegex.lastIndex)) {
            _$jscmd("lib/awcoordinates.js", "line", 64);
            coordinateRegex.lastIndex++;
        }
    }
    _$jscmd("lib/awcoordinates.js", "line", 68);
    var coords = awLocation.buildAwLocation(m);
    _$jscmd("lib/awcoordinates.js", "line", 70);
    return JSON.stringify(coords);
};

_$jscmd("lib/awcoordinates.js", "line", 73);

var teleport = function(str, whitespaceChar) {
    _$jscmd("lib/awcoordinates.js", "line", 76);
    // Set whitespaceChar default to ' '
    whitespaceChar = typeof whitespaceChar !== "undefined" ? _$jscmd("lib/awcoordinates.js", "cond", "76_61_14", whitespaceChar) : _$jscmd("lib/awcoordinates.js", "cond", "76_78_3", " ");
    _$jscmd("lib/awcoordinates.js", "line", 79);
    // normalize and write output into awt
    validate(str, whitespaceChar);
    _$jscmd("lib/awcoordinates.js", "line", 81);
    var coordinatesString = awLocation.buildCoordinatesString(JSON.parse(normalize(str, whitespaceChar)), " ");
    _$jscmd("lib/awcoordinates.js", "line", 83);
    return "teleport " + coordinatesString + "\r\n";
};

_$jscmd("lib/awcoordinates.js", "line", 86);

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