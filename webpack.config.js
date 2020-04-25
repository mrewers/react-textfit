module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        test: /\.ts(?<tsx>x?)$/u,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
      },
      {
        exclude: /node_modules/u,
        test: /\.js(?<jsx>x?)$/u,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    library: 'react-textfit',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
