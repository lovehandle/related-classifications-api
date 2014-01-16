var _ = require('underscore');
var fs = require('fs');
var tokenize = require( process.cwd() + '/lib/tokenize' );

var arrayify = function (obj) {
  return _.isArray(obj) ? obj : [ obj ];
}

module.exports = function (objects, properties, idProperty, path) {
  var index = {};

  _.each(objects, function (object) {
    var id = object[idProperty];

    _.each(properties, function (property) {
      var weight  = properties.length - property.indexOf(property);
      var textArr = arrayify(object[property]);

      _.each(textArr, function (text) {
        var tokens = tokenize(text);

        _.each(tokens, function (token) {
          index[token]     = index[token] || {};
          index[token][id] = index[token][id] || 0;
          index[token][id] += weight;
        })

      })

    }) 
  });

  fs.writeFile(path, JSON.stringify(index), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Index successfully created.') 
    }
  });

}
