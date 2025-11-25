/** @type {import('next').NextConfig} */
const nextConfig = {
    // Use the standalone output so Cloudflare Pages can run the built server.
    output: 'standalone',
    // Enable React strict mode and SWC minification for best performance.
    reactStrictMode: true,
    // swcMinify option removed (not needed for Next 16)
    // Optional: customize the build output directory if you prefer `out` for static export.
    // If you switch to `output: 'export'`, change the Pages output folder accordingly.
};

module.exports = nextConfig;
