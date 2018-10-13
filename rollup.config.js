import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [babel(babelrc())];

if (process.env.BUILD !== 'production') {
  plugins.push(
    istanbul({
      exclude: ['**/*.spec.js', 'node_modules/**/*']
    })
  );
}

const name = 'mattsSickValidationFunc';

export default {
  input: 'src/index.js',
  plugins: plugins,
  external: external,
  output: [
    {
      file: pkg.browser,
      name: `${name}Umd`,
      format: 'umd',
      moduleName: 'validate',
      sourceMap: true
    },
    {
      file: pkg.main,
      name: `${name}Cjs`,
      format: 'cjs',
      sourceMap: true
    },
    {
      file: pkg.module,
      name: `${name}Es`,
      format: 'es',
      sourceMap: true
    }
  ]
};
