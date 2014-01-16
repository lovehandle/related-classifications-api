#!/usr/bin/env node

var DATASETS = [ 'BUSINESS_LICENSING', 'PLANNING', 'NAICS_2007', 'NAICS_2012' ]

for (var i = 0; i < DATASETS.length; i++) {
  var dataset = DATASETS[i];

  console.log('BUILDING INDEX FOR: ' + dataset);

  buildIndex = require( process.cwd() + '/datasets/' + dataset + '/build' );

  buildIndex();
}
