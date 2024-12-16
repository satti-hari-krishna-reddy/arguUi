module.exports = {
  reactStrictMode: true,
  env: {
    dir: '/',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};
