// webpack.config.js
module.exports = {
  // ... other webpack configuration options ...

  devServer: {
    setupMiddlewares: (devServer) => {
      // Your middleware setup code using ES6 arrow function syntax
    },
  },
};