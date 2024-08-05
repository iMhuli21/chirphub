/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'img.clerk.com',
                protocol: 'https',
                pathname: '/**',
                port: ''
            },
            {
                hostname: 'utfs.io',
                protocol: 'https',
                pathname: '/f/**',
                port: ''
            }
        ]
    }
};

export default nextConfig;
