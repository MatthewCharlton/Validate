import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [babel(), minify()];

if (process.env.BUILD !== 'production') {
  plugins.push(
    istanbul({
      exclude: ['**/*.spec.js', 'node_modules/**/*']
    })
  );
}

const name = 'MSVF';

export default {
  input: 'src/index.js',
  plugins: plugins,
  external: external,
  output: [
    {
      file: pkg.browser,
      name: name,
      format: 'umd',
      moduleName: 'validate',
      sourceMap: true
    },
    {
      file: pkg.main,
      name: name,
      format: 'cjs',
      sourceMap: true
    },
    {
      file: pkg.module,
      name: name,
      format: 'es',
      sourceMap: true
    }
  ]
};
