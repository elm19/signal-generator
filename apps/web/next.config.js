const { createContentlayerPlugin } = require('next-contentlayer2')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}

const withContentlayer = createContentlayerPlugin({})

const withNextIntl = require('next-intl/plugin')('./src/i18n')

module.exports = withNextIntl(withContentlayer(nextConfig))
