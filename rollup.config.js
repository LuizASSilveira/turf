const node = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const butternut = require('rollup-plugin-butternut');
const pckg = require('./package');

const input = 'src/index.js';

module.exports = [
  {
    input,
    output: [
      { file: pckg.main, format: 'umd', name: 'turf' },
      { file: 'dist/turf.es.js', format: 'es' }
    ],
    plugins: [node(), commonjs({ include: 'node_modules/**' })]
  }
  // You can add additional configurations here if needed
  // {
  //   input,
  //   output: [
  //       {file: pckg.browser, format: 'umd', name: 'turf'}
  //   ],
  //   plugins: [node(), commonjs(), butternut()]
  // }
];
