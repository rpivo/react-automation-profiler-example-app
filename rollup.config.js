import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    nodeResolve(),
    commonjs(),
    typescript(),
  ],
};
