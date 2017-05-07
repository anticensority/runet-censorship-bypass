'ust strict';

module.exports = (parentModule) => function cachelessRequire(path) {

  for(let key of Object.keys(require.cache)) {
    delete require.cache[key];
  }
  return parentModule.require(path);

};
