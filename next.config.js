/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  kakao: {
    clientID: '66470a9e06c694f1623b4aaa5363487e',
    callbackURL: 'http://localhost:3000/oauth',
  },
}

module.exports = nextConfig
