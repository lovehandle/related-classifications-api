var _  = require('underscore');
var fs = require('fs');

var tokenize = require( process.cwd() + '/lib/tokenize' );
var dataset  = require('./dataset');

var PATH   = './datasets/naics_2012/index.json';
var FIELDS = [ 'code', 'title', 'index', 'examples', 'description' ];

module.exports = function () {
  var index = {};

  _.each(dataset.items, function (item) {
    var code = item.code;

    _.each(FIELDS, function (field) {
      var score = FIELDS.length - FIELDS.indexOf(field);
      var text  = item[field];

      text = _.isArray(text) ? text : [ text ];

      _.each(text, function (t) {
        var terms = tokenize(t);

        _.each(terms, function (term) {
          index[term] = index[term] || {};
          index[term][code] = index[term][code] || 0;
          index[term][code] += score;
        })

      })

    }) 
  });

  fs.writeFile(PATH, JSON.stringify(index), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Index successfully created.') 
    }
  });

}
