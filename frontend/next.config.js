// This file is needed for hot-reloading to work with Next.js and Docker.
// Source: https://dev.to/kumar_abhirup/next-js-docker-made-easy-2bok

module.exports = {
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
  
      return config
    },
    env: {
      API_DEV: process.env.API_DEV,
      API_PROD: process.env.API_PROD
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Unset client-side javascript that only works server-side
        // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
        config.node = { fs: 'empty', module: 'empty' }
      }
  
      return config
    },
}