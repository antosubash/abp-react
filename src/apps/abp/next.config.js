/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
    reactStrictMode: true,
    // transpilePackages: ['@abpreact/ui', '@abpreact/hooks', '@abpreact/utils', '@abpreact/proxy' ],
    output: 'standalone',
    experimental: {
        // this includes files from the monorepo base two directories up
        outputFileTracingRoot: path.join(__dirname, '../../')
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'abp.io'
            }
        ]
    }
};
