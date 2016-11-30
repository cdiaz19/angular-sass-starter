'use strict';
var fs = require('fs-extra');

var distDirectory = 'www/';
var indexPath = './index.html';

copyScriptsUsedInIndexToDist(indexPath, distDirectory);

/*
 * Copies files used in index.html from node_modules to dist directory
 */
function copyScriptsUsedInIndexToDist(indexPath, distDirectory) {
  var indexStr = fs.readFileSync(indexPath, 'utf8');
  var scriptPaths = extractScriptPaths(indexStr);
  copyFilesTo(scriptPaths, distDirectory);
}

/*
 * Returns an array of href/src values from <link> and <script> tags
 * that begin with 'node_modules/'
 */
function extractScriptPaths(indexStr) {
  var scriptPathRegexp = /<(?:script.*?src|link.*?href)=\"(node_modules\/.*?)\"/g;
  var scriptPaths = getAllMatches(scriptPathRegexp, indexStr);

  return scriptPaths;
}

/*
 * Copies files (paths specified by an input array) to a destination directory
 */
function copyFilesTo(paths, destinationDirectory) {
  var filePath, filename;

  for (var i = 0; i < paths.length; i++) {
    filePath = paths[i];
    fs.copySync(filePath, destinationDirectory + filePath);
  }
}

/*
 * Gets all matches for a RegExp in a string
 * + Uses .exec instead of .match because we need global matching and capture groups
 */
function getAllMatches(regexp, str) {
  var allMatches = [];
  var match = regexp.exec(str);

  while (match != null) {
    allMatches.push(match[1]);
    match = regexp.exec(str);
  }

  return allMatches;
}

