var DATASETS = [ 'business_licensing', 'planning', 'naics_2007', 'naics_2012' ];

for (var i = 0; i < DATASETS.length; i++) {
  var dataset = DATASETS[i];
  module.exports[dataset] = require('./' + dataset + '/dataset');
}
