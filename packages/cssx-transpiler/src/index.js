var AST = require('./core/AST');
var traverse = require('./core/traverse');
var generate = require('babel-generator').default;
var merge = require('./helpers/merge');
var randomId = require('./helpers/randomId');

var visitors = {
  CSSXDefinition: require('./visitors/CSSXDefinition'),
  CSSXElement: require('./visitors/CSSXElement'),
  CSSXProperty: require('./visitors/CSSXProperty'),
  CSSXRule: require('./visitors/CSSXRule'),
  CSSXRules: require('./visitors/CSSXRules'),
  CSSXSelector: require('./visitors/CSSXSelector'),
  CSSXValue: require('./visitors/CSSXValue'),
  CallExpression: require('./visitors/CallExpression'),
  ReturnStatement: require('./visitors/ReturnStatement'),
  ObjectProperty: require('./visitors/ObjectProperty')
};

module.exports = function (code, options) {
  var ast = AST(code);
  var opts = merge(
    {
      minified: false,
      compact: false,
      concise: false,
      quotes: 'single',
      sourceMaps: false
    },
    options || {}
  );

  traverse(ast.program, visitors, opts);
  return generate(ast, opts, code).code;
};

module.exports.ast = AST;

module.exports.reset = function () {
  randomId.resetIDs();
};
