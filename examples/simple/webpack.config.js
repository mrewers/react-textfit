const path = require('path');

const babel = require('./config/babel');

module.exports = env => {
  const babelLoader = {
    loader: 'babel-loader',
    options: babel.babelConfig(env),
  };

  return {
    devtool: process.env.NODE_ENV === 'development' ? 'eval' : undefined,
    entry: './index.js',
    module: {
      rules: [
        {
          exclude: /node_modules/u,
          test: /\.js(?<jsx>x?)$/u,
          use: babelLoader,
        },
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist/',
    },
    resolve: {
      alias: {
        // 'react-textfit': path.join(__dirname, '../../src'),
      },
      extensions: ['.js', '.jsx'],
    },
  };
};
