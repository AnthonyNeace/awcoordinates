
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
})('lib/awregex.js', [1,5,8,11,14,16,20,22,27,31,35,39,43,48,59,71,17,23,28,32,36,40,44,49,60], {}, ["var awRegex = {}","","// worldname is a required value.  It can be letters, numbers, or special characters. ","// It must have at least two characters, and at most 16 characters. ","awRegex.worldname = '(?:\\\\b|[\\\\@\\\\!])\\\\S{2,16}'","","// ns position is a required value.  It must be a nonegative integer or decimal, ending with 'n/N' or 's/S'.","awRegex.nsposition = '\\\\d{0,}[\\\\.]?\\\\d{0,}?(?:n|s)'","","// ew position is a required value.  It must be a nonegative integer or decimal, ending with 'e/E' or 'w/W'.","awRegex.ewposition = '\\\\d{0,}[\\\\.]?\\\\d{0,}?(?:e|w)'","","// Altitude is an optional value. It must be an integer or a float, ending with 'a'.","awRegex.altitude = '-?\\\\d{0,}[\\\\.]?\\\\d{1,}?[a]'","// When grouped with the rest of the coordinate, it must be preceded by a whitespace.","awRegex.buildAltitudeNonCapturingGroup = function(whitespaceChar) {","    return '(?:' + whitespaceChar + '?' + awRegex.altitude + ')?';","};","// Direction is an optional value. It must be a nonnegative integer.","awRegex.direction = '\\\\d{0,}[\\\\.]?\\\\d{1,}?'","// When grouped with the rest of the coordinate, it must be preceded by a whitespace.","awRegex.buildDirectionNonCapturingGroup = function(whitespaceChar) {","    return '(?:' + whitespaceChar + '?' + awRegex.direction + ')?';","};","","// Capturing Groups","awRegex.buildWorldNameCapturingGroup = function() {","    return '(' + awRegex.worldname + ')';","};","","awRegex.buildNsPositionCapturingGroup = function() {","    return '(' + awRegex.nsposition + ')';","};","","awRegex.buildEwPositionCapturingGroup = function() {","    return '(' + awRegex.ewposition + ')';","};","","awRegex.buildAltitudeCapturingGroup = function() {","    return '(' + awRegex.altitude + ')?';","};","","awRegex.buildDirectionCapturingGroup = function() {","    return '(' + awRegex.direction + ')?';","};","","// The minimal regex to find a valid AW coordinate string.","awRegex.buildAwCoordinateMatchingRegex = function(whitespaceChar) {","    return awRegex.worldname + ","           whitespaceChar +","           awRegex.nsposition +","           whitespaceChar +","           awRegex.ewposition + ","           awRegex.buildAltitudeNonCapturingGroup(whitespaceChar) +","           awRegex.buildDirectionNonCapturingGroup(whitespaceChar);","}          ","","// The minimal regex to find a valid AW coordinate string.","awRegex.buildAwCoordinatePartsMatchingRegex = function(whitespaceChar) {","    return awRegex.buildWorldNameCapturingGroup() + ","           whitespaceChar +","           awRegex.buildNsPositionCapturingGroup() +","           whitespaceChar +","           awRegex.buildEwPositionCapturingGroup() + ","           '(?:' + whitespaceChar + '+)?' +        ","           awRegex.buildAltitudeCapturingGroup() +","           '(?:' + whitespaceChar + '+)?' +        ","           awRegex.buildDirectionCapturingGroup();","}                       ","                                      ","module.exports = awRegex;"]);
_$jscmd("lib/awregex.js", "line", 1);

var awRegex = {};

_$jscmd("lib/awregex.js", "line", 5);

// worldname is a required value.  It can be letters, numbers, or special characters. 
// It must have at least two characters, and at most 16 characters. 
awRegex.worldname = "(?:\\b|[\\@\\!])\\S{2,16}";

_$jscmd("lib/awregex.js", "line", 8);

// ns position is a required value.  It must be a nonegative integer or decimal, ending with 'n/N' or 's/S'.
awRegex.nsposition = "\\d{0,}[\\.]?\\d{0,}?(?:n|s)";

_$jscmd("lib/awregex.js", "line", 11);

// ew position is a required value.  It must be a nonegative integer or decimal, ending with 'e/E' or 'w/W'.
awRegex.ewposition = "\\d{0,}[\\.]?\\d{0,}?(?:e|w)";

_$jscmd("lib/awregex.js", "line", 14);

// Altitude is an optional value. It must be an integer or a float, ending with 'a'.
awRegex.altitude = "-?\\d{0,}[\\.]?\\d{1,}?[a]";

_$jscmd("lib/awregex.js", "line", 16);

// When grouped with the rest of the coordinate, it must be preceded by a whitespace.
awRegex.buildAltitudeNonCapturingGroup = function(whitespaceChar) {
    _$jscmd("lib/awregex.js", "line", 17);
    return "(?:" + whitespaceChar + "?" + awRegex.altitude + ")?";
};

_$jscmd("lib/awregex.js", "line", 20);

// Direction is an optional value. It must be a nonnegative integer.
awRegex.direction = "\\d{0,}[\\.]?\\d{1,}?";

_$jscmd("lib/awregex.js", "line", 22);

// When grouped with the rest of the coordinate, it must be preceded by a whitespace.
awRegex.buildDirectionNonCapturingGroup = function(whitespaceChar) {
    _$jscmd("lib/awregex.js", "line", 23);
    return "(?:" + whitespaceChar + "?" + awRegex.direction + ")?";
};

_$jscmd("lib/awregex.js", "line", 27);

// Capturing Groups
awRegex.buildWorldNameCapturingGroup = function() {
    _$jscmd("lib/awregex.js", "line", 28);
    return "(" + awRegex.worldname + ")";
};

_$jscmd("lib/awregex.js", "line", 31);

awRegex.buildNsPositionCapturingGroup = function() {
    _$jscmd("lib/awregex.js", "line", 32);
    return "(" + awRegex.nsposition + ")";
};

_$jscmd("lib/awregex.js", "line", 35);

awRegex.buildEwPositionCapturingGroup = function() {
    _$jscmd("lib/awregex.js", "line", 36);
    return "(" + awRegex.ewposition + ")";
};

_$jscmd("lib/awregex.js", "line", 39);

awRegex.buildAltitudeCapturingGroup = function() {
    _$jscmd("lib/awregex.js", "line", 40);
    return "(" + awRegex.altitude + ")?";
};

_$jscmd("lib/awregex.js", "line", 43);

awRegex.buildDirectionCapturingGroup = function() {
    _$jscmd("lib/awregex.js", "line", 44);
    return "(" + awRegex.direction + ")?";
};

_$jscmd("lib/awregex.js", "line", 48);

// The minimal regex to find a valid AW coordinate string.
awRegex.buildAwCoordinateMatchingRegex = function(whitespaceChar) {
    _$jscmd("lib/awregex.js", "line", 49);
    return awRegex.worldname + whitespaceChar + awRegex.nsposition + whitespaceChar + awRegex.ewposition + awRegex.buildAltitudeNonCapturingGroup(whitespaceChar) + awRegex.buildDirectionNonCapturingGroup(whitespaceChar);
};

_$jscmd("lib/awregex.js", "line", 59);

// The minimal regex to find a valid AW coordinate string.
awRegex.buildAwCoordinatePartsMatchingRegex = function(whitespaceChar) {
    _$jscmd("lib/awregex.js", "line", 60);
    return awRegex.buildWorldNameCapturingGroup() + whitespaceChar + awRegex.buildNsPositionCapturingGroup() + whitespaceChar + awRegex.buildEwPositionCapturingGroup() + "(?:" + whitespaceChar + "+)?" + awRegex.buildAltitudeCapturingGroup() + "(?:" + whitespaceChar + "+)?" + awRegex.buildDirectionCapturingGroup();
};

_$jscmd("lib/awregex.js", "line", 71);

module.exports = awRegex;