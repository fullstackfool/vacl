import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';
import path from "path";

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    alias: {
        '@/': path.resolve(__dirname, '/src/')
    },
    plugins: [
        typescript({
            typescript: require('typescript'),
            tsconfig: './tsconfig.json'
        }),
        terser(),
        bundleSize()
    ]
};
