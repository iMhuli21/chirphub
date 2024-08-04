/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'img.clerk.com',
                protocol: 'https',
                pathname: '/**',
                port: ''
            }
        ]
    }
};

export default nextConfig;
