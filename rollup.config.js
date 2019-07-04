import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [babel(), minify()];

const name = 'MSVF';

export default {
  input: 'src/index.js',
  plugins: plugins,
  external: external,
  output: [
    {
      file: pkg.browser,
      name: name,
      format: 'iife'
    },
    {
      file: pkg.main,
      name: name,
      format: 'cjs'
    },
    {
      file: pkg.module,
      name: name,
      format: 'es'
    }
  ]
};
