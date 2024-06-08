/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
    reactStrictMode: true,
    transpilePackages: ['@abpreact/ui', '@abpreact/hooks', '@abpreact/utils', '@abpreact/proxy' ],
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'abp.io'
            }
        ]
    }
};
