const setPresets = env => {
  if (env === 'jest') {
    return [['@babel/preset-env', { modules: 'commonjs' }], '@babel/preset-react'];
  }

  return [['@babel/preset-env', { modules: false }], '@babel/preset-react'];
};

const babelConfig = env => ({
  presets: setPresets(env),
});

module.exports = {
  babelConfig,
};
