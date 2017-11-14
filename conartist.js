const { config, preset } = require('conartist');

module.exports = config(
  preset.base(),
  preset.babel(),
  preset.jest(),
  preset.rollup({ name: 'css-in-js' })
);
