import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
    treeshake: true,
    splitting: true,
    entry: ['src/**/*.ts'],
    format: ['esm'],
    dts: true,
    minify: true,
    external: ['react'],
    esbuildOptions(options) {
        options.external = ['@tanstack/*'];
    },
    ...options
}));
