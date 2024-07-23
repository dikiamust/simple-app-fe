const withFonts = require('next-fonts');

/** @type {import('next').NextConfig} */
const nextConfig = withFonts({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com', 
      'https://images.tokopedia.net',
      'https://cf.shopee.co.id',
      'http://static.bmdstatic.com',
      'https://www.mirotakampus.com',
      ' https://awsimages.detik.net.id'
     ],
  },
});

module.exports = nextConfig;
