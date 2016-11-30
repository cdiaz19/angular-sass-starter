'use strict';
var fs = require('fs');
var envVariableKeys = ['ENV'];
var appName = 'app';

createConfigFile(envVariableKeys, appName);

/*
 * Iterates over all env variables and creates a file with code
 * to assign them to the main angular app module as angular constants.
 */
function createConfigFile(envVariableKeys, appName) {
  var key, value, angularModuleConfigCode;
  var angularConstantsCode = '';
  var getEnvVarValue = getEnvVarValueFactory();

  for (var i = 0; i < envVariableKeys.length; i++) {
    key = envVariableKeys[i];
    value = getEnvVarValue(key);
    if (typeof value == 'undefined') { throw key + ' VARIABLE MISSING'; };

    angularConstantsCode += wrapInAngularConstantCode(key, value);
  }

  angularModuleConfigCode = wrapInAngularModuleCode(angularConstantsCode);

  fs.writeFile('app/app.config.js', angularModuleConfigCode);
  fs.writeFile('www/app/app.config.js', angularModuleConfigCode);
}

/*
 * Reads .env file if it exists, and returns a function that gets env variables
 * either from the .env file or the environment.
 */
function getEnvVarValueFactory() {
  var envFileStr = readFile('.env');
  var envVarValueRegExp;

  function getEnvVarValue(key) {
    envVarValueRegExp = new RegExp(key + '="(.*)"', 'g');

    if (envFileStr) {
      return envVarValueRegExp.exec(envFileStr)[1];
    } else {
      return process.env[key];
    }
  }

  return getEnvVarValue;
}

/*
 * Returns code (a string) for an angular constant with the given key and value.
 * + Always uses value as a string, so it doesn't support booleans/numbers/etc.
 */
function wrapInAngularConstantCode(key, value) {
  return '\n    .constant(\'' + key + '\', \'' + value + '\')';
}

/*
 * Returns code (a string) for angular constants assigned to the main app module.
 */
function wrapInAngularModuleCode(angularConstantsCode) {
  return '(function() {\n'             +
         '  \'use strict\';\n\n'       +
         '  angular\n'                 +
         '    .module(\'' + appName + '\')' +
              angularConstantsCode + ';\n'  +
         '})();';
}

/*
 * Reads a file and returns a string with the file contents
 * or empty string if the file doesn't exist.
 */
function readFile(filename) {
  try {
    fs.accessSync('.env', fs.F_OK);
    return fs.readFileSync('.env', 'utf-8');

  } catch (err) {
    console.log('No ' + filename + ' file detected. Using environment variables.');
    return '';
  }
}

