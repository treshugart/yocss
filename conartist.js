const { config, preset } = require('conartist');
const rollup = preset.rollup();
module.exports = config(preset.base(), preset.babel(), preset.jest(), {
  ...rollup,
  ...{
    ['rollup.config.js']() {
      return { ...{ name: 'yocss' }, ...rollup['rollup.config.js']() };
    }
  }
});
