import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import ts from 'rollup-plugin-ts';

import pkg from './package.json' assert { type: 'json' };

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

export default [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      ts(),
      peerDepsExternal(),
      resolve({
        extensions: EXTENSIONS,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: EXTENSIONS,
      }),
      terser(),
    ],
  },
  // UMD build
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    output: [
      {
        name: 'TrackstarLink',
        file: pkg.browser,
        format: 'umd',
        globals: {
          react: 'React',
        },
      },
    ],
    plugins: [
      ts(),
      resolve({
        extensions: EXTENSIONS,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: EXTENSIONS,
      }),
      terser(),
    ],
  },
];
