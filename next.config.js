/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://nestchat-server.herokuapp.com",
  },
}

module.exports = nextConfig
