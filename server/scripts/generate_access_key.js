let fs = require('fs');
let path = require('path');
let crypto = require('crypto');
let stringify = require('json-beautify');

let key = crypto.randomBytes(64).toString('hex');

let configFileContents = fs.readFileSync(
  path.resolve(__dirname, '../config.json'),
  { encoding: 'utf8' }
);

let config;

if (configFileContents.trim() === '') {
  config = {};
}

try {
  config = JSON.parse(configFileContents);
} catch(e) {
  console.log('Invalid JSON in config.json; resetting configuration')
  config = {};
}

config['ACCESS_KEY'] = key;

fs.writeFileSync(path.resolve(__dirname, '../config.json'), stringify(config, null, 2, 100));
