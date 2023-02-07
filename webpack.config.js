const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file
      safe: false, // Don't load the .env.example file
      systemvars: true, // Load system environment variables
    }),
  ],
};
module.exports = {
  // ...
  devServer: {
    setupMiddlewares: (app) => {
      // your middlewares here
    }
  }
  // ...
};
module.exports = {
  // ...
  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify")
    }
  },
  // ...
};
