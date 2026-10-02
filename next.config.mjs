/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // the bundled islands hydrate themselves; avoid double-mount
  trailingSlash: false,
};

export default nextConfig;
