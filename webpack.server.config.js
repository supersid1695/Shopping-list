const path = require('path');
const webpack = require('webpack');
const regex = /firebase\/(app|firestore)/;

module.exports = {
  entry: {
    server: './server.ts',
  },
  target: 'node',
  resolve: {
    // these alias is need because of the issue of firebase, not working with Node.
    // ReferenceError: IDBIndex is not defined
    // Solution link: https://github.com/firebase/firebase-js-sdk/issues/1797#issuecomment-498474850
    // If the problem is fixed in the future, remove the alias and the const regex.
    alias: {
      ['firebase/app']: path.resolve(__dirname, 'node_modules/firebase/app/dist/index.cjs.js'),
      ['firebase']: path.resolve(__dirname, 'node_modules/firebase/dist/index.node.cjs.js')
    },
    extensions: ['.ts', '.js']
  },

  mode: 'none',
  optimization: {
    minimize: false
  },
  externals: [/node_modules/, function (context, request, callback) {

    // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
    if (regex.test(request)) {
      return callback(null, 'commonjs ' + request);
    }
    callback();
  }],
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: {
          system: true
        },
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'), {}
    )
  ]
}