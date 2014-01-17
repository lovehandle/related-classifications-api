var datasets = require(process.cwd() + '/datasets');

module.exports.get = function (req, res) {
  var dataset = req.query.dataset;

  if (dataset && datasets.hasOwnProperty(dataset)) {
    var data = datasets[dataset];
    var code = req.query.code;

    for (var i = 0; i < data.length; i++) {
      var classification = data[i];
      if (classification.code === code) break;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write( JSON.stringify(classification) );
    res.end();
  } else {
    // no dataset 
  }
}
