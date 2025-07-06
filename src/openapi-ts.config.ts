import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'https://abp.antosubash.com/swagger/v1/swagger.json',
    output: 'src/client',
    plugins: [
        ...defaultPlugins, 
        '@hey-api/client-fetch',
        {
            name: '@hey-api/typescript',
            // readOnlyWriteOnlyBehavior: 'off',
        },
    ],
});
